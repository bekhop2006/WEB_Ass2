// Enhanced Form Validation System
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('button[type="submit"]');
    const resetBtn = document.querySelector('button[type="reset"]');
    
    // Validation rules object
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Zа-яА-Я\s]+$/,
            message: 'Name must be 2-50 characters long and contain only letters and spaces'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            required: false,
            maxLength: 100,
            message: 'Subject must be less than 100 characters'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be 10-1000 characters long'
        }
    };
    
    // Real-time validation function
    function validateField(field, rules) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error styling
        field.classList.remove('is-invalid', 'is-valid');
        removeErrorMessage(field);
        
        // Required field validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }
        
        // Length validation
        if (value && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters long`;
        }
        
        if (value && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${rules.maxLength} characters`;
        }
        
        // Pattern validation
        if (value && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        // Apply validation styling
        if (value) { // Only show validation if field has content
            if (isValid) {
                field.classList.add('is-valid');
            } else {
                field.classList.add('is-invalid');
                showErrorMessage(field, errorMessage);
            }
        }
        
        return isValid;
    }
    
    // Show error message
    function showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.id = `${field.name}-error`;
        field.parentNode.appendChild(errorDiv);
    }
    
    // Remove error message
    function removeErrorMessage(field) {
        const existingError = document.getElementById(`${field.name}-error`);
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Validate entire form
    function validateForm() {
        let isFormValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const rules = validationRules[fieldName];
            
            if (field) {
                const isFieldValid = validateField(field, rules);
                if (!isFieldValid) {
                    isFormValid = false;
                }
            }
        });
        
        return isFormValid;
    }
    
    // Add real-time validation to all form fields
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) {
            // Validate on blur (when user leaves field)
            input.addEventListener('blur', function() {
                const rules = validationRules[this.name];
                if (rules) {
                    validateField(this, rules);
                }
            });
            
            // Clear validation styling on focus
            input.addEventListener('focus', function() {
                this.classList.remove('is-invalid', 'is-valid');
                removeErrorMessage(this);
            });
            
            // Real-time validation for typing
            input.addEventListener('input', function() {
                const rules = validationRules[this.name];
                if (rules && this.value.trim()) {
                    validateField(this, rules);
                }
            });
        }
    });
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showSuccessMessage();
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Clear all validation styling
                    document.querySelectorAll('.form-control').forEach(field => {
                        field.classList.remove('is-valid', 'is-invalid');
                        removeErrorMessage(field);
                    });
                    
                    // Reset button
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                // Show error message
                showErrorMessage(document.querySelector('.contact-form-section'), 'Please correct the errors above before submitting.');
            }
        });
    }
    
    // Reset button handler
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Clear all validation styling
            document.querySelectorAll('.form-control').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
                removeErrorMessage(field);
            });
            
            // Remove any success messages
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }
        });
    }
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success success-message mt-3';
        successDiv.innerHTML = `
            <h5>Message Sent Successfully!</h5>
            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        `;
        
        const formSection = document.querySelector('.contact-form-section');
        if (formSection) {
            formSection.appendChild(successDiv);
            
            // Auto-remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }
    }
    
    // Character counter for message field
    if (messageInput) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter text-muted small mt-1';
        counterDiv.textContent = '0 / 1000 characters';
        messageInput.parentNode.appendChild(counterDiv);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            counterDiv.textContent = `${length} / 1000 characters`;
            
            if (length > 800) {
                counterDiv.className = 'character-counter text-warning small mt-1';
            } else if (length > 900) {
                counterDiv.className = 'character-counter text-danger small mt-1';
            } else {
                counterDiv.className = 'character-counter text-muted small mt-1';
            }
        });
    }
    
    console.log('Form validation system initialized successfully!');
});