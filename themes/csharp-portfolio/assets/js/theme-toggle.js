/**
 * Theme Toggle Module - Optimized for performance
 * Handles switching between light and dark themes with local storage persistence
 * and system preference detection
 */

class ThemeToggle {
	constructor() {
		this.storageKey = "csharp-portfolio-theme";
		this.themes = {
			LIGHT: "light",
			DARK: "dark",
			AUTO: "auto",
		};

		this.init();
	}

	/**
	 * Initialize the theme system
	 */
	init() {
		// Set initial theme based on stored preference or system preference
		this.setInitialTheme();

		// Listen for system theme changes
		this.watchSystemTheme();

		// Initialize toggle buttons
		this.initToggleButtons();

		// Initialize keyboard shortcuts
		this.initKeyboardShortcuts();
	}

	/**
	 * Set the initial theme based on stored preference or system preference
	 */
	setInitialTheme() {
		const storedTheme = this.getStoredTheme();
		const systemTheme = this.getSystemTheme();

		if (storedTheme) {
			this.applyTheme(storedTheme);
		} else {
			// Default to system preference
			this.applyTheme(systemTheme);
			this.storeTheme(systemTheme);
		}
	}

	/**
	 * Get the stored theme preference from localStorage
	 * @returns {string|null} The stored theme or null if not found
	 */
	getStoredTheme() {
		try {
			return localStorage.getItem(this.storageKey);
		} catch (error) {
			console.warn("Failed to read theme from localStorage:", error);
			return null;
		}
	}

	/**
	 * Store the theme preference in localStorage
	 * @param {string} theme - The theme to store
	 */
	storeTheme(theme) {
		try {
			localStorage.setItem(this.storageKey, theme);
		} catch (error) {
			console.warn("Failed to store theme in localStorage:", error);
		}
	}

