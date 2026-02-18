# Custom Inputs Test Suite

A React application for testing Acoustic Connect SDK behavior with various UI libraries (Material-UI, shadcn, Ant Design, Chakra UI).

## Overview

This React app is integrated as a subpage of the test-website GitHub Pages site. It uses the same SDK (`scripts/acoconnect.js`) and localStorage configuration as other test pages.

## Project Structure

```
test-website/
├── custom-inputs-source/      # SOURCE CODE (development)
│   ├── src/                    # React components
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md              # This file
│
└── custom-inputs/              # BUILT FILES (production)
    ├── index.html
    └── assets/
        ├── index-[hash].js    # Bundled React app
        └── index-[hash].css   # Styles
```

## Development Workflow

### 1. Install Dependencies

```bash
cd /Users/Acoustic_1/Documents/Projects/test-website/custom-inputs-source
npm install
```

### 2. Local Development

Run the Vite dev server:

```bash
npm run dev
```

Visit: http://localhost:5173/custom-inputs/

**Note:** The dev server runs with the `/custom-inputs/` base path to match production.

### 3. Make Changes

Edit files in `src/` directory:
- `src/App.tsx` - Main application component
- `src/components/` - UI library test pages
- `src/utils/` - Utilities and types

### 4. Build for Production

When ready to deploy changes:

```bash
npm run build
```

**What happens:**
- TypeScript compiles to JavaScript
- Vite bundles all code and assets
- Output goes to `../custom-inputs/` directory
- SDK is loaded externally (not bundled)

### 5. Test the Build Locally

From the test-website root directory:

```bash
cd /Users/Acoustic_1/Documents/Projects/test-website
docker compose up
```

Visit:
- Main page: http://localhost:3040/
- React app: http://localhost:3040/custom-inputs/

**Alternative (without Docker):**
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000/
```

**Verify:**
- All tabs load correctly
- SDK loads (check `window.TLT` in console)
- No 404 errors in Network tab
- Navigation works between routes
- localStorage config is read correctly

### 6. Commit and Deploy

```bash
# Stage both source and built files
git add custom-inputs-source/
git add custom-inputs/

# Commit with descriptive message
git commit -m "Update custom inputs: [describe your changes]"

# Push to GitHub
git push origin main
```

**GitHub Pages automatically deploys** within 1-2 minutes.

## Configuration

### Vite Config

```typescript
base: '/custom-inputs/'        // Base path for GitHub Pages
outDir: '../custom-inputs'     // Output to parent directory
```

### React Router

```typescript
basename="/custom-inputs"      // Must match Vite base
```

### SDK Integration

The SDK is loaded from the parent directory and initialized with localStorage config:

```html
<script src="../scripts/acoconnect.js"></script>
<script>
  var appKey = localStorage.getItem('appKey') || 'default-key';
  var wsCollectorUrl = localStorage.getItem('wsCollectorUrl') || 'default-url';
  window.TLT && window.TLT.initLib(appKey, wsCollectorUrl);
</script>
```

## Deployment

### Current Setup: Manual Build

**Pros:**
- Simple, no CI/CD required
- Full control over when builds happen
- Works immediately

**Cons:**
- Must remember to build before committing
- Easy to forget and commit outdated build
- Build artifacts in git (increases repo size)

### Production URLs

- **Main site:** https://aciele.github.io/test-website/
- **React app:** https://aciele.github.io/test-website/custom-inputs/
- **Routes:**
  - `/custom-inputs/mui` - Material-UI
  - `/custom-inputs/shadcn` - shadcn/ui
  - `/custom-inputs/antd` - Ant Design
  - `/custom-inputs/chakra` - Chakra UI

## Architecture

### SDK Loading Strategy

**External SDK (not bundled):**
- SDK loaded from `../scripts/acoconnect.js` (718KB)
- Shared across all test pages
- Initialized with localStorage config
- No duplication (saves ~330KB vs bundled approach)

### React Router Configuration

- Uses `BrowserRouter` with `basename="/custom-inputs"`
- Supports direct URL access to routes
- Browser back/forward buttons work correctly

### TypeScript

Type declarations for the SDK are in `src/utils/types.ts`:

```typescript
declare global {
  interface Window {
    TLT?: {
      initLib: (appKey: string, wsCollectorUrl: string) => void;
      registerBridgeCallbacks: (callbacks: unknown[]) => void;
    };
  }
}
```

## Troubleshooting

### Build fails with TypeScript errors

Check that SDK types are correct in `src/utils/types.ts`.

### 404 errors for assets

Make sure:
1. You ran `npm run build` after making changes
2. The `custom-inputs/` directory exists
3. Vite `base` path matches React Router `basename`

### SDK not loading

Check:
1. `window.TLT` exists in browser console
2. `scripts/acoconnect.js` is accessible at `../scripts/acoconnect.js`
3. localStorage contains `appKey` and `wsCollectorUrl`

### Routes don't work on GitHub Pages

Ensure React Router `basename` matches the deployed path:
- Local: `/custom-inputs`
- GitHub Pages: `/custom-inputs` (GitHub handles the `/test-website/` prefix)

## Future Enhancements

- Add GitHub Actions for automated builds
- Add `custom-inputs/404.html` for deep linking support
- Code splitting with dynamic imports
- Lazy load UI library pages

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS
- **UI Libraries:** Material-UI, shadcn/ui, Ant Design, Chakra UI

## Links

- **Repository:** https://github.com/aciele/test-website
- **Live Site:** https://aciele.github.io/test-website/
- **Main Index:** [../index.html](../index.html)
