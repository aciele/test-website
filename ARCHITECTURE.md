# Test Website Architecture Documentation

## Overview

This is a multi-environment test website for Acoustic Connect SDK, designed to work seamlessly across:
- **GitHub Pages** (production): `https://username.github.io/test-website/`
- **Docker (local)**: `http://localhost:3040/`
- **Vite Dev Server**: `http://localhost:5173/custom-inputs/`

## Project Structure

```
test-website/
├── index.html                    # Main landing page with SDK configuration UI
├── 404.html                      # Root 404 handler (GitHub Pages SPA routing)
├── scripts/
│   └── acoconnect.js            # Acoustic Connect SDK
├── basic-pages/                  # Static HTML test pages (source-controlled)
│   ├── index.html
│   ├── form-inputs.html
│   ├── shadow-dom-*.html
│   ├── case-*.html
│   └── assets/
├── custom-inputs/                # Built React SPA (build artifact, git-ignored)
│   ├── index.html                # SPA entry point with path restoration
│   ├── 404.html                  # SPA-specific 404 for deep linking
│   └── assets/
├── custom-inputs-source/         # React source code
│   ├── src/
│   │   ├── main.tsx             # Router setup with dynamic basename
│   │   ├── App.tsx              # Main app with tab navigation
│   │   └── views/               # UI library showcases
│   ├── vite.config.ts           # Build configuration
│   └── package.json
├── docker-compose.yml            # Local nginx setup
└── nginx.conf                    # Nginx routing configuration
```

## Architecture Components

### 1. Static HTML Test Pages (`basic-pages/`)

**Purpose**: Simple static HTML pages for basic SDK testing scenarios

**Characteristics**:
- No build process
- Source-controlled HTML files
- Direct file access via web server
- Each page loads SDK from `../scripts/acoconnect.js`

**Path Structure**:
- GitHub Pages: `/test-website/basic-pages/form-inputs.html`
- Docker Local: `/basic-pages/form-inputs.html`

**Examples**:
- `form-inputs.html` - Basic HTML form elements
- `shadow-dom-*.html` - Shadow DOM test cases
- `case-*.html` - iFrame scenarios
- `map-test.html` - HTML + Shadow DOM combinations

---

### 2. React SPA (`custom-inputs/`)

**Purpose**: Interactive showcase of UI library components (Material UI, shadcn/ui, Ant Design, Chakra UI) with SDK integration

**Characteristics**:
- React 19 + Vite + TypeScript
- Client-side routing (React Router)
- Built from `custom-inputs-source/`
- Requires SPA routing fallback

**Path Structure**:
- GitHub Pages: `/test-website/custom-inputs/mui`
- Docker Local: `/custom-inputs/mui`
- Dev Mode: `http://localhost:5173/custom-inputs/mui`

**Routes**:
- `/mui` - Material UI components
- `/shadcn` - shadcn/ui components
- `/antd` - Ant Design components
- `/chakra` - Chakra UI components

---

## Multi-Environment Support

### Environment Detection & Path Resolution

#### GitHub Pages (`/test-website/*`)
```javascript
// custom-inputs-source/src/main.tsx
const basename = window.location.pathname.includes('/test-website/')
  ? '/test-website/custom-inputs'
  : '/custom-inputs'
```

#### Docker Local (`/*`)
```nginx
# nginx.conf
location /custom-inputs/ {
    try_files $uri $uri/ /custom-inputs/index.html;
}
```

#### Vite Dev Server (`http://localhost:5173/custom-inputs/`)
```typescript
// vite.config.ts
export default defineConfig({
  base: './',  // Relative paths for build
  server: {
    open: '/custom-inputs/mui',  // Auto-open correct route
  },
})
```

---

## GitHub Pages SPA Routing Fix

### The Problem
GitHub Pages doesn't natively support client-side routing. Deep links like `/test-website/custom-inputs/antd` return 404 because no physical file exists at that path.

### The Solution: 404 Redirect Pattern

#### 1. Root 404 Handler (`/404.html`)
```javascript
// Detects path type and redirects appropriately
if (path.includes('/custom-inputs/')) {
  // Store full path for restoration
  sessionStorage.setItem('redirect', path + search + hash);
  // Redirect to SPA entry point
  window.location.replace('/test-website/custom-inputs/');
} else {
  // Other 404s go to main site
  window.location.replace('/test-website/');
}
```

#### 2. SPA 404 Handler (`/custom-inputs/404.html`)
```javascript
// Store the attempted path
sessionStorage.setItem('redirect', location.pathname + location.search + location.hash);
// Redirect to SPA base
location.replace(location.origin + basePath);
```

