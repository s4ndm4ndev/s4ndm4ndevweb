/**
 * Contact Form Validation and Submission
 * Provides C#-inspired form validation with compiler-style error messages
 */

class ContactFormValidator {
	constructor(formId) {
		this.form = document.getElementById(formId);
		this.isSubmitting = false;

		if (!this.form) {
			console.error(`Contact form with ID "${formId}" not found`);
			return;
		}

		this.init();
	}

	init() {
		// Add event listeners
		this.form.addEventListener("submit", this.handleSubmit.bind(this));
		this.form.addEventListener("reset", this.handleReset.bind(this));

		// Add real-time validation
		const inputs = this.form.querySelectorAll("input, textarea");
		inputs.forEach((input) => {
			input.addEventListener("blur", () => this.validateField(input));
			input.addEventListener("input", () => this.clearFieldError(input));
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.isSubmitting) {
			return;
		}

		const isValid = this.validateForm();

		if (isValid) {
			this.submitForm();
		} else {
			this.showFormStatus(
				"Please fix the validation errors above.",
				"error"
			);
		}
	}

	handleReset(event) {
		// Clear all error messages
		const errorMessages = this.form.querySelectorAll(".error-message");
		errorMessages.forEach((error) => {
			error.textContent = "";
			error.classList.remove("show");
		});

		// Clear form status
		this.hideFormStatus();

		// Reset form styling
		const inputs = this.form.querySelectorAll("input, textarea");
		inputs.forEach((input) => {
			input.classList.remove("error", "valid");
		});
	}

	validateForm() {
		const fields = [
			{ id: "name", required: true, minLength: 2 },
			{ id: "email", required: true, type: "email" },
			{ id: "subject", required: true, minLength: 5 },
			{ id: "message", required: true, minLength: 10 },
		];

		let isValid = true;

		fields.forEach((field) => {
			const input = this.form.querySelector(`#${field.id}`);
			if (!this.validateField(input, field)) {
				isValid = false;
			}
		});

		return isValid;
	}

	validateField(input, rules = null) {
		if (!input) return true;

		const value = input.value.trim();
		const fieldName = input.name || input.id;
		const errorElement = this.form.querySelector(`#${input.id}-error`);

		if (!errorElement) return true;

		// Clear previous errors
		this.clearFieldError(input);

		// Get validation rules
		if (!rules) {
			rules = this.getFieldRules(input);
		}

		// Required field validation
		if (rules.required && !value) {
			this.showFieldError(
				input,
				errorElement,
				`${this.capitalize(fieldName)} is required`,
				"required-error"
			);
			return false;
		}

		// Skip other validations if field is empty and not required
		if (!value && !rules.required) {
			return true;
		}

		// Email validation
		if (rules.type === "email" && !this.isValidEmail(value)) {
			this.showFieldError(
				input,
				errorElement,
				`Invalid email format`,
				"email-error"
			);
			return false;
		}

		// Minimum length validation
		if (rules.minLength && value.length < rules.minLength) {
			this.showFieldError(
				input,
				errorElement,
				`${this.capitalize(fieldName)} must be at least ${
					rules.minLength
				} characters`,
				"length-error"
			);
			return false;
		}

		// Maximum length validation
		if (rules.maxLength && value.length > rules.maxLength) {
			this.showFieldError(
				input,
				errorElement,
				`${this.capitalize(fieldName)} must be no more than ${
					rules.maxLength
				} characters`,
				"length-error"
			);
			return false;
		}

		// Field is valid
		input.classList.add("valid");
		return true;
	}

	getFieldRules(input) {
		const rules = {
			required: input.hasAttribute("required"),
			type: input.type,
			minLength: parseInt(input.getAttribute("minlength")) || null,
			maxLength: parseInt(input.getAttribute("maxlength")) || null,
		};

		// Default rules based on field name/id
		switch (input.id) {
			case "name":
				rules.minLength = rules.minLength || 2;
				rules.maxLength = rules.maxLength || 100;
				break;
			case "subject":
				rules.minLength = rules.minLength || 5;
				rules.maxLength = rules.maxLength || 200;
				break;
			case "message":
				rules.minLength = rules.minLength || 10;
				rules.maxLength = rules.maxLength || 2000;
				break;
		}

		return rules;
	}

	showFieldError(input, errorElement, message, errorClass = "") {
		input.classList.add("error");
		input.classList.remove("valid");

		errorElement.textContent = message;
		errorElement.classList.add("show");

		if (errorClass) {
			errorElement.classList.add(errorClass);
		}
	}

	clearFieldError(input) {
		const errorElement = this.form.querySelector(`#${input.id}-error`);

		if (errorElement) {
			errorElement.textContent = "";
			errorElement.classList.remove(
				"show",
				"required-error",
				"email-error",
				"length-error"
			);
		}

		input.classList.remove("error");
	}

	isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	async submitForm() {
		this.isSubmitting = true;
		const submitButton = this.form.querySelector(".contact-submit-btn");
		const originalText = submitButton.innerHTML;

		// Update button state
		submitButton.disabled = true;
		submitButton.innerHTML = `
            <span class="btn-return-type">Task&lt;bool&gt;</span>
            <span class="btn-method">Sending</span>
            <span class="btn-params">...</span>
        `;

		// Show loading status
		this.showFormStatus("Sending your message...", "loading");

		try {
			// Get form data
			const formData = new FormData(this.form);
			const data = Object.fromEntries(formData.entries());

			// Submit form data to configured services
			const result = await this.submitFormData(data);

			// Show success message
			this.showFormStatus(
				"Message sent successfully! I'll get back to you soon.",
				"success"
			);

			// Reset form after successful submission
			this.form.reset();
			this.handleReset();
		} catch (error) {
			console.error("Form submission error:", error);
			this.showFormStatus(
				"Failed to send message. Please try again or contact me directly.",
				"error"
			);
		} finally {
			// Reset button state
			this.isSubmitting = false;
			submitButton.disabled = false;
			submitButton.innerHTML = originalText;
		}
	}

	async submitFormData(data) {
		// Try multiple form submission services
		const services = [
			{
				name: 'Formspree',
				endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
				method: 'POST'
			},
			{
				name: 'Netlify Forms',
				endpoint: window.location.href,
				method: 'POST'
			}
		];

		// For Netlify Forms, add form-name to data
		if (window.location.hostname.includes('netlify')) {
			data['form-name'] = 'contact';
		}

		// Try each service until one works
		for (const service of services) {
			try {
				const response = await fetch(service.endpoint, {
					method: service.method,
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(data)
				});

				if (response.ok) {
					return { success: true, service: service.name };
				}
			} catch (error) {
				console.warn(`${service.name} failed:`, error);
				continue;
			}
		}

		// If all services fail, fallback to mailto
		this.fallbackToMailto(data);
		return { success: true, service: 'mailto' };
	}

	fallbackToMailto(data) {
		const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
		const body = encodeURIComponent(
			`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
		);
		const mailtoLink = `mailto:sadaruwan12@gmail.com?subject=${subject}&body=${body}`;
		
		// Open mailto link
		window.location.href = mailtoLink;
	}

	showFormStatus(message, type) {
		const statusElement = this.form.querySelector("#formStatus");

		if (statusElement) {
			statusElement.textContent = message;
			statusElement.className = `form-status show ${type}`;
		}
	}

	hideFormStatus() {
		const statusElement = this.form.querySelector("#formStatus");

		if (statusElement) {
			statusElement.textContent = "";
			statusElement.className = "form-status";
		}
	}
}

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize contact form validator
	const contactForm = new ContactFormValidator("contactForm");

	// Add smooth scrolling to contact section when contact button is clicked
	const contactButtons = document.querySelectorAll('a[href="#contact"]');
	contactButtons.forEach((button) => {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			const contactSection = document.getElementById("contact");
			if (contactSection) {
				contactSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});
});

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
	module.exports = ContactFormValidator;
}
