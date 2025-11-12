// Navbar Features - Night Mode, Language, Background Color

document.addEventListener('DOMContentLoaded', function() {
    
    // Night Mode Toggle with localStorage persistence
    const themeToggleBtn = document.getElementById('theme-toggle-navbar');
    
    // Get current theme state
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply saved theme immediately
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    if (themeToggleBtn) {
        // Update button text based on current theme
        if (isDarkMode) {
            themeToggleBtn.innerHTML = '☀️ Day Mode';
        } else {
            themeToggleBtn.innerHTML = '🌙 Night Mode';
        }
        
        themeToggleBtn.addEventListener('click', function() {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.classList.add('dark-theme');
                this.innerHTML = '☀️ Day Mode';
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-theme');
                this.innerHTML = '🌙 Night Mode';
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
    
    // Language Selection in Navbar
    const languageButtons = document.querySelectorAll('.language-btn');
    if (languageButtons.length > 0) {
        const greetings = {
            en: "Welcome to our news website!",
            ru: "Добро пожаловать на наш новостной сайт!",
            kz: "Біздің жаңалықтар сайтына қош келдіңіз!"
        };
        
        const languageNames = {
            en: 'English',
            ru: 'Русский',
            kz: 'Қазақша'
        };
        
        languageButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedLang = this.dataset.lang;
                
                // Update active button
                document.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update greeting using switch statement
                let greeting;
                switch(selectedLang) {
                    case 'en':
                        greeting = greetings.en;
                        break;
                    case 'ru':
                        greeting = greetings.ru;
                        break;
                    case 'kz':
                        greeting = greetings.kz;
                        break;
                    default:
                        greeting = greetings.en;
                }
                
                // Save language preference
                localStorage.setItem('language', selectedLang);
                
                // If there's a greeting element, update it
                const greetingElement = document.getElementById('language-greeting');
                if (greetingElement) {
                    greetingElement.textContent = greeting;
                }
                
                // Update page elements (if needed)
                console.log(`Language changed to: ${selectedLang}`);
                
                // Show current language
                let langLabel = document.getElementById('current-language-label');
                if (!langLabel) {
                    langLabel = document.createElement('div');
                    langLabel.id = 'current-language-label';
                    langLabel.style.textAlign = 'center';
                    langLabel.style.fontWeight = 'bold';
                    langLabel.style.margin = '10px 0';
                    document.body.insertBefore(langLabel, document.getElementById('main-content'));
                }
                langLabel.textContent = 'Current language: ' + languageNames[selectedLang];
            });
        });
        
        // Show current language on load
        const savedLang = localStorage.getItem('language') || 'en';
        let langLabel = document.getElementById('current-language-label');
        if (!langLabel) {
            langLabel = document.createElement('div');
            langLabel.id = 'current-language-label';
            langLabel.style.textAlign = 'center';
            langLabel.style.fontWeight = 'bold';
            langLabel.style.margin = '10px 0';
            document.body.insertBefore(langLabel, document.getElementById('main-content'));
        }
        langLabel.textContent = 'Current language: ' + languageNames[savedLang];
    }
    
    // Background Color Changer in Footer
    const changeBgColorBtn = document.getElementById('change-bg-color-footer');
    if (changeBgColorBtn) {
        const colors = [
            '#f4f4f4', // Default
            '#e3f2fd', // Light Blue
            '#f3e5f5', // Light Purple
            '#e8f5e8', // Light Green
            '#fff3e0', // Light Orange
            '#fce4ec', // Light Pink
            '#f1f8e9', // Light Lime
            '#e0f2f1'  // Light Teal
        ];
        
        let currentColorIndex = 0;
        
        changeBgColorBtn.addEventListener('click', function() {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[currentColorIndex];
        });
    }
    
    // Star Rating for Contact Page
    const starRatingContainer = document.getElementById('star-rating');
    if (starRatingContainer && !starRatingContainer.innerHTML) {
        starRatingContainer.innerHTML = `
            <span class="star" data-rating="1">★</span>
            <span class="star" data-rating="2">★</span>
            <span class="star" data-rating="3">★</span>
            <span class="star" data-rating="4">★</span>
            <span class="star" data-rating="5">★</span>
        `;
        
        const stars = document.querySelectorAll('.star');
        const feedback = document.getElementById('rating-feedback');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                updateStarRating(rating);
                if (feedback) {
                    feedback.textContent = `You rated this website ${rating} star${rating > 1 ? 's' : ''}! Thank you!`;
                }
            });
        });
        
        function updateStarRating(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.style.color = '#ffc107';
                    star.style.textShadow = '0 0 10px #ffc107';
                } else {
                    star.style.color = '#ddd';
                    star.style.textShadow = 'none';
                }
            });
        }
    }
    
    // Subscribe popup for News page
    const openPopupBtn = document.getElementById('open-popup-news');
    const subscriptionPopup = document.getElementById('subscription-popup');
    const closePopupBtn = document.getElementById('close-popup');
    
    if (openPopupBtn && subscriptionPopup) {
        openPopupBtn.addEventListener('click', function() {
            subscriptionPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', function() {
                subscriptionPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close on click outside
        subscriptionPopup.addEventListener('click', function(e) {
            if (e.target === subscriptionPopup) {
                subscriptionPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Handle form submission
        const popupForm = document.getElementById('popup-form');
        if (popupForm) {
            popupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('popup-email').value;
                if (email) {
                    alert('Thank you for subscribing!');
                    subscriptionPopup.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    popupForm.reset();
                }
            });
        }
    }
});