#### 3. Path Restoration (`/custom-inputs/index.html`)
```javascript
// Restore the original path from sessionStorage
var redirect = sessionStorage.getItem('redirect');
if (redirect && redirect !== location.pathname) {
  sessionStorage.removeItem('redirect');
  history.replaceState(null, '', redirect);
}
```

### How It Works:
1. User navigates to `/test-website/custom-inputs/antd`
2. GitHub Pages serves root `/404.html`
3. Root 404 stores path and redirects to `/test-website/custom-inputs/`
4. SPA `index.html` loads and restores `/antd` route via `history.replaceState()`
5. React Router renders the correct component

---

## SDK Integration Pattern

### Shared Configuration Approach

All pages use the same SDK initialization pattern:

```javascript
// Load SDK from shared location
<script src="../scripts/acoconnect.js"></script>

// Initialize with localStorage config
(function() {
  var appKey = localStorage.getItem('appKey') || '825d6c04baa54875a7fa2462912acb46';
  var wsCollectorUrl = localStorage.getItem('wsCollectorUrl') || 'https://collector-eaoc.qa.goacoustic.com/collector/collectorPost';
  window.TLT && window.TLT.initLib(appKey, wsCollectorUrl);
})();
```

### Benefits:
- ✅ Configuration persists across all test pages
- ✅ Main landing page provides configuration UI
- ✅ No need to reconfigure for each test page
- ✅ Works in all environments (GitHub Pages, Docker, Dev)

---

## Build & Deployment

### Building the React SPA

```bash
cd custom-inputs-source
npm install
npm run build  # Outputs to ../custom-inputs/
```

**Build Output**:
- Vite bundles React app into `custom-inputs/`
- Uses relative paths (`base: './'`)
- Includes both `index.html` and `404.html`
- Assets are fingerprinted (e.g., `index-D599r13V.js`)

### Local Development

#### Option 1: Docker (Full Site)
```bash
docker-compose up
# Access at http://localhost:3040/
# Main site: http://localhost:3040/
# Basic pages: http://localhost:3040/basic-pages/
# Custom inputs: http://localhost:3040/custom-inputs/
```

#### Option 2: Vite Dev Server (Custom Inputs Only)
```bash
cd custom-inputs-source
npm run dev
# Opens at http://localhost:5173/custom-inputs/mui
# Hot reload enabled
```

### Deployment to GitHub Pages

```bash
# 1. Build the React app
cd custom-inputs-source
npm run build

# 2. Commit and push
git add custom-inputs/
git commit -m "build: update custom-inputs build"
git push origin main

# 3. GitHub Pages auto-deploys from main branch
```

---

## Why This Architecture?

### ✅ Separation of Concerns
- **Static HTML** (`basic-pages/`) - Simple, no build process
- **React SPA** (`custom-inputs/`) - Complex UI, requires build

### ✅ Same Path Level
```
/basic-pages/form-inputs.html
/custom-inputs/mui
```
Both are peer-level paths, consistent user experience

### ✅ Environment Agnostic
Works seamlessly across:
- GitHub Pages (with `/test-website/` prefix)
- Docker local (with `/` prefix)
- Vite dev server (with custom port)

### ✅ Proper Routing
- Static pages: Direct file access
- SPA: Client-side routing with 404 fallback

### ✅ Shared SDK
- Single SDK script location
- Shared configuration via localStorage
- Consistent initialization pattern

---

## Common Issues & Solutions

### Issue 1: Dev server opens at wrong path
**Problem**: `npm run dev` opens `http://localhost:5173/` instead of `/custom-inputs/mui`

**Solution**:
```typescript
// vite.config.ts
server: {
  open: '/custom-inputs/mui',
}
```

### Issue 2: 404 on GitHub Pages deep links
**Problem**: Direct navigation to `/test-website/custom-inputs/antd` returns 404

**Solution**: Already implemented via 404 redirect pattern (see above)

### Issue 3: Docker routing not working
**Problem**: Nginx returns 404 for SPA routes

**Solution**:
```nginx
location /custom-inputs/ {
    try_files $uri $uri/ /custom-inputs/index.html;
}
```

### Issue 4: SDK not loading
**Problem**: SDK fails to load from relative path

**Solution**: All pages use `../scripts/acoconnect.js` which resolves correctly in all environments

---

## Path Reference Table

| Environment | Main Site | Basic Pages | Custom Inputs (SPA) |
|-------------|-----------|-------------|---------------------|
| **GitHub Pages** | `/test-website/` | `/test-website/basic-pages/` | `/test-website/custom-inputs/` |
| **Docker Local** | `/` | `/basic-pages/` | `/custom-inputs/` |
| **Vite Dev** | N/A | N/A | `http://localhost:5173/custom-inputs/` |

