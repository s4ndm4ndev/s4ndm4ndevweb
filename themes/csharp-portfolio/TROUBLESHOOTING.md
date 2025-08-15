# Troubleshooting Guide

This guide helps you resolve common issues when using the C# Portfolio Hugo theme.

## Table of Contents

-   [Installation Issues](#installation-issues)
-   [Configuration Problems](#configuration-problems)
-   [Display Issues](#display-issues)
-   [Performance Problems](#performance-problems)
-   [Content Issues](#content-issues)
-   [Build Errors](#build-errors)
-   [Browser Compatibility](#browser-compatibility)
-   [Getting Help](#getting-help)

## Installation Issues

### Theme Not Loading

**Problem**: Site shows default Hugo theme or no styling.

**Solutions**:

1. **Check theme installation**:

    ```bash
    # Verify theme exists
    ls themes/csharp-portfolio/

    # Should show theme files including theme.toml
    ```

2. **Verify configuration**:

    ```toml
    # In hugo.toml or config.toml
    theme = 'csharp-portfolio'  # Exact folder name
    ```

3. **Check Hugo version**:

    ```bash
    hugo version
    # Should be 0.112.0 or higher
    ```

4. **Clear Hugo cache**:
    ```bash
    hugo mod clean
    rm -rf resources/
    ```

### Git Submodule Issues

**Problem**: Theme folder is empty or outdated.

**Solutions**:

1. **Initialize submodules**:

    ```bash
    git submodule update --init --recursive
    ```

2. **Update submodule**:

    ```bash
    git submodule update --remote themes/csharp-portfolio
    ```

3. **Fix detached HEAD**:
    ```bash
    cd themes/csharp-portfolio
    git checkout main
    cd ../..
    ```

## Configuration Problems

### Theme Toggle Not Working

**Problem**: Dark/light mode toggle button doesn't switch themes.

**Solutions**:

1. **Check JavaScript loading**:

    ```html
    <!-- In browser dev tools, verify script loads -->
    <script src="/js/theme-toggle.min.js"></script>
    ```

2. **Verify configuration**:

    ```toml
    [params.theme]
      enableToggle = true  # Must be true
    ```

3. **Check browser console**:

    - Open browser dev tools (F12)
    - Look for JavaScript errors
    - Common error: "Cannot read property 'addEventListener' of null"

4. **Clear browser cache**:
    - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
    - Or clear browser cache manually

### Social Links Not Appearing

**Problem**: Social media links don't show in header/footer.

**Solutions**:

1. **Check configuration syntax**:

    ```toml
    [params.social]
      github = "username"      # Correct
      github = "@username"     # Wrong - don't include @
      linkedin = "profile"     # Just the profile name
    ```

2. **Verify partial template**:

    ```bash
    # Check if social partial exists
    ls themes/csharp-portfolio/layouts/partials/social.html
    ```

3. **Debug with Hugo**:
    ```bash
    hugo server --debug --verbose
    ```

### Menu Items Missing

**Problem**: Navigation menu doesn't show expected items.

**Solutions**:

1. **Check menu configuration**:

    ```toml
    [menu]
      [[menu.main]]
        name = "Portfolio.About"
        url = "/about/"
        weight = 10  # Lower numbers appear first
    ```

2. **Verify content exists**:

    ```bash
    # Check if about page exists
    ls content/about.md
    ```

3. **Check for draft status**:
    ```yaml
    ---
    title: "About"
    draft: false # Must be false to appear
    ---
    ```

## Display Issues

### Fonts Not Loading

**Problem**: Site shows fallback fonts instead of JetBrains Mono.

**Solutions**:

1. **Check font loading**:

    ```css
    /* In browser dev tools, verify font loads */
    @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono");
    ```

2. **Verify font configuration**:

    ```toml
    [params.performance]
      fontDisplaySwap = true  # Improves font loading
    ```

3. **Check network tab**:

    - Open browser dev tools
    - Go to Network tab
    - Reload page
    - Look for font file requests (should be 200 status)

4. **Font fallback**:
    ```css
    /* Theme should have fallbacks */
    font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
    ```

### Colors Not Applying

**Problem**: Site shows wrong colors or default colors.

**Solutions**:

1. **Check CSS loading**:

    ```html
    <!-- Verify CSS file loads -->
    <link rel="stylesheet" href="/css/main.css" />
    ```

2. **Inspect CSS variables**:

    ```css
    /* In browser dev tools, check computed styles */
    :root {
    	--color-primary: #value;
    }
    ```

3. **Clear CSS cache**:

    ```bash
    # Delete generated CSS
    rm -rf resources/_gen/assets/css/
    hugo server
    ```

4. **Check for CSS conflicts**:
    - Use browser dev tools
    - Look for overridden styles
    - Check specificity issues

### Responsive Layout Issues

**Problem**: Site doesn't look good on mobile devices.

**Solutions**:

1. **Check viewport meta tag**:

    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ```

2. **Test responsive breakpoints**:

    ```css
    /* Common breakpoints */
    @media (max-width: 768px) {
    	/* Mobile */
    }
    @media (max-width: 1024px) {
    	/* Tablet */
    }
    ```

3. **Use browser dev tools**:
    - Toggle device toolbar
    - Test different screen sizes
    - Check for horizontal scrolling

## Performance Problems

### Slow Page Loading

**Problem**: Pages take too long to load.

**Solutions**:

1. **Enable performance optimizations**:

    ```toml
    [params.performance]
      inlineCriticalCSS = true
      minifyAssets = true
      fontDisplaySwap = true
    ```

2. **Optimize images**:

    ```bash
    # Use Hugo's image processing
    {{ $image := .Resize "800x" }}
    ```

3. **Check asset sizes**:

    ```bash
    # List generated assets
    ls -la public/css/
    ls -la public/js/
    ```

4. **Use Hugo's built-in server**:
    ```bash
    hugo server --minify --gc
    ```

### High Memory Usage

**Problem**: Hugo build uses too much memory.

**Solutions**:

1. **Limit concurrent processing**:

    ```bash
    hugo --maxDeletes 10 --gc
    ```

2. **Clean up resources**:

    ```bash
    hugo mod clean
    rm -rf resources/
    ```

3. **Check for infinite loops**:
    - Review custom templates
    - Look for recursive partials
    - Check range loops

## Content Issues

### Projects Not Displaying

**Problem**: Project pages don't appear on homepage or project list.

**Solutions**:

1. **Check front matter**:

    ```yaml
    ---
    title: "Project Name"
    date: 2024-01-01
    draft: false # Must be false
    featured: true # For homepage display
    ---
    ```

2. **Verify file location**:

    ```bash
    # Projects should be in content/projects/
    ls content/projects/
    ```

3. **Check content type**:
    ```yaml
    ---
    type: "project" # Optional but recommended
    ---
    ```

### Syntax Highlighting Not Working

**Problem**: Code blocks don't have proper syntax highlighting.

**Solutions**:

1. **Check Hugo configuration**:

    ```toml
    [markup]
      [markup.highlight]
        style = "github"
        lineNos = true
        codeFences = true
    ```

2. **Verify code block syntax**:

    ````markdown
    ```csharp
    public class Example
    {
        public string Name { get; set; }
    }
    ```
    ````

3. **Check CSS generation**:
    ```bash
    # Generate syntax highlighting CSS
    hugo gen chromastyles --style=github > syntax.css
    ```

### Markdown Not Rendering

**Problem**: Markdown content shows as plain text.

**Solutions**:

1. **Check file extension**:

    ```bash
    # Should be .md or .markdown
    mv content/about.txt content/about.md
    ```

2. **Verify front matter**:

    ```yaml
    ---
    title: "Page Title"
    ---
    # Content starts here
    ```

3. **Check Hugo's markdown processor**:
    ```toml
    [markup]
      defaultMarkdownHandler = "goldmark"
    ```

## Build Errors

### Template Errors

**Problem**: Hugo build fails with template errors.

**Common Errors and Solutions**:

1. **"template: ... executing ... nil pointer"**:

    ```html
    <!-- Check for nil values -->
    {{ with .Params.author }}
    <span>{{ . }}</span>
    {{ end }}
    ```

2. **"template: ... function ... not defined"**:

    ```html
    <!-- Check function names -->
    {{ .Content | safeHTML }}
    <!-- Correct -->
    {{ .Content | safe }}
    <!-- Wrong -->
    ```

3. **"template: ... range can't iterate over ..."**:
    ```html
    <!-- Check data types -->
    {{ range .Params.tags }} {{ . }} {{ end }}
    ```

### Asset Pipeline Errors

**Problem**: CSS/JS compilation fails.

**Solutions**:

1. **Check SCSS syntax**:

    ```scss
    // Valid SCSS
    $primary-color: #blue;

    .class {
    	color: $primary-color;
    }
    ```

2. **Verify asset paths**:

    ```html
    <!-- Correct asset reference -->
    {{ $css := resources.Get "css/main.scss" | toCSS | minify }}
    <link rel="stylesheet" href="{{ $css.RelPermalink }}" />
    ```

3. **Check Hugo modules**:
    ```bash
    hugo mod verify
    hugo mod tidy
    ```

## Browser Compatibility

### Internet Explorer Issues

**Problem**: Site doesn't work in older browsers.

**Solutions**:

1. **Add polyfills**:

    ```html
    <!-- For CSS custom properties -->
    <script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>
    ```

2. **Use fallback CSS**:
    ```css
    .element {
    	background-color: #blue; /* Fallback */
    	background-color: var(--color-primary); /* Modern */
    }
    ```

### Safari-Specific Issues

**Problem**: Site looks different in Safari.

**Solutions**:

1. **Check vendor prefixes**:

    ```css
    .element {
    	-webkit-transform: translateX(10px);
    	transform: translateX(10px);
    }
    ```

2. **Test font rendering**:
    ```css
    .text {
    	-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
    }
    ```

## Getting Help

### Debug Information

When reporting issues, include:

1. **Hugo version**:

    ```bash
    hugo version
    ```

2. **Theme version**:

    ```bash
    cd themes/csharp-portfolio
    git log -1 --oneline
    ```

3. **Configuration**:

    ```bash
    # Sanitize sensitive information
    cat hugo.toml
    ```

4. **Browser information**:
    - Browser name and version
    - Operating system
    - Screen resolution

### Useful Commands

```bash
# Debug Hugo build
hugo --debug --verbose

# Check site structure
hugo list all

# Validate configuration
hugo config

# Generate site without server
hugo --minify --gc

# Check for broken links
hugo --printPathWarnings
```

### Community Resources

-   **GitHub Issues**: [Report bugs and feature requests](https://github.com/yourusername/csharp-portfolio-theme/issues)
-   **Discussions**: [Ask questions and share ideas](https://github.com/yourusername/csharp-portfolio-theme/discussions)
-   **Hugo Community**: [Hugo Discourse Forum](https://discourse.gohugo.io/)
-   **Documentation**: [Hugo Official Docs](https://gohugo.io/documentation/)

### Creating a Minimal Reproduction

When reporting issues:

1. **Create minimal site**:

    ```bash
    hugo new site test-site
    cd test-site
    git submodule add https://github.com/yourusername/csharp-portfolio-theme.git themes/csharp-portfolio
    ```

2. **Add minimal configuration**:

    ```toml
    theme = 'csharp-portfolio'
    # Only include relevant configuration
    ```

3. **Add minimal content**:

    ```bash
    hugo new _index.md
    # Add only content that reproduces the issue
    ```

4. **Test the issue**:
    ```bash
    hugo server
    # Verify the issue exists in minimal setup
    ```

This helps maintainers quickly identify and fix problems.