	/**
	 * Get the system theme preference
	 * @returns {string} 'dark' or 'light'
	 */
	getSystemTheme() {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return this.themes.DARK;
		}
		return this.themes.LIGHT;
	}

	/**
	 * Apply the theme to the document
	 * @param {string} theme - The theme to apply ('light', 'dark', or 'auto')
	 */
	applyTheme(theme) {
		const root = document.documentElement;

		// Remove existing theme attributes
		root.removeAttribute("data-theme");

		if (theme === this.themes.AUTO) {
			// Let CSS handle auto theme via prefers-color-scheme
			// Don't set data-theme attribute
		} else {
			// Set explicit theme
			root.setAttribute("data-theme", theme);
		}

		// Update toggle button states
		this.updateToggleButtons(theme);

		// Dispatch custom event for other components to listen to
		this.dispatchThemeChangeEvent(theme);
	}

	/**
	 * Toggle between light and dark themes
	 */
	toggle() {
		const currentTheme = this.getCurrentTheme();
		const newTheme =
			currentTheme === this.themes.LIGHT
				? this.themes.DARK
				: this.themes.LIGHT;

		this.applyTheme(newTheme);
		this.storeTheme(newTheme);
	}

	/**
	 * Set a specific theme
	 * @param {string} theme - The theme to set
	 */
	setTheme(theme) {
		if (Object.values(this.themes).includes(theme)) {
			this.applyTheme(theme);
			this.storeTheme(theme);
		} else {
			console.warn(`Invalid theme: ${theme}`);
		}
	}

	/**
	 * Get the currently active theme
	 * @returns {string} The current theme
	 */
	getCurrentTheme() {
		const root = document.documentElement;
		const dataTheme = root.getAttribute("data-theme");

		if (dataTheme) {
			return dataTheme;
		}

		// If no data-theme is set, we're in auto mode
		// Return the actual resolved theme
		return this.getSystemTheme();
	}

	/**
	 * Watch for system theme changes
	 */
	watchSystemTheme() {
		if (window.matchMedia) {
			const mediaQuery = window.matchMedia(
				"(prefers-color-scheme: dark)"
			);

			// Use the newer addEventListener if available, fallback to addListener
			if (mediaQuery.addEventListener) {
				mediaQuery.addEventListener("change", (e) => {
					this.handleSystemThemeChange(e);
				});
			} else if (mediaQuery.addListener) {
				mediaQuery.addListener((e) => {
					this.handleSystemThemeChange(e);
				});
			}
		}
	}

	/**
	 * Handle system theme changes
	 * @param {MediaQueryListEvent} e - The media query event
	 */
	handleSystemThemeChange(e) {
		const storedTheme = this.getStoredTheme();

		// Only update if user hasn't set an explicit preference
		if (!storedTheme || storedTheme === this.themes.AUTO) {
			const newTheme = e.matches ? this.themes.DARK : this.themes.LIGHT;
			this.applyTheme(newTheme);
		}
	}

	/**
	 * Initialize toggle buttons
	 */
	initToggleButtons() {
		const toggleButtons = document.querySelectorAll("[data-theme-toggle]");

		toggleButtons.forEach((button) => {
			button.addEventListener("click", (e) => {
				e.preventDefault();
				this.toggle();
			});

			// Set initial ARIA attributes
			this.updateButtonAria(button, this.getCurrentTheme());
		});
	}

	/**
	 * Update toggle button states
	 * @param {string} theme - The current theme
	 */
	updateToggleButtons(theme) {
		const toggleButtons = document.querySelectorAll("[data-theme-toggle]");

		toggleButtons.forEach((button) => {
			this.updateButtonAria(button, theme);
			this.updateButtonVisual(button, theme);
		});
	}

	/**
	 * Update button ARIA attributes for accessibility
	 * @param {HTMLElement} button - The toggle button
	 * @param {string} theme - The current theme
	 */
	updateButtonAria(button, theme) {
		const isDark = theme === this.themes.DARK;

		button.setAttribute("aria-pressed", isDark.toString());
		button.setAttribute(
			"aria-label",
			isDark ? "Switch to light theme" : "Switch to dark theme"
		);
	}

	/**
	 * Update button visual state
	 * @param {HTMLElement} button - The toggle button
	 * @param {string} theme - The current theme
	 */
	updateButtonVisual(button, theme) {
		const isDark = theme === this.themes.DARK;

		// Update button class for styling
		button.classList.toggle("theme-toggle--dark", isDark);
		button.classList.toggle("theme-toggle--light", !isDark);

		// Update button text content if it has text
		const textElement = button.querySelector(".theme-toggle__text");
		if (textElement) {
			textElement.textContent = isDark ? "false" : "true";
		}

		// Update icon if present
		const iconElement = button.querySelector(".theme-toggle__icon");
		if (iconElement) {
			iconElement.textContent = isDark ? "🌙" : "☀️";
		}
	}

	/**
	 * Dispatch a custom theme change event
	 * @param {string} theme - The new theme
	 */
	dispatchThemeChangeEvent(theme) {
		const event = new CustomEvent("themechange", {
			detail: { theme, timestamp: Date.now() },
		});

		document.dispatchEvent(event);
	}

	/**
	 * Initialize keyboard shortcuts for theme toggle
	 */
	initKeyboardShortcuts() {
		document.addEventListener("keydown", (e) => {
			// Ctrl+Shift+T to toggle theme
			if (e.ctrlKey && e.shiftKey && e.key === "T") {
				e.preventDefault();
				this.toggle();
			}
		});
	}

	/**
	 * Get theme information for debugging
	 * @returns {Object} Theme information
	 */
	getThemeInfo() {
		return {
			current: this.getCurrentTheme(),
			stored: this.getStoredTheme(),
			system: this.getSystemTheme(),
			supportsSystemTheme:
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches !==
					undefined,
		};
	}
}

// Initialize theme toggle when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		window.themeToggle = new ThemeToggle();
	});
} else {
	window.themeToggle = new ThemeToggle();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
	module.exports = ThemeToggle;
}