---

## File Responsibilities

### Root Level
- `index.html` - Landing page with navigation and SDK config UI
- `404.html` - Root 404 handler, routes to main site or custom-inputs
- `docker-compose.yml` - Local nginx container setup
- `nginx.conf` - Web server routing rules

### `basic-pages/`
- All `.html` files - Static test pages (source-controlled)
- `assets/` - Shared CSS, JS for basic pages

### `custom-inputs/` (Build Artifact)
- `index.html` - SPA entry point (generated by Vite)
- `404.html` - SPA 404 handler (generated by Vite)
- `assets/` - Bundled JS/CSS (fingerprinted)

### `custom-inputs-source/` (Source Code)
- `src/main.tsx` - Router setup with dynamic basename
- `src/App.tsx` - Main app component with tab navigation
- `src/views/` - UI library component showcases
- `vite.config.ts` - Build and dev server configuration

---

## Development Workflow

### Adding a New Static Test Page
1. Create HTML file in `basic-pages/`
2. Add SDK initialization script
3. Add link in main `index.html`
4. Commit to git
5. Deploy (works immediately)

### Modifying Custom Inputs
1. Edit source in `custom-inputs-source/src/`
2. Test with `npm run dev`
3. Build with `npm run build`
4. Commit both source and build artifact
5. Push to deploy

### Testing Across Environments
1. **Local Dev**: `cd custom-inputs-source && npm run dev`
2. **Docker**: `docker-compose up` (from root)
3. **GitHub Pages**: Push to main branch, wait for deployment

---

## Best Practices

### ✅ DO:
- Keep `basic-pages/` for simple static HTML tests
- Keep `custom-inputs/` for complex interactive showcases
- Use localStorage for SDK configuration
- Test in Docker before deploying to GitHub Pages
- Commit both source (`custom-inputs-source/`) and build (`custom-inputs/`)

### ❌ DON'T:
- Mix build artifacts into `basic-pages/`
- Hardcode SDK credentials (use localStorage)
- Skip testing in Docker before deployment
- Forget to rebuild after source changes

---

## Tech Stack

### Static Pages
- Pure HTML5/CSS3/JavaScript
- No build process
- No dependencies

### Custom Inputs SPA
- **Framework**: React 19
- **Build Tool**: Vite 7.3
- **Routing**: React Router 7.13
- **Styling**: Tailwind CSS 4.1 + @tailwindcss/vite
- **UI Libraries**:
  - Material UI 7.3.8 + MUI X Date Pickers
  - shadcn/ui (Radix UI + class-variance-authority)
  - Ant Design 6.3.0
  - Chakra UI 3.33.0
- **Language**: TypeScript 5.9

### Infrastructure
- **Local**: Docker + Nginx
- **Hosting**: GitHub Pages
- **SDK**: Acoustic Connect SDK (TLT)

---

## Troubleshooting

### Dev Server Issues
```bash
# Port already in use
lsof -ti:5173 | xargs kill -9

# Clear cache
rm -rf node_modules/.vite

# Reinstall
cd custom-inputs-source
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Port conflict
docker-compose down
lsof -ti:3040 | xargs kill -9
docker-compose up

# Rebuild
docker-compose down
docker-compose up --build
```

### Build Issues
```bash
# Clean build
cd custom-inputs-source
rm -rf ../custom-inputs/*
npm run build
```

---

## Future Considerations

### Potential Improvements
- [ ] Add automated build/deploy pipeline (GitHub Actions)
- [ ] Add E2E tests for SPA routes
- [ ] Add service worker for offline support
- [ ] Add environment variable support for SDK config
- [ ] Add more UI library examples (Vue, Svelte, etc.)

### Why NOT to Move custom-inputs to basic-pages
- Different technologies (static HTML vs React SPA)
- Different routing needs (direct file access vs client-side routing)
- Different build processes (none vs Vite)
- Would break 404 handling on GitHub Pages
- Would create confusing paths (`/basic-pages/custom-inputs/mui`)

---

## Summary

This architecture provides a flexible, multi-environment test bed for Acoustic Connect SDK with:
- ✅ Simple static HTML pages for basic testing
- ✅ Complex React SPA for advanced UI library integration
- ✅ Seamless operation across GitHub Pages, Docker, and local dev
- ✅ Proper SPA routing with GitHub Pages compatibility
- ✅ Shared SDK configuration across all test pages
- ✅ Clear separation of concerns
- ✅ Straightforward development workflow

The design prioritizes simplicity, maintainability, and developer experience across all deployment environments.
