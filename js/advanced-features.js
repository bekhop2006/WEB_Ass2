// Advanced JavaScript Features for Assignment 6
// DOM Manipulation, Event Handling, and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DOM MANIPULATION AND STYLING ====================
    
    // 1. Star Rating System
    function initializeStarRating() {
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'star-rating-container';
        ratingContainer.innerHTML = `
            <h4>Rate this website:</h4>
            <div class="star-rating" id="star-rating">
                <span class="star" data-rating="1">★</span>
                <span class="star" data-rating="2">★</span>
                <span class="star" data-rating="3">★</span>
                <span class="star" data-rating="4">★</span>
                <span class="star" data-rating="5">★</span>
            </div>
            <p id="rating-feedback">Click on a star to rate!</p>
        `;
        
        // Add to the interactive features section
        const interactiveSection = document.querySelector('.mb-5.text-center');
        if (interactiveSection) {
            interactiveSection.appendChild(ratingContainer);
        }
        
        // Add event listeners to stars
        const stars = document.querySelectorAll('.star');
        const feedback = document.getElementById('rating-feedback');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                updateStarRating(rating);
                feedback.textContent = `You rated this website ${rating} star${rating > 1 ? 's' : ''}! Thank you!`;
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.dataset.rating);
                highlightStars(rating);
            });
        });
        
        document.getElementById('star-rating').addEventListener('mouseleave', function() {
            const currentRating = this.dataset.currentRating || 0;
            highlightStars(parseInt(currentRating));
        });
    }
    
    function updateStarRating(rating) {
        const stars = document.querySelectorAll('.star');
        const ratingContainer = document.getElementById('star-rating');
        
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#ffc107';
                star.style.textShadow = '0 0 10px #ffc107';
            } else {
                star.style.color = '#ddd';
                star.style.textShadow = 'none';
            }
        });
        
        ratingContainer.dataset.currentRating = rating;
    }
    
    function highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#ffc107';
                star.style.transform = 'scale(1.1)';
            } else {
                star.style.color = '#ddd';
                star.style.transform = 'scale(1)';
            }
        });
    }
    
    // 2. Dynamic Content Updates
    function initializeDynamicContent() {
        const dynamicContentContainer = document.createElement('div');
        dynamicContentContainer.className = 'dynamic-content-container mt-4';
        dynamicContentContainer.innerHTML = `
            <h4>Dynamic Content</h4>
            <div class="content-area" id="dynamic-content-area">
                <p>Welcome to our news website! Click the button below to get a random news fact.</p>
            </div>
            <button class="btn btn-info mt-2" id="update-content-btn">Get Random News Fact</button>
        `;
        
        const interactiveSection = document.querySelector('.mb-5.text-center');
        if (interactiveSection) {
            interactiveSection.appendChild(dynamicContentContainer);
        }
        
        const newsFacts = [
            "Breaking: New AI technology revolutionizes news reporting!",
            "Sports Update: Local team wins championship after 10 years!",
            "Tech News: Revolutionary smartphone battery lasts 7 days!",
            "Health Alert: New breakthrough in cancer treatment discovered!",
            "Weather: Unprecedented weather patterns observed this season!",
            "Politics: Historic agreement signed between nations!",
            "Entertainment: Award-winning movie breaks box office records!",
            "Science: New planet discovered in our solar system!"
        ];
        
        document.getElementById('update-content-btn').addEventListener('click', function() {
            const randomFact = newsFacts[Math.floor(Math.random() * newsFacts.length)];
            const contentArea = document.getElementById('dynamic-content-area');
            
            // Add animation effect
            contentArea.style.opacity = '0.5';
            contentArea.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                contentArea.innerHTML = `<p><strong>Latest Update:</strong> ${randomFact}</p>`;
                contentArea.style.opacity = '1';
                contentArea.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // 3. Theme Toggle (Day/Night Mode)
    function initializeThemeToggle() {
        const themeToggleContainer = document.createElement('div');
        themeToggleContainer.className = 'theme-toggle-container mt-3';
        themeToggleContainer.innerHTML = `
            <button class="btn btn-dark" id="theme-toggle-btn">🌙 Night Mode</button>
        `;
        
        const interactiveSection = document.querySelector('.mb-5.text-center');
        if (interactiveSection) {
            interactiveSection.appendChild(themeToggleContainer);
        }
        
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        let isDarkMode = false;
        
        themeToggleBtn.addEventListener('click', function() {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.classList.add('dark-theme');
                themeToggleBtn.innerHTML = '☀️ Day Mode';
                themeToggleBtn.className = 'btn btn-warning';
            } else {
                document.body.classList.remove('dark-theme');
                themeToggleBtn.innerHTML = '🌙 Night Mode';
                themeToggleBtn.className = 'btn btn-dark';
            }
        });
    }
    
    // ==================== EVENT HANDLING ====================
    
    // 4. Keyboard Navigation
    function initializeKeyboardNavigation() {
        const navItems = document.querySelectorAll('.nav-link');
        let currentNavIndex = 0;
        
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    currentNavIndex = (currentNavIndex + 1) % navItems.length;
                    navItems[currentNavIndex].focus();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    currentNavIndex = currentNavIndex === 0 ? navItems.length - 1 : currentNavIndex - 1;
                    navItems[currentNavIndex].focus();
                    break;
                case 'Enter':
                    if (document.activeElement.classList.contains('nav-link')) {
                        document.activeElement.click();
                    }
                    break;
            }
        });
    }
    
    // 5. Form Validation with Callbacks
    function initializeFormValidation() {
        const contactForm = document.createElement('form');
        contactForm.className = 'contact-form mt-4';
        contactForm.innerHTML = `
            <h4>Contact Us</h4>
            <div class="mb-3">
                <label for="contact-name" class="form-label">Name</label>
                <input type="text" class="form-control" id="contact-name" required>
                <div class="error-message" id="name-error"></div>
            </div>
            <div class="mb-3">
                <label for="contact-email" class="form-label">Email</label>
                <input type="email" class="form-control" id="contact-email" required>
                <div class="error-message" id="email-error"></div>
            </div>
            <div class="mb-3">
                <label for="contact-message" class="form-label">Message</label>
                <textarea class="form-control" id="contact-message" rows="3" required></textarea>
                <div class="error-message" id="message-error"></div>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
            <button type="button" class="btn btn-secondary ms-2" id="reset-form-btn">Reset</button>
        `;
        
        const interactiveSection = document.querySelector('.mb-5.text-center');
        if (interactiveSection) {
            interactiveSection.appendChild(contactForm);
        }
        
        // Form validation callback
        function validateForm(callback) {
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
            document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
            
            // Validate name
            if (name.length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters long';
                document.getElementById('contact-name').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                document.getElementById('contact-email').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate message
            if (message.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
                document.getElementById('contact-message').classList.add('is-invalid');
                isValid = false;
            }
            
            callback(isValid, { name, email, message });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(function(isValid, formData) {
                if (isValid) {
                    // Simulate form submission
                    setTimeout(() => {
                        alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
                        contactForm.reset();
                    }, 500);
                }
            });
        });
        
        // Reset form
        document.getElementById('reset-form-btn').addEventListener('click', function() {
            contactForm.reset();
            document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
            document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
        });
    }
    
    // 6. Switch Statement Implementation - Language Selector
    function initializeLanguageSelector() {
        const languageContainer = document.createElement('div');
        languageContainer.className = 'language-selector mt-3';
        languageContainer.innerHTML = `
            <h4>Language Selection</h4>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary active" data-lang="en">English</button>
                <button type="button" class="btn btn-outline-primary" data-lang="ru">Русский</button>
                <button type="button" class="btn btn-outline-primary" data-lang="kz">Қазақша</button>
            </div>
            <p id="language-greeting">Welcome to our news website!</p>
        `;
        
        const interactiveSection = document.querySelector('.mb-5.text-center');
        if (interactiveSection) {
            interactiveSection.appendChild(languageContainer);
        }
        
        const greetings = {
            en: "Welcome to our news website!",
            ru: "Добро пожаловать на наш новостной сайт!",
            kz: "Біздің жаңалықтар сайтына қош келдіңіз!"
        };
        
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedLang = this.dataset.lang;
                
                // Update active button
                document.querySelectorAll('[data-lang]').forEach(b => b.classList.remove('active'));
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
                
                document.getElementById('language-greeting').textContent = greeting;
            });
        });
    }
    
    // ==================== ADVANCED JAVASCRIPT CONCEPTS ====================
    
    // 7. Objects and Methods
    const NewsManager = {
        articles: [
            { id: 1, title: "Breaking News", category: "General", content: "Important news update...", views: 0 },
            { id: 2, title: "Sports Update", category: "Sports", content: "Latest sports news...", views: 0 },
            { id: 3, title: "Tech News", category: "Technology", content: "Technology breakthrough...", views: 0 }
        ],
        
        getArticleById: function(id) {
            return this.articles.find(article => article.id === id);
        },
        
        getArticlesByCategory: function(category) {
            return this.articles.filter(article => article.category === category);
        },
        
        incrementViews: function(id) {
            const article = this.getArticleById(id);
            if (article) {
                article.views++;
                return article.views;
            }
            return 0;
        },
        
        getAllCategories: function() {
            return [...new Set(this.articles.map(article => article.category))];
        }
    };
    
    // 8. Arrays and Higher-Order Functions
    function initializeNewsFiltering() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'news-filter mt-4';
        filterContainer.innerHTML = `
            <h4>Filter News by Category</h4>
            <div class="btn-group mb-3" role="group">
                <button type="button" class="btn btn-outline-secondary active" data-category="all">All</button>
                <button type="button" class="btn btn-outline-secondary" data-category="General">General</button>
                <button type="button" class="btn btn-outline-secondary" data-category="Sports">Sports</button>
                <button type="button" class="btn btn-outline-secondary" data-category="Technology">Technology</button>
            </div>
            <div id="filtered-news" class="row g-3"></div>
        `;
        
        const interactiveSection = document.querySelector('.mb-5.text-center');
        if (interactiveSection) {
            interactiveSection.appendChild(filterContainer);
        }
        
        function displayNews(articles) {
            const container = document.getElementById('filtered-news');
            container.innerHTML = '';
            
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'col-md-4';
                articleElement.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.content}</p>
                            <small class="text-muted">Category: ${article.category} | Views: ${article.views}</small>
                        </div>
                    </div>
                `;
                container.appendChild(articleElement);
            });
        }
        
        // Initial display
        displayNews(NewsManager.articles);
        
        // Filter buttons
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active button
                document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter articles using higher-order function
                const filteredArticles = category === 'all' 
                    ? NewsManager.articles 
                    : NewsManager.articles.filter(article => article.category === category);
                
                displayNews(filteredArticles);
            });
        });
    }
    
    // 9. Sound Effects
    function initializeSoundEffects() {
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playNotificationSound() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
        
        // Add sound to various buttons
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('no-sound')) {
                playNotificationSound();
            }
        });
    }
    
    // 10. Animations
    function initializeAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .star {
                font-size: 2em;
                color: #ddd;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-block;
                margin: 0 5px;
            }
            
            .star:hover {
                transform: scale(1.2);
            }
            
            .dark-theme {
                background-color: #1a1a1a !important;
                color: #ffffff !important;
            }
            
            .dark-theme .card {
                background-color: #2d2d2d !important;
                color: #ffffff !important;
                border-color: #444 !important;
            }
            
            .dark-theme .form-control {
                background-color: #3d3d3d !important;
                color: #ffffff !important;
                border-color: #555 !important;
            }
            
            .dark-theme .btn {
                border-color: #555 !important;
            }
            
            .dark-theme .btn-outline-primary {
                color: #0d6efd !important;
                border-color: #0d6efd !important;
            }
            
            .dark-theme .btn-outline-primary:hover {
                background-color: #0d6efd !important;
                color: #ffffff !important;
            }
            
            .dark-theme .btn-outline-secondary {
                color: #6c757d !important;
                border-color: #6c757d !important;
            }
            
            .dark-theme .btn-outline-secondary:hover {
                background-color: #6c757d !important;
                color: #ffffff !important;
            }
            
            .dark-theme .btn-outline-secondary.active {
                background-color: #6c757d !important;
                color: #ffffff !important;
            }
            
            .dark-theme .text-muted {
                color: #adb5bd !important;
            }
            
            .dark-theme .text-center {
                color: #ffffff !important;
            }
            
            .dark-theme h1, .dark-theme h2, .dark-theme h3, .dark-theme h4, .dark-theme h5, .dark-theme h6 {
                color: #ffffff !important;
            }
            
            .dark-theme p {
                color: #e9ecef !important;
            }
            
            .dark-theme .card-body {
                color: #ffffff !important;
            }
            
            .dark-theme .card-body p {
                color: #e9ecef !important;
            }
            
            .dark-theme .card-body h5, .dark-theme .card-body h6 {
                color: #ffffff !important;
            }
            
            .dark-theme .card-body small {
                color: #adb5bd !important;
            }
            
            .dark-theme .news-dashboard {
                background-color: #1a1a1a !important;
            }
            
            .dark-theme .news-dashboard .card {
                background-color: #2d2d2d !important;
                border-color: #444 !important;
            }
            
            .dark-theme .news-dashboard .card-header {
                background-color: #343a40 !important;
                border-bottom-color: #444 !important;
                color: #ffffff !important;
            }
            
            .dark-theme .news-dashboard .card-body {
                background-color: #2d2d2d !important;
                color: #ffffff !important;
            }
            
            .dark-theme .form-label {
                color: #ffffff !important;
            }
            
            .dark-theme .form-select {
                background-color: #3d3d3d !important;
                color: #ffffff !important;
                border-color: #555 !important;
            }
            
            .dark-theme .form-select option {
                background-color: #3d3d3d !important;
                color: #ffffff !important;
            }
            
            .dark-theme .star-rating-container h4 {
                color: #ffffff !important;
            }
            
            .dark-theme .star-rating-container p {
                color: #e9ecef !important;
            }
            
            .dark-theme .dynamic-content-container h4 {
                color: #ffffff !important;
            }
            
            .dark-theme .dynamic-content-container p {
                color: #e9ecef !important;
            }
            
            .dark-theme .language-selector h4 {
                color: #ffffff !important;
            }
            
            .dark-theme .language-selector p {
                color: #e9ecef !important;
            }
            
            .dark-theme .contact-form h4 {
                color: #ffffff !important;
            }
            
            .dark-theme .contact-form .form-label {
                color: #ffffff !important;
            }
            
            .dark-theme .contact-form .error-message {
                color: #dc3545 !important;
            }
            
            .dark-theme .character-counter {
                color: #adb5bd !important;
            }
            
            .dark-theme .character-counter.text-warning {
                color: #ffc107 !important;
            }
            
            .dark-theme .character-counter.text-danger {
                color: #dc3545 !important;
            }
            
            .dark-theme .success-message {
                background-color: #155724 !important;
                border-color: #c3e6cb !important;
                color: #d4edda !important;
            }
            
            .dark-theme .alert-success {
                background-color: #155724 !important;
                border-color: #c3e6cb !important;
                color: #d4edda !important;
            }
            
            .dark-theme .news-ticker {
                background: linear-gradient(90deg, #0d6efd, #0056b3) !important;
            }
            
            .dark-theme .ticker-label {
                background: rgba(255,255,255,0.2) !important;
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .bounce {
                animation: bounce 0.6s ease;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            .pulse {
                animation: pulse 1s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Add animation classes to elements
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
        
        // Add pulse animation to important buttons
        const importantButtons = document.querySelectorAll('.btn-primary');
        importantButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.classList.add('pulse');
            });
            btn.addEventListener('mouseleave', function() {
                this.classList.remove('pulse');
            });
        });
    }
    
    // ==================== INITIALIZATION ====================
    
    // Initialize all features
    initializeStarRating();
    initializeDynamicContent();
    initializeThemeToggle();
    initializeKeyboardNavigation();
    initializeFormValidation();
    initializeLanguageSelector();
    initializeNewsFiltering();
    initializeSoundEffects();
    initializeAnimations();
    
    // Add current time display button
    const timeButton = document.createElement('button');
    timeButton.className = 'btn btn-info mt-2';
    timeButton.textContent = 'Show Current Time';
    timeButton.addEventListener('click', function() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        alert(`Current time: ${timeString}`);
    });
    
    const interactiveSection = document.querySelector('.mb-5.text-center');
    if (interactiveSection) {
        interactiveSection.appendChild(timeButton);
    }
    
    console.log('Advanced JavaScript features initialized successfully!');
});
