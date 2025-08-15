# C# Portfolio Hugo Theme

A developer-focused Hugo theme inspired by C# programming aesthetics and JetBrains Rider's color schemes. Perfect for C# developers who want their portfolio to reflect their technical identity.

![Theme Preview](https://via.placeholder.com/800x400/2B2B2B/A9B7C6?text=C%23+Portfolio+Theme)

## Features

-   🎨 **JetBrains Rider Color Schemes** - Both light and dark modes using authentic Rider colors
-   🌓 **Smart Theme Toggle** - Automatic system preference detection with manual override
-   📱 **Fully Responsive** - Mobile-first design that works on all devices
-   ⚡ **Performance Optimized** - Critical CSS inlining, font optimization, and minified assets
-   🔤 **Developer Typography** - JetBrains Mono font with C#-inspired design elements
-   📝 **Syntax Highlighting** - Code blocks styled to match Rider's syntax highlighting
-   ♿ **Accessible** - WCAG 2.1 AA compliant with proper semantic HTML
-   🎯 **Portfolio Focused** - Dedicated sections for projects, skills, and professional information

## Quick Start

### 1. Install the Theme

#### Option A: Git Submodule (Recommended)

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/csharp-portfolio-theme.git themes/csharp-portfolio
```

#### Option B: Download

Download the theme and extract it to `themes/csharp-portfolio/` in your Hugo site directory.

### 2. Configure Your Site

Update your `hugo.toml` (or `config.toml`) file:

```toml
baseURL = 'https://yoursite.com/'
languageCode = 'en-us'
title = 'Your Name - C# Developer'
theme = 'csharp-portfolio'

# Enable syntax highlighting
[markup]
  [markup.highlight]
    style = "github"
    lineNos = true
    codeFences = true
    guessSyntax = true
    noClasses = false

# Theme parameters
[params]
  author = "Your Name"
  description = "Full-stack C# developer passionate about clean code"

  [params.hero]
    title = "Hello, World!"
    subtitle = "// Full-stack developer specializing in C# and .NET"
    showTypingAnimation = true

  [params.social]
    github = "yourusername"
    linkedin = "yourprofile"
    email = "your.email@example.com"
```

### 3. Create Content

Create your first project:

```bash
hugo new projects/my-awesome-project.md
```

### 4. Run Your Site

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site in action!

## Configuration

### Theme Settings

```toml
[params.theme]
  # Default theme mode: "auto", "light", or "dark"
  defaultMode = "auto"
  # Enable theme toggle button
  enableToggle = true
  # Enable typing animation in hero section
  enableTypingAnimation = true
```

### Hero Section

```toml
[params.hero]
  title = "Hello, World!"
  subtitle = "// Your professional tagline here"
  showTypingAnimation = true
```

### About Section

```toml
[params.about]
  description = """
Your professional bio here. Supports **markdown** formatting.
"""
  profileImage = "/images/profile.jpg" # Optional
  experience = 5
  projects = 50
  available = true

  # Skills displayed as C# using statements
  [[params.about.skills]]
    category = "Microsoft"
    name = "AspNetCore"

  [[params.about.skills]]
    category = "System"
    name = "Linq"
```

### Social Links

```toml
[params.social]
  github = "yourusername"
  linkedin = "yourprofile"
  twitter = "yourusername"
  email = "your.email@example.com"
```

### Navigation Menu

```toml
[menu]
  [[menu.main]]
    name = "Portfolio.About"
    url = "/about/"
    weight = 10

  [[menu.main]]
    name = "Portfolio.Projects"
    url = "/projects/"
    weight = 20
```

## Content Types

### Projects

Create project files in `content/projects/`:

```yaml
---
title: "Project Name"
description: "Brief project description"
date: 2024-01-01
draft: false
featured: true
technologies: ["C#", "ASP.NET Core", "React"]
github: "https://github.com/user/repo"
demo: "https://demo.example.com"
image: "/images/projects/project.png"
---
## Project content here...
```

### About Page

Create `content/about.md`:

```yaml
---
title: "About"
description: "Learn more about my development journey"
date: 2024-01-01
draft: false
type: "about"
layout: "single"
---
## Your about content here...
```

## Customization

### Colors

The theme uses CSS custom properties for easy color customization. Override them in your own CSS:

```css
:root {
	--color-primary: #your-color;
	--color-secondary: #your-color;
	/* See _colors.scss for all available variables */
}
```

### Fonts

To use different fonts, override the font variables:

```css
:root {
	--font-mono: "Your Mono Font", monospace;
	--font-sans: "Your Sans Font", sans-serif;
}
```

### Layout

The theme provides several layout options:

-   `single` - Standard single page layout
-   `list` - List layout for content collections
-   `about` - Special layout for about pages

## Performance

The theme is optimized for performance:

-   **Critical CSS Inlining** - Above-the-fold styles are inlined
-   **Font Display Swap** - Prevents invisible text during font load
-   **Asset Minification** - CSS and JS are minified in production
-   **Responsive Images** - Automatic image optimization

### Performance Settings

```toml
[params.performance]
  inlineCriticalCSS = true
  fontDisplaySwap = true
  minifyAssets = true
```

## Browser Support

-   Chrome 90+
-   Firefox 88+
-   Safari 14+
-   Edge 90+

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This theme is released under the [MIT License](LICENSE).

## Support

-   📖 [Documentation](https://github.com/yourusername/csharp-portfolio-theme/wiki)
-   🐛 [Issue Tracker](https://github.com/yourusername/csharp-portfolio-theme/issues)
-   💬 [Discussions](https://github.com/yourusername/csharp-portfolio-theme/discussions)

## Credits

-   Inspired by [JetBrains Rider](https://www.jetbrains.com/rider/) color schemes
-   Built with [Hugo](https://gohugo.io/)
-   Typography powered by [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

---

Made with ❤️ for the C# developer community
