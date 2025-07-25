import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Starting build process...');

// Run the build first
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Use fixed directory name "rrrun"
const secretPath = 'rrrun';

console.log(`Creating build in: /${secretPath}`);

// Create rrrun directory
const secretDir = path.join('dist', secretPath);
if (!fs.existsSync(secretDir)) {
  fs.mkdirSync(secretDir, { recursive: true });
}

// Copy all dist files to the secret directory
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy dist contents to secret directory
fs.readdirSync('dist').forEach(item => {
  if (item !== secretPath) {
    const srcPath = path.join('dist', item);
    const destPath = path.join(secretDir, item);
    copyRecursiveSync(srcPath, destPath);
  }
});

// Create a flattened version with all files in one directory
const flattenedDir = path.join(secretDir, 'flattened');
if (!fs.existsSync(flattenedDir)) {
  fs.mkdirSync(flattenedDir, { recursive: true });
}

// Function to flatten directory structure
function flattenFiles(srcDir, destDir, prefix = '') {
  const items = fs.readdirSync(srcDir);
  
  items.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const stats = fs.statSync(srcPath);
    
    if (stats.isDirectory()) {
      flattenFiles(srcPath, destDir, prefix + item + '-');
    } else {
      const flattenedName = prefix + item;
      const destPath = path.join(destDir, flattenedName);
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Flatten the build files
flattenFiles(secretDir, flattenedDir);

// Create an index file for the secret directory
const indexContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Secret Build - ${secretHash}</title>
    <style>
        body { font-family: monospace; background: #1a1a1a; color: #00ff00; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .file-list { list-style: none; padding: 0; }
        .file-list li { margin: 5px 0; }
        .file-list a { color: #00ff00; text-decoration: none; }
        .file-list a:hover { background: #333; padding: 2px; }
        .secret-info { background: #2a2a2a; padding: 15px; border-left: 3px solid #00ff00; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 Secret Build Access</h1>
        <div class="secret-info">
            <strong>Secret Hash:</strong> ${secretHash}<br>
            <strong>Build Time:</strong> ${new Date().toISOString()}<br>
            <strong>Access URL:</strong> /${secretPath}
        </div>
        
        <h2>📁 Available Files</h2>
        <ul class="file-list">
            <li><a href="./index.html">🌐 Main Application</a></li>
            <li><a href="./flattened/">📦 Flattened Files Directory</a></li>
        </ul>
        
        <h2>📦 Flattened Files</h2>
        <ul class="file-list">
${fs.readdirSync(flattenedDir).map(file => 
    `            <li><a href="./flattened/${file}" download>📄 ${file}</a></li>`
).join('\n')}
        </ul>
        
        <h2>🔧 Build Info</h2>
        <p>This is a compiled, flattened version of the application accessible via a secret URL.</p>
        <p>All files are self-contained and can be downloaded individually.</p>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(secretDir, 'secret-index.html'), indexContent);

// Create a download info file
const downloadInfo = {
  secretHash,
  secretPath,
  buildTime: new Date().toISOString(),
  accessUrl: `/${secretPath}`,
  files: fs.readdirSync(flattenedDir),
  totalFiles: fs.readdirSync(flattenedDir).length
};

fs.writeFileSync(path.join(secretDir, 'download-info.json'), JSON.stringify(downloadInfo, null, 2));

console.log(`✅ Secret build created successfully!`);
console.log(`📍 Access URL: /${secretPath}/secret-index.html`);
console.log(`📦 Flattened files: ${downloadInfo.totalFiles} files`);
console.log(`🔑 Secret hash: ${secretHash}`);
