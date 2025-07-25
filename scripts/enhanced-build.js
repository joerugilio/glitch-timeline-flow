import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createHash } from 'crypto';

console.log('🚀 Creating Enhanced Portfolio Build Package...\n');

const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
const buildId = createHash('md5').update(timestamp).digest('hex').slice(0, 8);

// Enhanced build configuration
const config = {
  outputDir: 'dist',
  packageDir: `portfolio-build-${buildId}`,
  versions: {
    complete: 'portfolio-complete.html',
    offline: 'portfolio-offline.html',
    minimal: 'portfolio-minimal.html'
  },
  compress: true,
  includeSource: false
};

async function createEnhancedBuild() {
  try {
    // Step 1: Clean and build
    console.log('📁 Cleaning previous builds...');
    if (fs.existsSync(config.outputDir)) {
      fs.rmSync(config.outputDir, { recursive: true, force: true });
    }

    console.log('🔨 Building project...');
    execSync('npm run build', { stdio: 'inherit' });

    // Step 2: Create package directory
    const packagePath = path.join(config.outputDir, config.packageDir);
    if (!fs.existsSync(packagePath)) {
      fs.mkdirSync(packagePath, { recursive: true });
    }

    // Step 3: Copy standard build
    console.log('📦 Creating standard build copy...');
    const standardDir = path.join(packagePath, 'standard');
    copyDirectory(config.outputDir, standardDir, [config.packageDir]);

    // Step 4: Create enhanced versions
    console.log('✨ Creating enhanced versions...');
    await createEnhancedVersions(packagePath);

    // Step 5: Create download package
    console.log('📋 Creating download package...');
    await createDownloadPackage(packagePath);

    // Step 6: Generate build info and instructions
    console.log('📄 Generating build information...');
    await generateBuildInfo(packagePath);

    // Step 7: Create archive if compression enabled
    if (config.compress) {
      console.log('🗜️ Creating compressed archive...');
      await createArchive(packagePath);
    }

    console.log('\n✅ Enhanced build package created successfully!');
    console.log(`📁 Package location: ${config.outputDir}/${config.packageDir}`);
    console.log(`🔗 Access URL: /${config.packageDir}/`);

    // Display package contents
    displayPackageContents(packagePath);

  } catch (error) {
    console.error('❌ Enhanced build failed:', error.message);
    process.exit(1);
  }
}

