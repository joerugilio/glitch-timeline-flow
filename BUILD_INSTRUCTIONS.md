
# Getting Static Files for Deployment

This project can be compiled into static files (HTML, CSS, JS, JSON) for deployment anywhere. Here are your options:

## Option 1: Local Build (Fastest)

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Or use the enhanced build script
npm run build-static
```

The compiled files will be in the `dist/` folder. You can then:
- Upload the `dist/` folder contents to any web server
- Use the files with any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Option 2: GitHub Actions (Automated)

Once you push your code to GitHub:

1. **Automatic Builds**: Every push to main branch triggers a build
2. **Download Artifacts**: 
   - Go to your GitHub repo → Actions tab
   - Click on the latest workflow run
   - Download the `static-site-[hash]` artifact
3. **Releases**: Tagged releases are created automatically with download links

## Option 3: Test Locally

After building, test your static files locally:

```bash
# Option A: Using npx serve
npx serve dist

# Option B: Using Python
python -m http.server 8000 --directory dist

# Option C: Using Node.js http-server
npx http-server dist
```

## File Structure

After building, your `dist/` folder will contain:

```
dist/
├── index.html          # Main HTML file
├── assets/            
│   ├── index-[hash].js # Bundled JavaScript
│   ├── index-[hash].css # Compiled CSS
│   └── [images]       # Optimized images
└── [other static files]
```

## Deployment Notes

- All JSON data is bundled into the JavaScript files
- Images are optimized and fingerprinted for caching
- The build is production-ready with minification
- All routes are handled by the single `index.html` (SPA routing)

## Troubleshooting

If you encounter issues:
1. Make sure Node.js version is 16 or higher
2. Clear `node_modules` and run `npm install` again
3. Check that all dependencies installed successfully
4. Verify the `dist/` folder was created after build
