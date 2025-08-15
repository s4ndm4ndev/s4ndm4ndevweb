# Accessibility Features - C# Portfolio Theme

This document outlines the accessibility features implemented in the C# Portfolio Hugo theme to ensure WCAG 2.1 AA compliance and provide an inclusive user experience.

## Overview

The theme has been designed with accessibility as a core principle, ensuring that all users, including those using assistive technologies, can navigate and interact with the portfolio website effectively.

## Implemented Features

### 1. Semantic HTML Structure

-   **Proper HTML5 semantic elements**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
-   **Logical heading hierarchy**: H1 for main page title, H2 for section titles, H3 for subsections
-   **Meaningful page structure** that works well with screen readers
-   **Skip navigation link** for keyboard users to jump to main content

### 2. ARIA Labels and Attributes

#### Navigation

-   `aria-label` attributes on navigation menus
-   `aria-current="page"` for active navigation items
-   `aria-expanded` and `aria-controls` for mobile menu toggle
-   `role="navigation"` and `aria-label` for navigation landmarks

#### Forms

-   `aria-describedby` linking form inputs to error messages
-   `aria-invalid` states for form validation
-   `aria-live="polite"` for dynamic error announcements
-   `aria-labelledby` for form sections
-   `data-required="true"` for required field indicators

#### Interactive Elements

-   `aria-pressed` states for toggle buttons (theme toggle)
-   `aria-hidden="true"` for decorative elements
-   `role="button"` for clickable elements that aren't buttons
-   `aria-label` for buttons without visible text

#### Dynamic Content

-   `aria-live` regions for status updates
-   `role="status"` for form submission feedback
-   `role="alert"` for error messages

### 3. Keyboard Navigation

#### Focus Management

-   **Visible focus indicators** with high contrast outlines
-   **Focus trap** in mobile navigation menu
-   **Logical tab order** throughout the site
-   **Escape key** closes mobile menu and returns focus

#### Keyboard Shortcuts

-   `Ctrl+Shift+T` for theme toggle
-   `Tab` and `Shift+Tab` for navigation
-   `Enter` and `Space` for button activation
-   `Escape` for closing modals/menus

#### Skip Navigation

-   Skip link appears on first Tab press
-   Allows keyboard users to bypass navigation
-   Focuses main content area directly

### 4. Color Contrast (WCAG 2.1 AA Compliant)

#### Light Mode

-   **Text on background**: 21:1 contrast ratio (exceeds 4.5:1 requirement)
-   **Secondary text**: 7.5:1 contrast ratio
-   **Muted text**: 4.6:1 contrast ratio
-   **Links**: 4.5:1 contrast ratio
-   **Error states**: 5.3:1 contrast ratio

#### Dark Mode

-   **Text on background**: 21:1 contrast ratio
-   **Secondary text**: 8.2:1 contrast ratio
-   **Muted text**: 4.8:1 contrast ratio
-   **Links**: 4.7:1 contrast ratio
-   **Error states**: 4.5:1 contrast ratio

#### High Contrast Mode

-   Supports `prefers-contrast: high` media query
-   Provides maximum contrast colors when requested
-   Maintains readability in high contrast environments

### 5. Screen Reader Support

#### Screen Reader Only Content

-   `.sr-only` class for content only visible to screen readers
-   Hidden labels for form inputs
-   Descriptive text for complex interactions
-   Status announcements for dynamic changes

#### Image Accessibility

-   **Descriptive alt text** for informative images
-   **Empty alt attributes** for decorative images
-   **Role="img"** for complex visual elements with aria-label

#### Content Structure

-   **Proper heading hierarchy** for navigation
-   **List semantics** for grouped content
-   **Table headers** properly associated with data
-   **Form labels** explicitly linked to inputs

### 6. Touch Target Sizes

-   **Minimum 44x44px** touch targets (exceeds 44x44px requirement)
-   **48x48px** on touch devices for better usability
-   **Adequate spacing** between interactive elements
-   **Enhanced touch feedback** on mobile devices

### 7. Reduced Motion Support

#### Respects User Preferences

-   Detects `prefers-reduced-motion: reduce`
-   **Disables animations** when requested
-   **Removes transitions** for sensitive users
-   **Static content** instead of animated elements

#### Animation Controls

-   **Typing animations** can be disabled
-   **Smooth scrolling** respects motion preferences
-   **Theme transitions** reduced when requested

### 8. Form Accessibility

#### Validation

-   **Real-time validation** with screen reader announcements
-   **Clear error messages** with specific guidance
-   **Visual and programmatic** error indication
-   **Success feedback** for completed actions

#### Input Enhancement

