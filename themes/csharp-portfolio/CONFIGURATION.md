# Configuration Guide

This guide covers all configuration options available in the C# Portfolio Hugo theme.

## Table of Contents

-   [Basic Configuration](#basic-configuration)
-   [Theme Settings](#theme-settings)
-   [Hero Section](#hero-section)
-   [About Section](#about-section)
-   [Social Links](#social-links)
-   [Navigation Menu](#navigation-menu)
-   [SEO Settings](#seo-settings)
-   [Performance Settings](#performance-settings)
-   [Content Configuration](#content-configuration)
-   [Customization](#customization)

## Basic Configuration

### Site Configuration

```toml
baseURL = 'https://yoursite.com/'
languageCode = 'en-us'
title = 'Your Name - C# Developer'
theme = 'csharp-portfolio'

# Enable syntax highlighting
[markup]
  [markup.highlight]
    style = "github"           # Syntax highlighting style
    lineNos = true            # Show line numbers
    codeFences = true         # Enable code fences
    guessSyntax = true        # Guess syntax for unlabeled code blocks
    noClasses = false         # Use CSS classes instead of inline styles
```

### Author Information

```toml
[params]
  author = "Your Name"
  description = "Brief description of yourself and your expertise"
```

## Theme Settings

Control the overall behavior and appearance of the theme:

```toml
[params.theme]
  # Default theme mode when user visits for the first time
  # Options: "auto", "light", "dark"
  # "auto" respects system preference
  defaultMode = "auto"

  # Enable/disable the theme toggle button
  enableToggle = true

  # Enable typing animation in hero section
  enableTypingAnimation = true
```

## Hero Section

Configure the main hero section on your homepage:

```toml
[params.hero]
  # Main title displayed prominently
  title = "Hello, World!"

  # Subtitle with C# comment styling
  subtitle = "// Your professional tagline here"

  # Enable/disable typing animation for the title
  showTypingAnimation = true
```

## About Section

### Basic About Information

```toml
[params.about]
  # Your professional bio (supports markdown)
  description = """
Your professional bio here. You can use **markdown** formatting
including links, emphasis, and code blocks.
"""

  # Optional profile image path (relative to static folder)
  profileImage = "/images/profile.jpg"

  # Professional statistics
  experience = 5        # Years of experience
  projects = 50         # Number of projects completed
  available = true      # Currently available for work
```

### Skills Configuration

Display skills as C# using statements:

```toml
# Skills displayed as C# using statements in the hero/about section
[[params.about.skills]]
  category = "Microsoft"
  name = "AspNetCore"

[[params.about.skills]]
  category = "Microsoft"
  name = "EntityFrameworkCore"

[[params.about.skills]]
  category = "System"
  name = "Linq"

[[params.about.skills]]
  category = "Microsoft"
  name = "Azure"
```

### Skill Categories

For detailed about pages, organize skills into categories:

```toml
[[params.about.skillCategories]]
  name = "Backend"              # Display name
  category = "Backend"          # Internal category
  skills = [                    # Array of skills
    "C#",
    "ASP.NET Core",
    "Entity Framework",
    "SQL Server"
  ]

[[params.about.skillCategories]]
  name = "Frontend"
  category = "Frontend"
  skills = ["React", "TypeScript", "HTML5", "CSS3", "Blazor"]

[[params.about.skillCategories]]
  name = "Cloud & DevOps"
  category = "Cloud"
  skills = [
    "Microsoft Azure",
    "Docker",
    "Kubernetes",
    "Azure DevOps"
  ]
```

## Social Links

Configure your social media and contact links:

```toml
[params.social]
  github = "yourusername"       # GitHub username
  linkedin = "yourprofile"      # LinkedIn profile name
  twitter = "yourusername"      # Twitter handle (without @)
  email = "your.email@example.com"  # Email address

  # Optional additional social links
  stackoverflow = "userid"      # Stack Overflow user ID
  dev = "username"             # Dev.to username
  medium = "username"          # Medium username
```

## Navigation Menu

Configure the main navigation menu:

```toml
[menu]
  [[menu.main]]
    name = "Portfolio.About"    # Display name (C# namespace style)
    url = "/about/"            # URL path
    weight = 10                # Sort order (lower = first)

  [[menu.main]]
    name = "Portfolio.Projects"
    url = "/projects/"
    weight = 20

  [[menu.main]]
    name = "Portfolio.Skills"
    url = "/skills/"
    weight = 30

  [[menu.main]]
    name = "Portfolio.Contact"
    url = "/contact/"
    weight = 40
```

## SEO Settings

Optimize your site for search engines:

```toml
[params.seo]
  # Default meta description for pages without one
  description = "Portfolio website showcasing C# development expertise"

  # Default keywords (comma-separated)
  keywords = [
    "C#",
    ".NET",
    "developer",
    "portfolio",
    "full-stack"
  ]

  # Author name for meta tags
  author = "Your Name"

  # Open Graph settings
  [params.seo.openGraph]
    siteName = "Your Portfolio"
    type = "website"
    locale = "en_US"
```

## Performance Settings

Control performance optimizations:

```toml
[params.performance]
  # Inline critical CSS for faster initial page load
  inlineCriticalCSS = true

  # Use font-display: swap for better font loading
  fontDisplaySwap = true

  # Minify CSS and JavaScript assets
  minifyAssets = true

  # Enable resource hints for better performance
  enableResourceHints = true
```

## Content Configuration

### Project Content Type

For project pages, use this front matter structure:

```yaml
---
title: "Project Name"
description: "Brief project description"
date: 2024-01-01
draft: false
featured: true # Show on homepage
technologies: ["C#", "ASP.NET Core", "React"]
github: "https://github.com/user/repo"
demo: "https://demo.example.com"
image: "/images/projects/project.png"
---
```

### About Page Configuration

```yaml
---
title: "About"
description: "Learn more about my development journey"
date: 2024-01-01
draft: false
type: "about" # Special about page type
layout: "single" # Use single page layout
showTableOfContents: true # Show TOC for long content
---
```

### Blog Post Configuration

```yaml
---
title: "Blog Post Title"
description: "Post description"
date: 2024-01-01
draft: false
tags: ["C#", "tutorial"]
categories: ["development"]
author: "Your Name"
showReadingTime: true # Show estimated reading time
showShareButtons: true # Show social share buttons
---
```

## Customization

### Color Customization

Override theme colors by creating a custom CSS file:

```css
/* assets/css/custom.css */
:root {
	/* Primary colors */
	--color-primary: #your-color;
	--color-secondary: #your-color;

	/* Background colors */
	--color-bg-primary: #your-color;
	--color-bg-secondary: #your-color;

	/* Text colors */
	--color-text-primary: #your-color;
	--color-text-secondary: #your-color;

	/* Accent colors */
	--color-accent: #your-color;
	--color-accent-hover: #your-color;
}
```

### Font Customization

```css
:root {
	/* Monospace font for code-like elements */
	--font-mono: "Your Mono Font", "JetBrains Mono", monospace;

	/* Sans-serif font for body text */
	--font-sans: "Your Sans Font", "Segoe UI", sans-serif;

	/* Font sizes */
	--font-size-xs: 0.75rem;
	--font-size-sm: 0.875rem;
	--font-size-base: 1rem;
	--font-size-lg: 1.125rem;
	--font-size-xl: 1.25rem;
}
```

### Layout Customization

Override layout templates by creating files in your site's `layouts` directory:

```
layouts/
├── _default/
│   ├── baseof.html          # Override base template
│   ├── single.html          # Override single page template
│   └── list.html            # Override list template
├── partials/
│   ├── header.html          # Override header
│   ├── footer.html          # Override footer
│   └── hero.html            # Override hero section
└── index.html               # Override homepage
```

### Adding Custom JavaScript

```html
<!-- layouts/partials/custom-head.html -->
<script>
	// Your custom JavaScript here
</script>
```

Then include it in your base template:

```html
<!-- layouts/_default/baseof.html -->
<head>
	<!-- Theme head content -->
	{{ partial "custom-head.html" . }}
</head>
```

### Custom Shortcodes

Create custom shortcodes for frequently used content:

```html
<!-- layouts/shortcodes/csharp-code.html -->
<div class="code-block csharp">
	<div class="code-header">
		<span class="language">C#</span>
		{{ with .Get "title" }}
		<span class="title">{{ . }}</span>
		{{ end }}
	</div>
	<pre><code class="language-csharp">{{ .Inner }}</code></pre>
</div>
```

Usage in content:

```markdown
{{< csharp-code title="Example Class" >}}
public class Example
{
public string Name { get; set; }
}
{{< /csharp-code >}}
```

## Advanced Configuration

### Multi-language Support

```toml
defaultContentLanguage = "en"

[languages]
  [languages.en]
    title = "Your Name - C# Developer"
    weight = 1
    [languages.en.params]
      description = "English description"

  [languages.es]
    title = "Tu Nombre - Desarrollador C#"
    weight = 2
    [languages.es.params]
      description = "Descripción en español"
```

### Custom Taxonomies

```toml
[taxonomies]
  tag = "tags"
  category = "categories"
  technology = "technologies"
  skill = "skills"
```

### Build Configuration

```toml
# Hugo build settings
[build]
  writeStats = true             # Generate build statistics

[minify]
  disableCSS = false           # Minify CSS
  disableHTML = false          # Minify HTML
  disableJS = false            # Minify JavaScript
  disableJSON = false          # Minify JSON
  disableSVG = false           # Minify SVG
  disableXML = false           # Minify XML
```

## Environment-Specific Configuration

### Development Configuration

```toml
# config/development/config.toml
[params.performance]
  minifyAssets = false          # Don't minify in development
  inlineCriticalCSS = false     # Don't inline CSS in development

[markup.highlight]
  lineNos = true               # Show line numbers in development
```

### Production Configuration

```toml
# config/production/config.toml
[params.performance]
  minifyAssets = true          # Minify in production
  inlineCriticalCSS = true     # Inline critical CSS in production

[params.analytics]
  googleAnalytics = "GA-XXXXXXX"  # Google Analytics ID
```

## Troubleshooting

### Common Issues

1. **Theme not loading**: Ensure the theme is in `themes/csharp-portfolio/` and `theme = 'csharp-portfolio'` is set in config.

2. **Fonts not loading**: Check that font files are accessible and font-display settings are correct.

3. **Colors not applying**: Verify CSS custom properties are properly defined and not overridden.

4. **Menu not showing**: Check that menu items are properly configured with correct weights.

5. **Projects not displaying**: Ensure project files have correct front matter and are not marked as drafts.

### Debug Mode

Enable debug mode for troubleshooting:

```toml
[params.debug]
  enabled = true               # Enable debug mode
  showConfig = true            # Show configuration in console
  showBuildInfo = true         # Show build information
```

This will add debug information to your browser's console to help identify configuration issues.
