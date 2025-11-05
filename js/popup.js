document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('subscription-popup');
    const openBtn = document.getElementById('open-popup');
    const openPopupNews = document.getElementById('open-popup-news');
    const closeBtn = document.getElementById('close-popup');
    const popupForm = document.getElementById('popup-form');
    
    // Helper function to show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast-item ${type === 'error' ? 'toast-error' : ''}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Helper function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show error message
    function showError(field, message) {
        field.classList.add('is-invalid');
        removeError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.id = `${field.id}-error`;
        field.parentNode.appendChild(errorDiv);
    }
    
    // Helper function to remove error message
    function removeError(field) {
        const existingError = document.getElementById(`${field.id}-error`);
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('is-invalid');
    }
    
    // Open popup handlers
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            if (popup) {
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (openPopupNews) {
        openPopupNews.addEventListener('click', function() {
            if (popup) {
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Close popup handlers
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', function() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (popupForm) {
                popupForm.reset();
                const emailField = document.getElementById('popup-email');
                if (emailField) {
                    removeError(emailField);
                }
            }
        });
    }
    
    // Close on click outside
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
                if (popupForm) {
                    popupForm.reset();
                    const emailField = document.getElementById('popup-email');
                    if (emailField) {
                        removeError(emailField);
                    }
                }
            }
        });
    }
    
    // Form validation and submission
    if (popupForm) {
        const emailField = document.getElementById('popup-email');
        
        // Real-time validation
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email && !validateEmail(email)) {
                    showError(this, 'Please enter a valid email address');
                } else if (email) {
                    removeError(this);
                    this.classList.add('is-valid');
                }
            });
            
            emailField.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    const email = this.value.trim();
                    if (email && validateEmail(email)) {
                        removeError(this);
                        this.classList.add('is-valid');
                    }
                }
            });
        }
        
        // Form submission handler
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!emailField) return;
            
            const email = emailField.value.trim();
            
            // Clear previous errors
            removeError(emailField);
            
            // Validation
            if (!email) {
                showError(emailField, 'Email address is required');
                return;
            }
            
            if (!validateEmail(email)) {
                showError(emailField, 'Please enter a valid email address');
                return;
            }
            
            // Show loading state
            const submitBtn = popupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';
            }
            
            // Simulate API call
            setTimeout(() => {
                // Success
                showToast('Thank you for subscribing! We will keep you updated.', 'success');
                popupForm.reset();
                if (emailField) {
                    emailField.classList.remove('is-valid', 'is-invalid');
                }
                
                // Close popup after a short delay
                setTimeout(() => {
                    if (popup) {
                        popup.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                }, 1000);
                
                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }, 1500);
        });
    }
});