-   **Autocomplete attributes** for common fields
-   **Required field indicators** (visual and programmatic)
-   **Input type optimization** for mobile keyboards
-   **Label association** with all form controls

### 9. Mobile Accessibility

#### Touch Optimization

-   **Larger touch targets** on mobile devices
-   **Gesture support** for common actions
-   **Swipe navigation** where appropriate
-   **Voice control** compatibility

#### Mobile Screen Readers

-   **VoiceOver** (iOS) compatibility
-   **TalkBack** (Android) compatibility
-   **Proper focus management** on mobile
-   **Orientation change** handling

### 10. Progressive Enhancement

#### JavaScript Independence

-   **Core functionality** works without JavaScript
-   **Enhanced features** added progressively
-   **Graceful degradation** for older browsers
-   **No-JS fallbacks** for critical features

## Testing and Validation

### Automated Testing Tools

-   **axe-core** browser extension
-   **Lighthouse** accessibility audit
-   **WAVE** Web Accessibility Evaluator
-   **Pa11y** command line testing

### Manual Testing

-   **Keyboard navigation** testing
-   **Screen reader** testing (NVDA, JAWS, VoiceOver)
-   **Mobile accessibility** testing
-   **Color contrast** verification
-   **High contrast mode** testing
-   **Reduced motion** testing

### Browser Compatibility

-   **Chrome/Chromium** (latest)
-   **Firefox** (latest)
-   **Safari** (latest)
-   **Edge** (latest)
-   **Mobile browsers** (iOS Safari, Chrome Mobile)

## Implementation Details

### CSS Classes

#### Screen Reader Only

```css
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
```

#### Focus Indicators

```css
*:focus {
	outline: 2px solid var(--focus-outline);
	outline-offset: 2px;
	border-radius: 2px;
}
```

#### Touch Targets

```css
button,
a,
input {
	min-width: 44px;
	min-height: 44px;
}
```

### JavaScript Features

#### Keyboard Detection

-   Detects keyboard vs mouse usage
-   Applies appropriate focus styles
-   Manages focus states dynamically

#### Form Enhancement

-   Real-time validation feedback
-   Screen reader announcements
-   Error state management
-   Success confirmations

#### Theme Toggle

-   Keyboard accessible
-   Screen reader announcements
-   Proper ARIA states
-   Visual feedback

## Usage Guidelines

### For Content Creators

1. **Always provide alt text** for images
2. **Use descriptive link text** (avoid "click here")
3. **Maintain heading hierarchy** (don't skip levels)
4. **Write clear, concise content**
5. **Test with keyboard navigation**

### For Developers

1. **Test with screen readers** regularly
2. **Validate HTML** for semantic correctness
3. **Check color contrast** for all text
4. **Ensure keyboard accessibility** for all interactions
5. **Test on mobile devices** with assistive technologies

### For Designers

1. **Design with accessibility in mind** from the start
2. **Ensure sufficient color contrast** in all designs
3. **Provide multiple ways** to convey information (not just color)
4. **Design clear focus indicators**
5. **Consider reduced motion** preferences

## Compliance Standards

This theme meets or exceeds the following accessibility standards:

-   **WCAG 2.1 Level AA** compliance
-   **Section 508** compliance
-   **ADA** (Americans with Disabilities Act) compliance
-   **EN 301 549** (European accessibility standard) compliance

## Support and Maintenance

### Regular Testing

-   Monthly accessibility audits
-   User testing with assistive technologies
-   Automated testing in CI/CD pipeline
-   Browser compatibility testing

### Updates and Improvements

-   Stay current with accessibility best practices
-   Monitor user feedback and issues
-   Update for new assistive technologies
-   Maintain compatibility with latest browsers

## Resources

### Documentation

-   [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
-   [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
-   [WebAIM Resources](https://webaim.org/)

### Testing Tools

-   [axe DevTools](https://www.deque.com/axe/devtools/)
-   [Lighthouse](https://developers.google.com/web/tools/lighthouse)
-   [WAVE](https://wave.webaim.org/)
-   [Color Contrast Analyzers](https://www.tpgi.com/color-contrast-checker/)

### Screen Readers

-   [NVDA](https://www.nvaccess.org/) (Windows, free)
-   [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
-   [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (macOS/iOS, built-in)
-   [TalkBack](https://support.google.com/accessibility/android/answer/6283677) (Android, built-in)

## Contributing

When contributing to this theme, please:

1. **Test accessibility** of any new features
2. **Maintain WCAG 2.1 AA** compliance
3. **Document accessibility** considerations
4. **Include accessibility** in code reviews
5. **Test with assistive technologies**

For questions or accessibility issues, please open an issue in the project repository with the "accessibility" label.
