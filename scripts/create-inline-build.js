import fs from 'fs';
import path from 'path';

console.log('🚀 Creating self-contained HTML build...');

// Read the main index.html
const indexPath = path.join('dist', 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Extract CSS and JS file paths from the HTML
const cssMatch = htmlContent.match(/href="([^"]*\.css)"/);
const jsMatch = htmlContent.match(/src="([^"]*\.js)"/);

if (!cssMatch || !jsMatch) {
  console.error('❌ Could not find CSS or JS files in index.html');
  process.exit(1);
}

const cssFile = cssMatch[1].replace('/', '');
const jsFile = jsMatch[1].replace('/', '');

console.log(`📄 Found CSS: ${cssFile}`);
console.log(`📄 Found JS: ${jsFile}`);

// Read CSS content
const cssPath = path.join('dist', cssFile);
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Read JS content
const jsPath = path.join('dist', jsFile);
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Create the self-contained HTML
const inlineHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio - Design & Product Leadership</title>
    <meta name="description" content="Career timeline showcasing design leadership, product management, and innovation across successful ventures" />
    <meta name="author" content="Portfolio" />
    
    <!-- Preconnect to Google Fonts -->
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

// Create rrrun directory if it doesn't exist
const rrrunDir = path.join('dist', 'rrrun');
if (!fs.existsSync(rrrunDir)) {
  fs.mkdirSync(rrrunDir, { recursive: true });
}

// Write the self-contained file
const inlinePath = path.join(rrrunDir, 'app-complete.html');
fs.writeFileSync(inlinePath, inlineHtml);

// Also create a version without external font dependency
const offlineHtml = inlineHtml.replace(
  /<link rel="preconnect"[^>]*>\s*<link rel="preconnect"[^>]*>\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g,
  '<!-- Google Fonts removed for offline version -->'
);

const offlinePath = path.join(rrrunDir, 'app-offline.html');
fs.writeFileSync(offlinePath, offlineHtml);

console.log('✅ Self-contained HTML files created:');
console.log(`📄 Complete version: ${inlinePath}`);
console.log(`📄 Offline version: ${offlinePath}`);
console.log(`📊 Complete file size: ${(fs.statSync(inlinePath).size / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Offline file size: ${(fs.statSync(offlinePath).size / 1024 / 1024).toFixed(2)} MB`);
