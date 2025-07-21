
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building static site...\n');

try {
  // Clean previous build
  if (fs.existsSync('dist')) {
    console.log('📁 Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if build was successful
  if (fs.existsSync('dist')) {
    console.log('\n✅ Build successful!');
    console.log('📁 Static files are ready in the "dist" folder');
    console.log('\n📋 Contents:');
    
    const distContents = fs.readdirSync('dist');
    distContents.forEach(item => {
      const itemPath = path.join('dist', item);
      const stats = fs.statSync(itemPath);
      const type = stats.isDirectory() ? '📁' : '📄';
      console.log(`   ${type} ${item}`);
    });

    console.log('\n🌐 To test locally, you can use:');
    console.log('   npx serve dist');
    console.log('   or');
    console.log('   python -m http.server 8000 --directory dist');
    
  } else {
    console.error('❌ Build failed - dist folder not created');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