function copyDirectory(src, dest, exclude = []) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    if (exclude.includes(item)) return;
    
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stats = fs.statSync(srcPath);
    
    if (stats.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

async function createEnhancedVersions(packagePath) {
  const indexPath = path.join(config.outputDir, 'index.html');
  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Extract CSS and JS file paths
  const cssMatch = htmlContent.match(/href="([^"]*\.css)"/);
  const jsMatch = htmlContent.match(/src="([^"]*\.js)"/);

  if (!cssMatch || !jsMatch) {
    throw new Error('Could not find CSS or JS files in index.html');
  }

  const cssFile = cssMatch[1].replace(/^\//, '');
  const jsFile = jsMatch[1].replace(/^\//, '');

  // Read file contents
  const cssContent = fs.readFileSync(path.join(config.outputDir, cssFile), 'utf8');
  const jsContent = fs.readFileSync(path.join(config.outputDir, jsFile), 'utf8');

  // Create base template
  const baseTemplate = (title, additionalMeta = '', styleContent = cssContent, scriptContent = jsContent) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="Career timeline showcasing design leadership, product management, and innovation across successful ventures" />
    <meta name="author" content="Portfolio" />
    
    <!-- SEO and Social Media Meta Tags -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="Career timeline showcasing design leadership, product management, and innovation" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=630&fit=crop" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="Career timeline showcasing design leadership, product management, and innovation" />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=630&fit=crop" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>" />
    
    ${additionalMeta}
    
    <style>
        /* Critical CSS for faster loading */
        body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        #root { min-height: 100vh; }
        
        /* Enhanced styles */
        ${styleContent}
        
        /* Print styles */
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            * { color: black !important; }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <!-- Build Info Comment -->
    <!-- Generated: ${new Date().toISOString()} -->
    <!-- Build ID: ${buildId} -->
    <!-- Version: Enhanced Portfolio Build -->
    
    <script>
        // Enhanced error handling
        window.addEventListener('error', function(e) {
            console.error('Portfolio Error:', e.error);
        });
        
        // Portfolio application
        ${scriptContent}
    </script>
</body>
</html>`;

  // Version 1: Complete with Google Fonts
  const completeHtml = baseTemplate(
    'Portfolio - Complete Edition',
    `<!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`
  );

  // Version 2: Offline (no external dependencies)
  const offlineHtml = baseTemplate(
    'Portfolio - Offline Edition',
    '<!-- Offline version - no external dependencies -->'
  );

  // Version 3: Minimal (compressed)
  const minimalCss = cssContent.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  const minimalJs = jsContent; // Keep JS as-is for now
  const minimalHtml = baseTemplate(
    'Portfolio - Minimal Edition',
    '<!-- Minimal version - optimized for size -->',
    minimalCss,
    minimalJs
  ).replace(/\s+/g, ' ').replace(/>\s+</g, '><');

  // Write enhanced versions
  fs.writeFileSync(path.join(packagePath, config.versions.complete), completeHtml);
  fs.writeFileSync(path.join(packagePath, config.versions.offline), offlineHtml);
  fs.writeFileSync(path.join(packagePath, config.versions.minimal), minimalHtml);

  console.log('  ✅ Complete version created (with Google Fonts)');
  console.log('  ✅ Offline version created (no external dependencies)');
  console.log('  ✅ Minimal version created (size optimized)');
}

async function createDownloadPackage(packagePath) {
  const downloadDir = path.join(packagePath, 'downloads');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Copy all standalone HTML files to downloads
  Object.values(config.versions).forEach(filename => {
    const src = path.join(packagePath, filename);
    const dest = path.join(downloadDir, filename);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });

  // Copy standard build to downloads
  const standardSrc = path.join(packagePath, 'standard');
  const standardDest = path.join(downloadDir, 'standard-build');
  copyDirectory(standardSrc, standardDest);

  console.log('  ✅ Download package created');
}

async function generateBuildInfo(packagePath) {
  const stats = {
    complete: getFileStats(path.join(packagePath, config.versions.complete)),
    offline: getFileStats(path.join(packagePath, config.versions.offline)),
    minimal: getFileStats(path.join(packagePath, config.versions.minimal))
  };

  const buildInfo = {
    buildId,
    timestamp: new Date().toISOString(),
    versions: {
      complete: {
        filename: config.versions.complete,
        description: 'Full-featured version with Google Fonts and all optimizations',
        size: stats.complete.size,
        sizeFormatted: stats.complete.formatted,
        features: ['Google Fonts', 'Full CSS', 'SEO optimized', 'Social media meta tags']
      },
      offline: {
        filename: config.versions.offline,
        description: 'Offline-ready version with no external dependencies',
        size: stats.offline.size,
        sizeFormatted: stats.offline.formatted,
        features: ['No external dependencies', 'Offline ready', 'Full functionality']
      },
      minimal: {
        filename: config.versions.minimal,
        description: 'Size-optimized version for fast loading',
        size: stats.minimal.size,
        sizeFormatted: stats.minimal.formatted,
        features: ['Compressed CSS', 'Minimal whitespace', 'Fast loading']
      }
    },
    directories: {
      standard: 'Traditional build with separate CSS/JS files',
      downloads: 'All files ready for individual download'
    }
  };

  // Write JSON info
  fs.writeFileSync(
    path.join(packagePath, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );

  // Create HTML info page
  const infoHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Build Package - ${buildId}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px; margin: 0 auto; padding: 20px;
            background: #fafafa; color: #333;
        }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                 color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .version-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
        .version-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .version-card h3 { margin-top: 0; color: #667eea; }
        .download-btn { 
            display: inline-block; background: #667eea; color: white; 
            padding: 10px 20px; text-decoration: none; border-radius: 5px;
            margin: 10px 10px 10px 0;
        }
        .download-btn:hover { background: #5a67d8; }
        .feature-list { list-style: none; padding: 0; }
        .feature-list li { padding: 5px 0; }
        .feature-list li:before { content: "✅ "; }
        .file-size { font-size: 1.2em; font-weight: bold; color: #2d3748; }
        .info-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="header">
        <h1>📦 Enhanced Portfolio Build Package</h1>
        <p>Build ID: <strong>${buildId}</strong> | Generated: ${new Date().toLocaleString()}</p>
    </div>

    <div class="info-section">
        <h2>🚀 Available Versions</h2>
        <div class="version-grid">
            ${Object.entries(buildInfo.versions).map(([key, version]) => `
                <div class="version-card">
                    <h3>${version.filename}</h3>
                    <p>${version.description}</p>
                    <div class="file-size">Size: ${version.sizeFormatted}</div>
                    <ul class="feature-list">
                        ${version.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <a href="./${version.filename}" class="download-btn" download>Download ${key.charAt(0).toUpperCase() + key.slice(1)}</a>
                    <a href="./${version.filename}" class="download-btn" target="_blank">Preview</a>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="info-section">
        <h2>📁 Additional Downloads</h2>
        <a href="./downloads/standard-build/" class="download-btn">📂 Standard Build Folder</a>
        <a href="./downloads/" class="download-btn">📦 All Downloads</a>
        <a href="./build-info.json" class="download-btn">📄 Build Info (JSON)</a>
    </div>

    <div class="info-section">
        <h2>📖 Usage Instructions</h2>
        <h3>Quick Start:</h3>
        <ol>
            <li><strong>Single File:</strong> Download any of the HTML versions above and open in a web browser</li>
            <li><strong>Server Setup:</strong> Use the standard build folder for traditional hosting</li>
            <li><strong>Offline Use:</strong> The offline version works without internet connection</li>
        </ol>
        
        <h3>Hosting Options:</h3>
        <ul>
            <li><strong>Static Hosting:</strong> Upload any version to Netlify, Vercel, or GitHub Pages</li>
            <li><strong>CDN:</strong> Use the minimal version for fastest loading</li>
            <li><strong>Local Server:</strong> Use <code>npx serve standard-build</code> for development</li>
        </ul>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(packagePath, 'index.html'), infoHtml);
  console.log('  ✅ Build information and index page created');
}

function getFileStats(filepath) {
  if (!fs.existsSync(filepath)) {
    return { size: 0, formatted: '0 B' };
  }
  
  const stats = fs.statSync(filepath);
  const size = stats.size;
  const formatted = formatFileSize(size);
  
  return { size, formatted };
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function createArchive(packagePath) {
  try {
    const archiveName = `${config.packageDir}.tar.gz`;
    const archivePath = path.join(config.outputDir, archiveName);
    
    // Create tar.gz archive
    execSync(`tar -czf "${archivePath}" -C "${config.outputDir}" "${config.packageDir}"`, { stdio: 'pipe' });
    
    const archiveStats = getFileStats(archivePath);
    console.log(`  ✅ Archive created: ${archiveName} (${archiveStats.formatted})`);
  } catch (error) {
    console.log('  ⚠️ Archive creation failed (tar not available):', error.message);
  }
}

function displayPackageContents(packagePath) {
  console.log('\n📋 Package Contents:');
  console.log(`📁 ${config.packageDir}/`);
  console.log('├── 📄 index.html (Package info and downloads)');
  console.log('├── 📄 build-info.json (Build metadata)');
  console.log('├── 📄 portfolio-complete.html (Full version)');
  console.log('├── 📄 portfolio-offline.html (Offline version)');
  console.log('├── 📄 portfolio-minimal.html (Minimal version)');
  console.log('├── 📁 standard/ (Traditional build)');
  console.log('└── 📁 downloads/ (All files for download)');
  
  console.log('\n🌐 Access Options:');
  console.log(`• Package index: /${config.packageDir}/`);
  console.log(`• Complete version: /${config.packageDir}/portfolio-complete.html`);
  console.log(`• Offline version: /${config.packageDir}/portfolio-offline.html`);
  console.log(`• Minimal version: /${config.packageDir}/portfolio-minimal.html`);
}

// Run the enhanced build
createEnhancedBuild();
