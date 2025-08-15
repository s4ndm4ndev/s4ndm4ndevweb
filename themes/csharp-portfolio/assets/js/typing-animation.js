/**
 * Typing Animation Module
 * Creates a typewriter effect for the hero title
 */

class TypingAnimation {
	constructor(element, options = {}) {
		this.element = element;
		this.text =
			options.text ||
			element.getAttribute("data-typing-text") ||
			element.textContent;
		this.speed = options.speed || 100; // milliseconds per character
		this.delay = options.delay || 1000; // delay before starting
		this.cursor = options.cursor || "|";
		this.loop = options.loop || false;
		this.deleteSpeed = options.deleteSpeed || 50;
		this.deleteDelay = options.deleteDelay || 2000;

		this.currentIndex = 0;
		this.isDeleting = false;
		this.isComplete = false;

		this.init();
	}

	/**
	 * Initialize the typing animation
	 */
	init() {
		// Clear the element content
		this.element.textContent = "";

		// Find and handle cursor element
		this.cursorElement =
			this.element.querySelector(".hero-cursor") ||
			this.element.parentElement.querySelector(".hero-cursor");

		// If cursor is inside the element, move it outside and make it follow the text
		if (this.element.querySelector(".hero-cursor")) {
			this.cursorElement.remove();
			this.element.insertAdjacentElement("afterend", this.cursorElement);
		}

		// Hide cursor initially
		if (this.cursorElement) {
			this.cursorElement.classList.remove("visible");
		}

		// Start animation after delay
		setTimeout(() => {
			// Show cursor when typing starts
			if (this.cursorElement) {
				this.cursorElement.classList.add("visible");
			}
			this.type();
		}, this.delay);
	}

	/**
	 * Type characters one by one
	 */
	type() {
		if (this.isDeleting) {
			// Delete characters
			if (this.currentIndex > 0) {
				this.currentIndex--;
				this.element.textContent = this.text.substring(
					0,
					this.currentIndex
				);
				setTimeout(() => this.type(), this.deleteSpeed);
			} else {
				// Start typing again
				this.isDeleting = false;
				setTimeout(() => this.type(), this.speed);
			}
		} else {
			// Type characters
			if (this.currentIndex < this.text.length) {
				this.currentIndex++;
				this.element.textContent = this.text.substring(
					0,
					this.currentIndex
				);
				setTimeout(() => this.type(), this.speed);
			} else {
				// Typing complete
				this.isComplete = true;

				if (this.loop) {
					// Start deleting after delay
					setTimeout(() => {
						this.isDeleting = true;
						this.isComplete = false;
						this.type();
					}, this.deleteDelay);
				} else {
					// Hide cursor after completion
					if (this.cursorElement) {
						setTimeout(() => {
							this.cursorElement.style.opacity = "0";
						}, 2000);
					}
				}
			}
		}
	}

	/**
	 * Reset the animation
	 */
	reset() {
		this.currentIndex = 0;
		this.isDeleting = false;
		this.isComplete = false;
		this.element.textContent = "";

		if (this.cursorElement) {
			this.cursorElement.style.opacity = "1";
		}
	}

	/**
	 * Start the animation
	 */
	start() {
		this.reset();
		setTimeout(() => {
			this.type();
		}, this.delay);
	}

	/**
	 * Stop the animation
	 */
	stop() {
		this.isComplete = true;
		this.element.textContent = this.text;

		if (this.cursorElement) {
			this.cursorElement.style.opacity = "0";
		}
	}
}

/**
 * Initialize typing animations when DOM is ready
 */
function initTypingAnimations() {
	// Find all elements with typing animation
	const typingElements = document.querySelectorAll("[data-typing-text]");

	typingElements.forEach((element) => {
		// Check if element is in viewport before starting animation
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Check if this is the method name or execution output
						if (element.classList.contains("code-method")) {
							// Method name typing
							const animation = new TypingAnimation(element, {
								speed: 100,
								delay: 1000,
								loop: false,
							});
							element.typingAnimation = animation;
						} else if (
							element.classList.contains("execution-output")
						) {
							// Execution output typing (happens after method execution)
							const executionSection =
								element.closest(".hero-execution");
							const executionDelay =
								parseInt(
									executionSection.getAttribute(
										"data-execution-delay"
									)
								) || 3000;

							// Show execution section first
							setTimeout(() => {
								executionSection.classList.add("show");

								// Then start typing the output
								setTimeout(() => {
									const animation = new TypingAnimation(
										element,
										{
											speed: 60,
											delay: 500,
											loop: false,
										}
									);
									element.typingAnimation = animation;
								}, 800);
							}, executionDelay);
						} else {
							// Default typing animation
							const animation = new TypingAnimation(element, {
								speed: 80,
								delay: 500,
								loop: false,
							});
							element.typingAnimation = animation;
						}

						// Disconnect observer after first trigger
						observer.unobserve(element);
					}
				});
			},
			{
				threshold: 0.5, // Start when 50% of element is visible
			}
		);

		observer.observe(element);
	});
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initTypingAnimations);
} else {
	initTypingAnimations();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
	module.exports = TypingAnimation;
}
