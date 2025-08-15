# Installation Guide

This guide provides detailed instructions for installing and setting up the C# Portfolio Hugo theme.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation Methods](#installation-methods)
-   [Initial Setup](#initial-setup)
-   [Configuration](#configuration)
-   [Content Creation](#content-creation)
-   [Customization](#customization)
-   [Deployment](#deployment)
-   [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

1. **Hugo Extended** (version 0.112.0 or higher)

    ```bash
    # Check your Hugo version
    hugo version

    # Should show "extended" in the output
    # Example: hugo v0.120.4+extended linux/amd64
    ```

2. **Git** (for theme installation and updates)
    ```bash
    git --version
    ```

### Installing Hugo

#### Windows

**Option 1: Chocolatey**

```powershell
choco install hugo-extended
```

**Option 2: Scoop**

```powershell
scoop install hugo-extended
```

**Option 3: Direct Download**

1. Visit [Hugo Releases](https://github.com/gohugoio/hugo/releases)
2. Download the `hugo_extended_*_Windows-64bit.zip` file
3. Extract to a folder in your PATH

#### macOS

**Option 1: Homebrew**

```bash
brew install hugo
```

**Option 2: MacPorts**

```bash
sudo port install hugo +extended
```

#### Linux

**Ubuntu/Debian:**

```bash
sudo apt install hugo
```

**Arch Linux:**

```bash
sudo pacman -S hugo
```

**From Source:**

```bash
# Install Go first, then:
go install -tags extended github.com/gohugoio/hugo@latest
```

## Installation Methods

### Method 1: Git Submodule (Recommended)

This method allows easy theme updates and is recommended for most users.

1. **Create a new Hugo site** (skip if you have an existing site):

    ```bash
    hugo new site my-portfolio
    cd my-portfolio
    git init
    ```

2. **Add the theme as a submodule**:

    ```bash
    git submodule add https://github.com/yourusername/csharp-portfolio-theme.git themes/csharp-portfolio
    ```

3. **Initialize the submodule**:
    ```bash
    git submodule update --init --recursive
    ```

### Method 2: Git Clone

Use this method if you want to modify the theme directly.

```bash
cd themes
git clone https://github.com/yourusername/csharp-portfolio-theme.git csharp-portfolio
```

### Method 3: Download ZIP

Use this method if you don't want to use Git.

1. Download the theme ZIP from GitHub
2. Extract to `themes/csharp-portfolio/` in your Hugo site directory
3. Ensure the folder structure is correct:
    ```
    themes/csharp-portfolio/
    ├── archetypes/
    ├── assets/
    ├── layouts/
    ├── static/
    └── theme.toml
    ```

### Method 4: Hugo Modules (Advanced)

For advanced users who want to use Hugo's module system.

1. **Initialize your site as a Hugo module**:

    ```bash
    hugo mod init github.com/yourusername/my-portfolio
    ```

2. **Add the theme module**:

    ```bash
    hugo mod get github.com/yourusername/csharp-portfolio-theme
    ```

3. **Update your configuration**:
    ```toml
    [module]
      [[module.imports]]
        path = "github.com/yourusername/csharp-portfolio-theme"
    ```

## Initial Setup

### 1. Configure the Theme

Create or update your `hugo.toml` (or `config.toml`) file:

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

# Basic theme parameters
[params]
  author = "Your Name"
  description = "Your professional description"

  [params.hero]
    title = "Hello, World!"
    subtitle = "// Your tagline here"

  [params.social]
    github = "yourusername"
    linkedin = "yourprofile"
    email = "your.email@example.com"
```

### 2. Create Essential Content

#### Homepage

```bash
hugo new _index.md
```

Edit `content/_index.md`:

```yaml
---
title: "Home"
description: "Welcome to my portfolio"
date: 2024-01-01
draft: false
---
Welcome to my portfolio! I'm a C# developer passionate about building great software.
```

#### About Page

```bash
hugo new about.md
```

Edit `content/about.md`:

```yaml
---
title: "About"
description: "Learn more about me"
date: 2024-01-01
draft: false
type: "about"
layout: "single"
---
## About Me

Your professional bio here...
```

#### First Project

```bash
hugo new projects/my-first-project.md
```

Edit `content/projects/my-first-project.md`:

```yaml
---
title: "My First Project"
description: "Description of your project"
date: 2024-01-01
draft: false
featured: true
technologies: ["C#", "ASP.NET Core"]
github: "https://github.com/yourusername/project"
---
## Project Overview

Details about your project...
```

### 3. Test Your Site

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site.

## Configuration

### Complete Configuration Example

```toml
baseURL = 'https://yoursite.com/'
languageCode = 'en-us'
title = 'John Doe - Senior C# Developer'
theme = 'csharp-portfolio'

# Content settings
paginate = 10
enableRobotsTXT = true
enableGitInfo = true

# Markup settings
[markup]
  [markup.highlight]
    style = "github"
    lineNos = true
    codeFences = true
    guessSyntax = true
    noClasses = false
    anchorLineNos = false
    lineAnchors = ""
    lineNoStart = 1

  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true  # Allow HTML in markdown

# Theme parameters
[params]
  # Personal information
  author = "John Doe"
  description = "Senior C# developer with 8+ years of experience"

  # Theme settings
  [params.theme]
    defaultMode = "auto"
    enableToggle = true
    enableTypingAnimation = true

  # Hero section
  [params.hero]
    title = "Hello, World!"
    subtitle = "// Senior C# developer specializing in .NET and cloud architecture"
    showTypingAnimation = true

  # About section
  [params.about]
    description = """
I'm a passionate **Senior C# Developer** with over 8 years of experience...
"""
    profileImage = "/images/profile.jpg"
    experience = 8
    projects = 75
    available = true

    # Skills as C# using statements
    [[params.about.skills]]
      category = "Microsoft"
      name = "AspNetCore"

    [[params.about.skills]]
      category = "System"
      name = "Linq"

  # Social links
  [params.social]
    github = "johndoe"
    linkedin = "johndoe-dev"
    twitter = "johndoe_dev"
    email = "john.doe@example.com"

  # SEO settings
  [params.seo]
    description = "Senior C# Developer portfolio"
    keywords = ["C#", ".NET", "developer", "portfolio"]
    author = "John Doe"

  # Performance settings
  [params.performance]
    inlineCriticalCSS = true
    fontDisplaySwap = true
    minifyAssets = true

# Navigation menu
[menu]
  [[menu.main]]
    name = "Portfolio.About"
    url = "/about/"
    weight = 10

  [[menu.main]]
    name = "Portfolio.Projects"
    url = "/projects/"
    weight = 20

# Taxonomies
[taxonomies]
  tag = "tags"
  category = "categories"
  technology = "technologies"
```

## Content Creation

### Project Structure

Organize your content like this:

```
content/
├── _index.md              # Homepage
├── about.md               # About page
├── projects/              # Projects section
│   ├── _index.md         # Projects list page
│   ├── project-1.md      # Individual project
│   └── project-2.md      # Individual project
├── blog/                 # Blog posts (optional)
│   ├── _index.md
│   └── my-first-post.md
└── contact.md            # Contact page (optional)
```

### Project Front Matter Template

````yaml
---
title: "Project Name"
description: "Brief description of the project"
date: 2024-01-01
draft: false
featured: true                    # Show on homepage
technologies:
  - "C#"
  - "ASP.NET Core"
  - "Entity Framework"
  - "React"
github: "https://github.com/user/repo"
demo: "https://demo.example.com"
image: "/images/projects/project.png"
weight: 10                        # Sort order
---

## Overview

Detailed project description...

## Features

- Feature 1
- Feature 2

## Technical Implementation

```csharp
// Code examples
public class Example
{
    public string Name { get; set; }
}
````

## Challenges and Solutions

...

````

### Adding Images

1. **Create images directory**:
   ```bash
   mkdir -p static/images/projects
   mkdir -p static/images/profile
````

2. **Add your images**:

    ```
    static/
    └── images/
        ├── profile/
        │   └── profile.jpg
        └── projects/
            ├── project1.png
            └── project2.png
    ```

3. **Reference in content**:

    ```yaml
    # In front matter
    image: "/images/projects/project1.png"
    profileImage: "/images/profile/profile.jpg"
    ```

    ```markdown
    # In markdown content

    ![Project Screenshot](/images/projects/project1.png)
    ```

## Customization

### Custom CSS

1. **Create custom CSS file**:

    ```bash
    mkdir -p assets/css
    touch assets/css/custom.css
    ```

2. **Add your styles**:

    ```css
    /* assets/css/custom.css */
    :root {
    	--color-primary: #your-color;
    }

    .custom-class {
    	/* Your custom styles */
    }
    ```

3. **Include in configuration**:
    ```toml
    [params]
      customCSS = ["css/custom.css"]
    ```

### Custom JavaScript

1. **Create JS file**:

    ```bash
    mkdir -p assets/js
    touch assets/js/custom.js
    ```

2. **Add your code**:

    ```javascript
    // assets/js/custom.js
    document.addEventListener("DOMContentLoaded", function () {
    	// Your custom JavaScript
    });
    ```

3. **Include in configuration**:
    ```toml
    [params]
      customJS = ["js/custom.js"]
    ```

### Override Templates

1. **Create layouts directory**:

    ```bash
    mkdir -p layouts
    ```

2. **Copy and modify theme templates**:

    ```bash
    # Copy theme template to your site
    cp themes/csharp-portfolio/layouts/index.html layouts/

    # Now edit layouts/index.html to customize
    ```

## Deployment

### GitHub Pages

1. **Create GitHub repository**
2. **Add GitHub Actions workflow**:

    Create `.github/workflows/hugo.yml`:

    ```yaml
    name: Deploy Hugo site to Pages

    on:
        push:
            branches: ["main"]
        workflow_dispatch:

    permissions:
        contents: read
        pages: write
        id-token: write

    concurrency:
        group: "pages"
        cancel-in-progress: false

    defaults:
        run:
            shell: bash

    jobs:
        build:
            runs-on: ubuntu-latest
            steps:
                - name: Checkout
                  uses: actions/checkout@v4
                  with:
                      submodules: recursive

                - name: Setup Hugo
                  uses: peaceiris/actions-hugo@v2
                  with:
                      hugo-version: "latest"
                      extended: true

                - name: Setup Pages
                  id: pages
                  uses: actions/configure-pages@v3

                - name: Build with Hugo
                  env:
                      HUGO_ENVIRONMENT: production
                      HUGO_ENV: production
                  run: |
                      hugo \
                        --minify \
                        --baseURL "${{ steps.pages.outputs.base_url }}/"

                - name: Upload artifact
                  uses: actions/upload-pages-artifact@v2
                  with:
                      path: ./public

        deploy:
            environment:
                name: github-pages
                url: ${{ steps.deploy.outputs.page_url }}
            runs-on: ubuntu-latest
            needs: build
            steps:
                - name: Deploy to GitHub Pages
                  id: deploy
                  uses: actions/deploy-pages@v2
    ```

3. **Enable GitHub Pages** in repository settings

### Netlify

1. **Connect your repository** to Netlify
2. **Configure build settings**:
    - Build command: `hugo --minify`
    - Publish directory: `public`
    - Environment variables:
        - `HUGO_VERSION`: `0.120.4`
        - `HUGO_ENV`: `production`

### Vercel

1. **Import your repository** to Vercel
2. **Configure build settings**:
    - Framework Preset: Hugo
    - Build Command: `hugo --minify`
    - Output Directory: `public`

## Troubleshooting

### Common Issues

1. **Theme not loading**:

    ```bash
    # Check theme exists
    ls themes/csharp-portfolio/theme.toml

    # Verify configuration
    grep "theme.*=" hugo.toml
    ```

2. **Submodule issues**:

    ```bash
    # Update submodules
    git submodule update --init --recursive

    # Pull latest theme changes
    git submodule update --remote themes/csharp-portfolio
    ```

3. **Build errors**:

    ```bash
    # Check Hugo version
    hugo version

    # Build with verbose output
    hugo --verbose
    ```

4. **Assets not loading**:

    ```bash
    # Clear Hugo cache
    hugo mod clean
    rm -rf resources/

    # Rebuild
    hugo server
    ```

### Getting Help

-   **Documentation**: Check [CONFIGURATION.md](CONFIGURATION.md) and [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
-   **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/csharp-portfolio-theme/issues)
-   **Discussions**: Ask questions in [GitHub Discussions](https://github.com/yourusername/csharp-portfolio-theme/discussions)

## Next Steps

1. **Customize your content** - Add your projects, update your bio
2. **Personalize the design** - Adjust colors, fonts, and layout
3. **Optimize for SEO** - Add meta descriptions, structured data
4. **Set up analytics** - Add Google Analytics or similar
5. **Deploy your site** - Choose a hosting platform and go live!

Congratulations! You now have a professional C# developer portfolio website. 🎉
