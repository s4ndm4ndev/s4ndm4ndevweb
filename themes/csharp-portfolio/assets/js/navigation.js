/**
 * Navigation functionality for C# Portfolio Theme
 * Handles mobile navigation toggle and keyboard navigation
 */

(function () {
	"use strict";

	// Mobile navigation toggle functionality
	function initMobileNavigation() {
		const mobileToggle = document.querySelector(".mobile-nav-toggle");
		const mobileNav = document.querySelector(".mobile-navigation");

		if (!mobileToggle || !mobileNav) {
			return;
		}

		let isAnimating = false;

		// Toggle mobile navigation
		function toggleMobileNav() {
			if (isAnimating) return;

			const isExpanded =
				mobileToggle.getAttribute("aria-expanded") === "true";
			const newState = !isExpanded;

			isAnimating = true;

			mobileToggle.setAttribute("aria-expanded", newState.toString());
			mobileNav.setAttribute("aria-hidden", (!newState).toString());

			// Prevent body scroll when menu is open
			if (newState) {
				document.body.style.overflow = "hidden";
				// Add class for enhanced touch scrolling
				document.body.classList.add("mobile-nav-open");
			} else {
				document.body.style.overflow = "";
				document.body.classList.remove("mobile-nav-open");
			}

			// Reset animation flag after transition
			setTimeout(() => {
				isAnimating = false;
			}, 300);
		}

		// Close mobile navigation
		function closeMobileNav() {
			if (isAnimating) return;

			mobileToggle.setAttribute("aria-expanded", "false");
			mobileNav.setAttribute("aria-hidden", "true");
			document.body.style.overflow = "";
			document.body.classList.remove("mobile-nav-open");
		}

		// Enhanced touch event handling
		let touchStartY = 0;
		let touchStartTime = 0;

		// Touch start handler
		function handleTouchStart(event) {
			touchStartY = event.touches[0].clientY;
			touchStartTime = Date.now();
		}

		// Touch end handler for swipe gestures
		function handleTouchEnd(event) {
			const touchEndY = event.changedTouches[0].clientY;
			const touchEndTime = Date.now();
			const deltaY = touchStartY - touchEndY;
			const deltaTime = touchEndTime - touchStartTime;

			// Detect upward swipe to close menu (swipe up gesture)
			if (
				deltaY > 50 && // Minimum swipe distance
				deltaTime < 300 && // Maximum swipe time
				mobileToggle.getAttribute("aria-expanded") === "true"
			) {
				closeMobileNav();
			}
		}

		// Event listeners
		mobileToggle.addEventListener("click", toggleMobileNav);

		// Enhanced touch event listeners
		mobileNav.addEventListener("touchstart", handleTouchStart, {
			passive: true,
		});
		mobileNav.addEventListener("touchend", handleTouchEnd, {
			passive: true,
		});

		// Close mobile nav when clicking on a link
		const mobileNavLinks = mobileNav.querySelectorAll(".mobile-nav-link");
		mobileNavLinks.forEach((link) => {
			link.addEventListener("click", closeMobileNav);

			// Enhanced touch feedback
			link.addEventListener("touchstart", function () {
				this.classList.add("touch-active");
			});

			link.addEventListener("touchend", function () {
				setTimeout(() => {
					this.classList.remove("touch-active");
				}, 150);
			});

			link.addEventListener("touchcancel", function () {
				this.classList.remove("touch-active");
			});
		});

		// Close mobile nav when clicking outside
		document.addEventListener("click", function (event) {
			if (
				!mobileToggle.contains(event.target) &&
				!mobileNav.contains(event.target)
			) {
				closeMobileNav();
			}
		});

		// Close mobile nav on escape key
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				closeMobileNav();
			}
		});

		// Enhanced resize handler with debouncing
		let resizeTimeout;
		window.addEventListener("resize", function () {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				if (window.innerWidth >= 768) {
					// tablet breakpoint
					closeMobileNav();
				}
			}, 100);
		});

		// Handle orientation change
		window.addEventListener("orientationchange", function () {
			setTimeout(() => {
				if (window.innerWidth >= 768) {
					closeMobileNav();
				}
			}, 100);
		});
	}

	// Keyboard navigation enhancement
	function initKeyboardNavigation() {
		const navLinks = document.querySelectorAll(
			".nav-link, .mobile-nav-link"
		);

		navLinks.forEach((link) => {
			link.addEventListener("keydown", function (event) {
				// Handle Enter and Space keys
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					link.click();
				}
			});
		});
	}

	// Active link highlighting based on current page
	function initActiveLinks() {
		const currentPath = window.location.pathname;
		const navLinks = document.querySelectorAll(
			".nav-link, .mobile-nav-link"
		);

		navLinks.forEach((link) => {
			const linkPath = new URL(link.href).pathname;

			// Remove existing active class
			link.classList.remove("active");

			// Add active class if paths match
			if (
				currentPath === linkPath ||
				(currentPath !== "/" &&
					linkPath !== "/" &&
					currentPath.startsWith(linkPath))
			) {
				link.classList.add("active");
			}
		});
	}

	// Smooth scrolling for anchor links
	function initSmoothScrolling() {
		const anchorLinks = document.querySelectorAll('a[href^="#"]');

		anchorLinks.forEach((link) => {
			link.addEventListener("click", function (event) {
				const targetId = this.getAttribute("href").substring(1);
				const targetElement = document.getElementById(targetId);

				if (targetElement) {
					event.preventDefault();

					// Close mobile nav if open
					const mobileToggle =
						document.querySelector(".mobile-nav-toggle");
					const mobileNav =
						document.querySelector(".mobile-navigation");

					if (mobileToggle && mobileNav) {
						mobileToggle.setAttribute("aria-expanded", "false");
						mobileNav.setAttribute("aria-hidden", "true");
						document.body.style.overflow = "";
					}

					// Smooth scroll to target
					targetElement.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});

					// Update URL without triggering navigation
					history.pushState(null, null, `#${targetId}`);
				}
			});
		});
	}

	// Focus management for accessibility
	function initFocusManagement() {
		const mobileToggle = document.querySelector(".mobile-nav-toggle");
		const mobileNav = document.querySelector(".mobile-navigation");

		if (!mobileToggle || !mobileNav) {
			return;
		}

		// Focus first link when mobile nav opens
		mobileToggle.addEventListener("click", function () {
			const isExpanded = this.getAttribute("aria-expanded") === "true";

			if (isExpanded) {
				setTimeout(() => {
					const firstLink =
						mobileNav.querySelector(".mobile-nav-link");
					if (firstLink) {
						firstLink.focus();
					}
				}, 100); // Small delay to allow animation
			}
		});

		// Trap focus within mobile navigation when open
		mobileNav.addEventListener("keydown", function (event) {
			if (event.key === "Tab") {
				const focusableElements =
					mobileNav.querySelectorAll(".mobile-nav-link");
				const firstElement = focusableElements[0];
				const lastElement =
					focusableElements[focusableElements.length - 1];

				if (event.shiftKey) {
					// Shift + Tab
					if (document.activeElement === firstElement) {
						event.preventDefault();
						lastElement.focus();
					}
				} else {
					// Tab
					if (document.activeElement === lastElement) {
						event.preventDefault();
						firstElement.focus();
					}
				}
			}
		});
	}

	// Mobile-specific optimizations
	function initMobileOptimizations() {
		// Prevent zoom on input focus (iOS)
		const inputs = document.querySelectorAll("input, textarea, select");
		inputs.forEach((input) => {
			input.addEventListener("focus", function () {
				if (window.innerWidth < 768) {
					const viewport = document.querySelector(
						'meta[name="viewport"]'
					);
					if (viewport) {
						viewport.setAttribute(
							"content",
							"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
						);
					}
				}
			});

			input.addEventListener("blur", function () {
				if (window.innerWidth < 768) {
					const viewport = document.querySelector(
						'meta[name="viewport"]'
					);
					if (viewport) {
						viewport.setAttribute(
							"content",
							"width=device-width, initial-scale=1.0"
						);
					}
				}
			});
		});

		// Optimize scroll performance on mobile
		let ticking = false;
		function updateScrollPosition() {
			// Add scroll-based optimizations here if needed
			ticking = false;
		}

		function requestScrollUpdate() {
			if (!ticking) {
				requestAnimationFrame(updateScrollPosition);
				ticking = true;
			}
		}

		if (window.innerWidth < 768) {
			window.addEventListener("scroll", requestScrollUpdate, {
				passive: true,
			});
		}

		// Handle viewport changes (orientation, keyboard)
		function handleViewportChange() {
			// Close mobile nav on orientation change
			const mobileToggle = document.querySelector(".mobile-nav-toggle");
			const mobileNav = document.querySelector(".mobile-navigation");

			if (mobileToggle && mobileNav) {
				mobileToggle.setAttribute("aria-expanded", "false");
				mobileNav.setAttribute("aria-hidden", "true");
				document.body.style.overflow = "";
				document.body.classList.remove("mobile-nav-open");
			}
		}

		window.addEventListener("orientationchange", handleViewportChange);

		// Handle visual viewport changes (mobile keyboard)
		if (window.visualViewport) {
			window.visualViewport.addEventListener(
				"resize",
				handleViewportChange
			);
		}
	}

	// Initialize all navigation functionality
	function init() {
		// Wait for DOM to be ready
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", function () {
				initMobileNavigation();
				initKeyboardNavigation();
				initActiveLinks();
				initSmoothScrolling();
				initFocusManagement();
				initMobileOptimizations();
			});
		} else {
			initMobileNavigation();
			initKeyboardNavigation();
			initActiveLinks();
			initSmoothScrolling();
			initFocusManagement();
			initMobileOptimizations();
		}
	}

	// Initialize
	init();

	// Export functions for potential external use
	window.PortfolioNavigation = {
		init: init,
		initMobileNavigation: initMobileNavigation,
		initKeyboardNavigation: initKeyboardNavigation,
		initActiveLinks: initActiveLinks,
		initSmoothScrolling: initSmoothScrolling,
		initFocusManagement: initFocusManagement,
		initMobileOptimizations: initMobileOptimizations,
	};
})();
