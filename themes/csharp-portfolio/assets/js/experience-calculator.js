/**
 * Experience Calculator Module
 * Automatically calculates years of experience based on start year
 */
export class ExperienceCalculator {
    constructor(startYear) {
        this.startYear = startYear;
    }

    /**
     * Calculate years of experience from start year to current year
     * @returns {number} Years of experience
     */
    calculateExperience() {
        const currentYear = new Date().getFullYear();
        return Math.max(0, currentYear - this.startYear);
    }

    /**
     * Update experience display on page
     */
    updateExperienceDisplay() {
        const experienceElements = document.querySelectorAll('[data-experience]');
        const experience = this.calculateExperience();
        
        experienceElements.forEach(element => {
            element.textContent = experience.toString();
        });
    }

    /**
     * Initialize the experience calculator
     */
    init() {
        // Update on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.updateExperienceDisplay());
        } else {
            this.updateExperienceDisplay();
        }
    }
}

// Auto-initialize if start year is available in the DOM
document.addEventListener('DOMContentLoaded', () => {
    const startYearElement = document.querySelector('[data-experience-start-year]');
    if (startYearElement) {
        const startYear = parseInt(startYearElement.getAttribute('data-experience-start-year'));
        if (!isNaN(startYear)) {
            const calculator = new ExperienceCalculator(startYear);
            calculator.init();
        }
    }
});