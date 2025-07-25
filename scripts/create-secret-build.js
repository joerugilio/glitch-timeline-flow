import fs from 'fs';
import path from 'path';

console.log('🚀 Creating rrrun build directory...');

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

// Generate inline HTML files
console.log('🔄 Creating self-contained HTML files...');
try {
  // Read the main index.html
  const indexPath = path.join('dist', 'index.html');
  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Extract CSS and JS file paths from the HTML
  const cssMatch = htmlContent.match(/href="([^"]*\.css)"/);
  const jsMatch = htmlContent.match(/src="([^"]*\.js)"/);

  if (cssMatch && jsMatch) {
    const cssFile = cssMatch[1].replace('/', '');
    const jsFile = jsMatch[1].replace('/', '');

    // Read CSS and JS content
    const cssContent = fs.readFileSync(path.join('dist', cssFile), 'utf8');
    const jsContent = fs.readFileSync(path.join('dist', jsFile), 'utf8');

    // Create self-contained HTML
    const inlineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio - Design & Product Leadership</title>
    <meta name="description" content="Career timeline showcasing design leadership, product management, and innovation across successful ventures" />
    <meta name="author" content="Portfolio" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <meta property="og:title" content="Portfolio - Design & Product Leadership" />
    <meta property="og:description" content="Career timeline showcasing design leadership, product management, and innovation" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=630&fit=crop" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=630&fit=crop" />

    <style>
${cssContent}
    </style>
</head>
<body>
    <div id="root"></div>

    <script>
${jsContent}
    </script>
</body>
</html>`;

    // Write self-contained files
    fs.writeFileSync(path.join(secretDir, 'app-complete.html'), inlineHtml);
    fs.writeFileSync(path.join(flattenedDir, 'app-complete.html'), inlineHtml);

    // Create offline version without Google Fonts
    const offlineHtml = inlineHtml.replace(
      /<link rel="preconnect"[^>]*>\s*<link rel="preconnect"[^>]*>\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g,
      '<!-- Google Fonts removed for offline version -->'
    );
    fs.writeFileSync(path.join(secretDir, 'app-offline.html'), offlineHtml);
    fs.writeFileSync(path.join(flattenedDir, 'app-offline.html'), offlineHtml);

    console.log('✅ Self-contained HTML files created!');
  }
} catch (error) {
  console.log('⚠️ Could not create inline HTML files:', error.message);
}

// Create an index file for the build directory
const indexContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Build Files - rrrun</title>
    <style>
        body { font-family: monospace; background: #1a1a1a; color: #00ff00; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .file-list { list-style: none; padding: 0; }
        .file-list li { margin: 5px 0; }
        .file-list a { color: #00ff00; text-decoration: none; }
        .file-list a:hover { background: #333; padding: 2px; }
        .build-info { background: #2a2a2a; padding: 15px; border-left: 3px solid #00ff00; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📦 Build Files Ready</h1>
        <div class="build-info">
            <strong>Directory:</strong> rrrun<br>
            <strong>Build Time:</strong> ${new Date().toISOString()}<br>
            <strong>Access URL:</strong> /${secretPath}
        </div>

        <h2>📁 Available Files</h2>
        <ul class="file-list">
            <li><a href="./index.html">🌐 Main Application (requires server)</a></li>
            <li><a href="./app-complete.html">📦 Complete Self-Contained App</a></li>
            <li><a href="./app-offline.html">📱 Offline Self-Contained App</a></li>
            <li><a href="./flattened/">📂 Flattened Files Directory</a></li>
        </ul>

        <h2>📦 Flattened Files (Ready for Download)</h2>
        <ul class="file-list">
${fs.readdirSync(flattenedDir).map(file =>
    `            <li><a href="./flattened/${file}" download>📄 ${file}</a></li>`
).join('\n')}
        </ul>

        <h2>🔧 Build Info</h2>
        <p>This is a compiled, flattened version of the application in the rrrun directory.</p>
        <p>All files are self-contained and can be downloaded individually.</p>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(secretDir, 'index.html'), indexContent);

// Create a download info file
const downloadInfo = {
  directory: 'rrrun',
  secretPath,
  buildTime: new Date().toISOString(),
  accessUrl: `/${secretPath}`,
  files: fs.readdirSync(flattenedDir),
  totalFiles: fs.readdirSync(flattenedDir).length
};

fs.writeFileSync(path.join(secretDir, 'download-info.json'), JSON.stringify(downloadInfo, null, 2));

console.log(`✅ Build created successfully in rrrun directory!`);
console.log(`📍 Access URL: /${secretPath}/`);
console.log(`📦 Flattened files: ${downloadInfo.totalFiles} files available for download`);
console.log(`📁 Directory: dist/${secretPath}/flattened/`);
