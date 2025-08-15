# Error Pages Configuration

This document explains the custom error pages setup for your Hugo-based portfolio site hosted on GitHub Pages.

## Available Error Pages

### 1. 404.html - Page Not Found
- **Location**: `themes/csharp-portfolio/layouts/404.html`
- **Triggers**: When a user tries to access a non-existent page
- **Features**: 
  - Custom C# themed design
  - Navigation buttons to home and projects
  - "Go Back" functionality
  - ASCII art for visual appeal

### 2. 500.html - Internal Server Error
- **Location**: `themes/csharp-portfolio/layouts/500.html`
- **Triggers**: Server-side errors (rare on static sites)
- **Features**:
  - Try-catch code block example
  - Refresh functionality
  - Support contact link
  - Red color scheme for error indication

### 3. 503.html - Service Unavailable
- **Location**: `themes/csharp-portfolio/layouts/503.html`
- **Triggers**: During maintenance or high traffic
- **Features**:
  - Maintenance status indicator with pulsing animation
  - Auto-retry functionality
  - Amber color scheme for maintenance indication
  - Estimated completion time display

### 4. offline.html - Connection Lost
- **Location**: `themes/csharp-portfolio/layouts/offline.html`
- **Triggers**: When user is offline (via Service Worker)
- **Features**:
  - Real-time connection status detection
  - Auto-reload when connection restored
  - Network troubleshooting suggestions
  - Connection icon and status indicators

## GitHub Pages Configuration

### Automatic Error Handling
GitHub Pages automatically serves these error pages:
- `404.html` - Served for all 404 errors
- `500.html` - Available at `/500.html` (rarely used on static sites)
- `503.html` - Available at `/503.html` (for maintenance pages)

### Content Files
Error pages are generated from content files:
```markdown
# content/500.md
---
title: "Server Error"
type: "500"
layout: "500"
url: "/500.html"
---

# content/503.md  
---
title: "Service Unavailable"
type: "503"
layout: "503"
url: "/503.html"
---

# content/offline.md
---
title: "Offline"
type: "offline"  
layout: "offline"
url: "/offline.html"
---
```

## Service Worker Integration

The Service Worker (`themes/csharp-portfolio/static/sw.js`) automatically:
- Caches essential assets for offline use
- Redirects to `/offline.html` when network fails
- Provides seamless offline experience

## Build Process

Error pages are automatically built during:
```bash
npm run build      # Production build
npm run dev        # Development server
```

Generated files appear in `/public/`:
- `public/404.html`
- `public/500.html`
- `public/503.html`
- `public/offline.html`

## Theme Consistency

All error pages maintain the C# portfolio theme:
- **Code Syntax**: C# method signatures and code blocks
- **Color Scheme**: JetBrains Rider inspired colors
- **Typography**: Monospace fonts for code elements
- **Responsive**: Mobile-friendly layouts
- **Accessibility**: ARIA labels and semantic HTML
- **Animations**: Subtle pulsing indicators for status

## Testing Error Pages

### Local Testing
```bash
# Start development server
npm run dev

# Test URLs (when server is running):
http://localhost:1313/nonexistent-page  # Tests 404
http://localhost:1313/500.html          # Tests 500
http://localhost:1313/503.html          # Tests 503
http://localhost:1313/offline.html      # Tests offline
```

### Offline Testing
1. Open the site in browser
2. Open Developer Tools → Network tab
3. Check "Offline" checkbox
4. Try navigating - should show offline page

### Production Testing
After deploying to GitHub Pages:
- Test 404: Visit `your-site.github.io/nonexistent-page`
- Test 500/503: Direct access to `/500.html` or `/503.html`

## Customization

### Modifying Error Pages
1. Edit layout files in `themes/csharp-portfolio/layouts/`
2. Rebuild with `npm run build`
3. Commit and push changes

### Adding New Error Pages
1. Create layout: `themes/csharp-portfolio/layouts/[error-code].html`
2. Create content: `content/[error-code].md`
3. Add front matter with proper URL mapping
4. Rebuild and deploy

### Styling Changes
- Error-specific styles are included in each layout file
- Global styles from `themes/csharp-portfolio/assets/css/` apply automatically
- CSS custom properties ensure theme consistency

## Browser Support

Error pages work across all modern browsers and include:
- Progressive enhancement for advanced features
- Fallback functionality for older browsers  
- Service Worker support where available
- Responsive design for all screen sizes

## Maintenance

### Regular Tasks
- Monitor error page access in analytics
- Update maintenance messages in 503.html
- Test offline functionality after major changes
- Keep error pages updated with site design changes

### Troubleshooting
If error pages don't work:
1. Verify files exist in `/public/` after build
2. Check Hugo build logs for errors
3. Ensure content files have correct front matter
4. Test locally before deploying