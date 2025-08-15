/**
 * Accessibility Enhancement Module
 * Provides keyboard navigation, focus management, and screen reader support
 */

(function () {
	"use strict";

	// Track if user is using keyboard for navigation
	let isKeyboardUser = false;
	let isMouseUser = false;

	/**
	 * Initialize accessibility features
	 */
	function initAccessibility() {
		initKeyboardDetection();
		initFocusManagement();
		initFormAccessibility();
		initSkipNavigation();
		initAriaLiveRegions();
		initReducedMotion();
		initHighContrast();
	}

	/**
	 * Detect keyboard vs mouse usage for appropriate focus styling
	 */
	function initKeyboardDetection() {
		// Detect keyboard usage
		document.addEventListener("keydown", function (e) {
			if (e.key === "Tab") {
				isKeyboardUser = true;
				isMouseUser = false;
				document.body.classList.add("keyboard-user");
				document.body.classList.remove("mouse-user");
			}
		});

		// Detect mouse usage
		document.addEventListener("mousedown", function () {
			isMouseUser = true;
			isKeyboardUser = false;
			document.body.classList.add("mouse-user");
			document.body.classList.remove("keyboard-user");
		});

		// Handle touch devices
		document.addEventListener("touchstart", function () {
			document.body.classList.add("touch-user");
		});
	}

	/**
	 * Enhanced focus management for interactive elements
	 */
	function initFocusManagement() {
		// Focus trap for mobile navigation
		const mobileNav = document.querySelector(".mobile-navigation");
		const mobileToggle = document.querySelector(".mobile-nav-toggle");

		if (mobileNav && mobileToggle) {
			mobileToggle.addEventListener("click", function () {
				const isExpanded =
					this.getAttribute("aria-expanded") === "true";

				if (isExpanded) {
					// Focus first link when menu opens
					setTimeout(() => {
						const firstLink =
							mobileNav.querySelector(".mobile-nav-link");
						if (firstLink) {
							firstLink.focus();
						}
					}, 100);
				}
			});

			// Trap focus within mobile menu
			mobileNav.addEventListener("keydown", function (e) {
				if (e.key === "Tab") {
					const focusableElements =
						mobileNav.querySelectorAll(".mobile-nav-link");
					const firstElement = focusableElements[0];
					const lastElement =
						focusableElements[focusableElements.length - 1];

					if (e.shiftKey) {
						// Shift + Tab
						if (document.activeElement === firstElement) {
							e.preventDefault();
							lastElement.focus();
						}
					} else {
						// Tab
						if (document.activeElement === lastElement) {
							e.preventDefault();
							firstElement.focus();
						}
					}
				}

				// Close menu on Escape
				if (e.key === "Escape") {
					mobileToggle.click();
					mobileToggle.focus();
				}
			});
		}

		// Enhanced focus indicators for form elements
		const formInputs = document.querySelectorAll("input, textarea, select");
		formInputs.forEach((input) => {
			input.addEventListener("focus", function () {
				this.parentElement.classList.add("focused");
			});

			input.addEventListener("blur", function () {
				this.parentElement.classList.remove("focused");
			});
		});
	}

	/**
	 * Form accessibility enhancements
	 */
	function initFormAccessibility() {
		const form = document.getElementById("contactForm");
		if (!form) return;

		const inputs = form.querySelectorAll("input, textarea");

		inputs.forEach((input) => {
			// Real-time validation feedback
			input.addEventListener("blur", function () {
				validateField(this);
			});

			input.addEventListener("input", function () {
				// Clear error state when user starts typing
				if (this.classList.contains("error")) {
					this.classList.remove("error");
					this.setAttribute("aria-invalid", "false");

					const errorElement = document.getElementById(
						this.getAttribute("aria-describedby")
					);
					if (errorElement) {
						errorElement.textContent = "";
						errorElement.classList.remove("show");
					}
				}
			});
		});

		// Form submission with accessibility feedback
		form.addEventListener("submit", function (e) {
			e.preventDefault();

			let isValid = true;
			inputs.forEach((input) => {
				if (!validateField(input)) {
					isValid = false;
				}
			});

			if (isValid) {
				showFormStatus("success", "Message sent successfully!");
				// Focus the status message for screen readers
				const statusElement = document.getElementById("formStatus");
				if (statusElement) {
					statusElement.focus();
				}
			} else {
				showFormStatus("error", "Please correct the errors above.");
				// Focus first invalid field
				const firstInvalid = form.querySelector(
					'[aria-invalid="true"]'
				);
				if (firstInvalid) {
					firstInvalid.focus();
				}
			}
		});
	}

	/**
	 * Validate individual form field
	 */
	function validateField(field) {
		const value = field.value.trim();
		const fieldType = field.type;
		const isRequired = field.hasAttribute("required");
		let isValid = true;
		let errorMessage = "";

		// Required field validation
		if (isRequired && !value) {
			isValid = false;
			errorMessage = `${getFieldLabel(field)} is required.`;
		}
		// Email validation
		else if (fieldType === "email" && value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				isValid = false;
				errorMessage = "Please enter a valid email address.";
			}
		}
		// Minimum length validation
		else if (
			field.hasAttribute("minlength") &&
			value.length < field.getAttribute("minlength")
		) {
			isValid = false;
			errorMessage = `${getFieldLabel(
				field
			)} must be at least ${field.getAttribute("minlength")} characters.`;
		}

		// Update field state
		field.setAttribute("aria-invalid", isValid ? "false" : "true");
		field.classList.toggle("error", !isValid);

		// Update error message
		const errorElement = document.getElementById(
			field.getAttribute("aria-describedby")
		);
		if (errorElement) {
			errorElement.textContent = errorMessage;
			errorElement.classList.toggle("show", !isValid);

			// Set appropriate error class for styling
			errorElement.className = "error-message";
			if (!isValid) {
				errorElement.classList.add("show");
				if (fieldType === "email") {
					errorElement.classList.add("email-error");
				} else if (isRequired && !value) {
					errorElement.classList.add("required-error");
				} else {
					errorElement.classList.add("length-error");
				}
			}
		}

		return isValid;
	}

	/**
	 * Get field label text for error messages
	 */
	function getFieldLabel(field) {
		const label = document.querySelector(`label[for="${field.id}"]`);
		if (label) {
			const propertySpan = label.querySelector(".code-property");
			return propertySpan
				? propertySpan.textContent
				: label.textContent.trim();
		}
		return field.name || "Field";
	}

	/**
	 * Show form status message
	 */
	function showFormStatus(type, message) {
		const statusElement = document.getElementById("formStatus");
		if (statusElement) {
			statusElement.className = `form-status ${type} show`;
			statusElement.textContent = message;
			statusElement.setAttribute("aria-live", "polite");

			// Auto-hide success messages after 5 seconds
			if (type === "success") {
				setTimeout(() => {
					statusElement.classList.remove("show");
				}, 5000);
			}
		}
	}

	/**
	 * Skip navigation functionality
	 */
	function initSkipNavigation() {
		const skipLink = document.querySelector(".skip-nav");
		if (skipLink) {
			skipLink.addEventListener("click", function (e) {
				e.preventDefault();
				const target = document.querySelector(
					this.getAttribute("href")
				);
				if (target) {
					target.focus();
					target.scrollIntoView({ behavior: "smooth" });
				}
			});
		}
	}

	/**
	 * Initialize ARIA live regions for dynamic content
	 */
	function initAriaLiveRegions() {
		// Create a global live region for announcements
		const liveRegion = document.createElement("div");
		liveRegion.setAttribute("aria-live", "polite");
		liveRegion.setAttribute("aria-atomic", "true");
		liveRegion.className = "sr-only";
		liveRegion.id = "live-region";
		document.body.appendChild(liveRegion);

		// Function to announce messages to screen readers
		window.announceToScreenReader = function (message) {
			liveRegion.textContent = message;
			setTimeout(() => {
				liveRegion.textContent = "";
			}, 1000);
		};

		// Announce theme changes
		document.addEventListener("themechange", function (e) {
			const theme = e.detail.theme;
			announceToScreenReader(`Theme changed to ${theme} mode`);
		});
	}

	/**
	 * Handle reduced motion preferences
	 */
	function initReducedMotion() {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		);

		function handleReducedMotion(mediaQuery) {
			if (mediaQuery.matches) {
				document.body.classList.add("reduced-motion");
				// Disable typing animation
				const typingElements =
					document.querySelectorAll("[data-typing-text]");
				typingElements.forEach((element) => {
					element.textContent =
						element.getAttribute("data-typing-text");
				});
			} else {
				document.body.classList.remove("reduced-motion");
			}
		}

		// Check initial state
		handleReducedMotion(prefersReducedMotion);

		// Listen for changes
		if (prefersReducedMotion.addEventListener) {
			prefersReducedMotion.addEventListener(
				"change",
				handleReducedMotion
			);
		} else {
			// Fallback for older browsers
			prefersReducedMotion.addListener(handleReducedMotion);
		}
	}

	/**
	 * Handle high contrast preferences
	 */
	function initHighContrast() {
		const prefersHighContrast = window.matchMedia(
			"(prefers-contrast: high)"
		);

		function handleHighContrast(mediaQuery) {
			if (mediaQuery.matches) {
				document.body.classList.add("high-contrast");
			} else {
				document.body.classList.remove("high-contrast");
			}
		}

		// Check initial state
		handleHighContrast(prefersHighContrast);

		// Listen for changes
		if (prefersHighContrast.addEventListener) {
			prefersHighContrast.addEventListener("change", handleHighContrast);
		} else {
			// Fallback for older browsers
			prefersHighContrast.addListener(handleHighContrast);
		}
	}

	/**
	 * Enhance theme toggle accessibility
	 */
	function enhanceThemeToggle() {
		const themeToggle = document.querySelector("[data-theme-toggle]");
		if (themeToggle) {
			// Update ARIA attributes when theme changes
			const observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (
						mutation.type === "attributes" &&
						mutation.attributeName === "class"
					) {
						const isDark =
							themeToggle.classList.contains(
								"theme-toggle--dark"
							);
						const textElement = themeToggle.querySelector(
							".theme-toggle__text"
						);
						const iconElement = themeToggle.querySelector(
							".theme-toggle__icon"
						);

						if (textElement) {
							textElement.textContent = isDark
								? "Dark mode active"
								: "Light mode active";
						}

						if (iconElement) {
							iconElement.textContent = isDark ? "🌙" : "☀️";
						}

						themeToggle.setAttribute(
							"aria-label",
							isDark
								? "Switch to light theme"
								: "Switch to dark theme"
						);
					}
				});
			});

			observer.observe(themeToggle, { attributes: true });
		}
	}

	/**
	 * Initialize when DOM is ready
	 */
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function () {
			initAccessibility();
			enhanceThemeToggle();
		});
	} else {
		initAccessibility();
		enhanceThemeToggle();
	}

	// Export functions for external use
	window.AccessibilityEnhancer = {
		announceToScreenReader: function (message) {
			if (window.announceToScreenReader) {
				window.announceToScreenReader(message);
			}
		},
		validateField: validateField,
		showFormStatus: showFormStatus,
	};
})();
