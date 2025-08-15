# Typography System Documentation

## Overview

The C# Portfolio theme implements a comprehensive typography system inspired by C# programming language syntax and JetBrains Rider IDE styling.

## Font Stack

### Primary (Monospace)

-   **JetBrains Mono** - Primary coding font
-   **Fira Code** - Fallback coding font with ligatures
-   **Consolas** - Windows fallback
-   **Monaco** - macOS fallback
-   **monospace** - System fallback

### Secondary (Sans-serif)

-   **Segoe UI** - Windows
-   **Roboto** - Android/Chrome
-   **-apple-system** - macOS/iOS
-   **BlinkMacSystemFont** - macOS/iOS
-   **sans-serif** - System fallback

## Typography Scale

### Responsive Heading Sizes

#### H1 - Method Signatures

-   Mobile: 32px (2rem)
-   Tablet: 36px (2.25rem)
-   Desktop: 40px (2.5rem)
-   Style: `public string HeadingText()`

#### H2 - Class Names

-   Mobile: 24px (1.5rem)
-   Tablet: 28px (1.75rem)
-   Desktop: 32px (2rem)
-   Style: `class HeadingText`

#### H3 - Property Names

-   Mobile: 20px (1.25rem)
-   Tablet: 22px (1.375rem)
-   Desktop: 24px (1.5rem)
-   Style: `public HeadingText { get; set; }`

#### H4-H6 - Variable Declarations

-   Size: 18px (1.125rem) / 16px on mobile
-   Style: `var HeadingText;`

### Body Text

-   Mobile: 14px (0.875rem)
-   Tablet+: 16px (1rem)
-   Line height: 1.5 (mobile), 1.75 (tablet+)
-   Max width: 65ch for optimal readability

## C#-Inspired Elements

### Heading Decorations

-   **H1**: `public string ` prefix, `()` suffix
-   **H2**: `class ` prefix
-   **H3**: `public ` prefix, ` { get; set; }` suffix
-   **H4-H6**: `var ` prefix, `;` suffix

### Special Text Classes

#### Code-Inspired Styles

-   `.text-keyword` - C# keyword styling
-   `.text-string` - String literal with quotes
-   `.text-method` - Method name with parentheses
-   `.text-type` - Type name styling
-   `.text-property` - Property with get/set syntax

#### Comment Styles

-   `.text-comment` - Single-line comment (`// `)
-   `.text-xml-comment` - XML documentation (`/// `)
-   `.code-comment` paragraph class
-   `.xml-comment` paragraph class

#### Code Lists

-   `.code-list` - Styled as code with bullet points

## Responsive Behavior

### Breakpoints

-   Mobile: < 768px
-   Tablet: 768px - 1024px
-   Desktop: > 1024px

### Mobile Optimizations

-   Smaller font sizes for better readability
-   Reduced spacing between elements
-   Simplified C# syntax decorations (some hidden on mobile)
-   Shorter line lengths for comfortable reading

## Usage Examples

### HTML

```html
<h1>Welcome</h1>
<!-- Renders as: public string Welcome() -->
<h2>About</h2>
<!-- Renders as: class About -->
<h3>Skills</h3>
<!-- Renders as: public Skills { get; set; } -->

<p class="code-comment">This is a code comment</p>
<p class="xml-comment">This is an XML documentation comment</p>

<span class="text-keyword">public</span>
<span class="text-string">Hello World</span>
<span class="text-method">GetData</span>
```

### Markdown

```markdown
# Main Title

## Section Title

### Subsection Title

Regular paragraph text with optimal line length and spacing.

-   List item 1
-   List item 2

<ul class="code-list">
<li>C#</li>
<li>.NET</li>
<li>TypeScript</li>
</ul>
```

## Accessibility Features

-   WCAG 2.1 AA compliant color contrast ratios
-   Proper semantic HTML structure
-   Keyboard navigation support
-   Screen reader friendly
-   Responsive design for all devices
-   Optimal reading line lengths (60-65 characters)

## Performance Considerations

-   Font loading optimization with `font-display: swap`
-   Minimal CSS footprint
-   Efficient SCSS compilation
-   Mobile-first responsive approach
-   Critical CSS inlining support
