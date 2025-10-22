// Advanced Animations and Transitions
// Demonstrates CSS animations triggered by JavaScript events

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== ANIMATION UTILITIES ====================
    
    // Animation utility object
    const AnimationUtils = {
        // Fade in animation
        fadeIn: function(element, duration = 500) {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            let start = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        },
        
        // Fade out animation
        fadeOut: function(element, duration = 500) {
            let start = performance.now();
            const startOpacity = parseFloat(getComputedStyle(element).opacity);
            
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = startOpacity * (1 - progress);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                }
            }
            
            requestAnimationFrame(animate);
        },
        
        // Slide down animation
        slideDown: function(element, duration = 500) {
            element.style.height = '0px';
            element.style.overflow = 'hidden';
            element.style.display = 'block';
            
            const targetHeight = element.scrollHeight;
            let start = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentHeight = targetHeight * progress;
                element.style.height = currentHeight + 'px';
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.height = 'auto';
                    element.style.overflow = 'visible';
                }
            }
            
            requestAnimationFrame(animate);
        },
        
        // Slide up animation
        slideUp: function(element, duration = 500) {
            const startHeight = element.offsetHeight;
            element.style.height = startHeight + 'px';
            element.style.overflow = 'hidden';
            
            let start = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentHeight = startHeight * (1 - progress);
                element.style.height = currentHeight + 'px';
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    element.style.height = 'auto';
                    element.style.overflow = 'visible';
                }
            }
            
            requestAnimationFrame(animate);
        },
        
        // Bounce animation
        bounce: function(element, intensity = 10) {
            element.style.transform = `translateY(-${intensity}px)`;
            
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
            }, 150);
        },
        
        // Pulse animation
        pulse: function(element, scale = 1.1, duration = 300) {
            const originalTransform = element.style.transform;
            element.style.transform = `scale(${scale})`;
            element.style.transition = `transform ${duration}ms ease`;
            
            setTimeout(() => {
                element.style.transform = originalTransform;
            }, duration);
        },
        
        // Shake animation
        shake: function(element, intensity = 10) {
            const originalTransform = element.style.transform;
            let shakeCount = 0;
            const maxShakes = 6;
            
            function shake() {
                if (shakeCount < maxShakes) {
                    const direction = shakeCount % 2 === 0 ? intensity : -intensity;
                    element.style.transform = `translateX(${direction}px)`;
                    shakeCount++;
                    setTimeout(shake, 50);
                } else {
                    element.style.transform = originalTransform;
                }
            }
            
            shake();
        }
    };
    
    // ==================== PAGE LOAD ANIMATIONS ====================
    
    // Animate elements on page load
    function initializePageAnimations() {
        // Animate cards with staggered delay
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                AnimationUtils.fadeIn(card, 600);
                card.style.transform = 'translateY(0)';
                card.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            }, index * 100);
        });
        
        // Animate navigation items
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                AnimationUtils.fadeIn(item, 400);
                item.style.transform = 'translateX(0)';
                item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            }, index * 50);
        });
        
        // Animate hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                AnimationUtils.fadeIn(hero, 800);
                hero.style.transform = 'scale(1)';
                hero.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            }, 200);
        }
    }
    
    // ==================== INTERACTIVE ANIMATIONS ====================
    
    // Add hover animations to buttons
    function addButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Hover effect
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                this.style.transition = 'all 0.3s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
            
            // Click effect
            button.addEventListener('click', function() {
                AnimationUtils.pulse(this, 0.95, 150);
            });
        });
    }
    
    // Add card hover animations
    function addCardAnimations() {
        const cards = document.querySelectorAll('.card, .news-item, .news-article-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Add image hover animations
    function addImageAnimations() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    
    // Animate elements when they come into view
    function addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add different animations based on element type
                    if (element.classList.contains('card')) {
                        AnimationUtils.fadeIn(element, 600);
                        element.style.transform = 'translateY(0)';
                    } else if (element.classList.contains('news-item')) {
                        AnimationUtils.slideDown(element, 500);
                    } else {
                        AnimationUtils.fadeIn(element, 400);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const elementsToAnimate = document.querySelectorAll('.card, .news-item, .news-article-item, .accordion-item');
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }
    
    // ==================== FORM ANIMATIONS ====================
    
    // Add form field animations
    function addFormAnimations() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // Focus animation
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 0 3px rgba(13, 110, 253, 0.25)';
                this.style.transition = 'all 0.3s ease';
            });
            
            // Blur animation
            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
            
            // Validation animation
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    AnimationUtils.shake(this, 5);
                }
            });
        });
    }
    
    // ==================== LOADING ANIMATIONS ====================
    
    // Create loading spinner
    function createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
        spinner.style.display = 'none';
        spinner.style.position = 'fixed';
        spinner.style.top = '50%';
        spinner.style.left = '50%';
        spinner.style.transform = 'translate(-50%, -50%)';
        spinner.style.zIndex = '9999';
        spinner.style.background = 'rgba(255,255,255,0.9)';
        spinner.style.padding = '20px';
        spinner.style.borderRadius = '10px';
        
        document.body.appendChild(spinner);
        
        return spinner;
    }
    
    // Show loading animation
    function showLoading() {
        const spinner = document.querySelector('.loading-spinner') || createLoadingSpinner();
        AnimationUtils.fadeIn(spinner, 300);
    }
    
    // Hide loading animation
    function hideLoading() {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            AnimationUtils.fadeOut(spinner, 300);
        }
    }
    
    // ==================== NOTIFICATION ANIMATIONS ====================
    
    // Create notification system
    function createNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        document.body.appendChild(notificationContainer);
        
        return {
            show: function(message, type = 'info', duration = 3000) {
                const notification = document.createElement('div');
                notification.className = `alert alert-${type} notification`;
                notification.textContent = message;
                notification.style.cssText = `
                    margin-bottom: 10px;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                `;
                
                notificationContainer.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.opacity = '1';
                    notification.style.transform = 'translateX(0)';
                }, 10);
                
                // Auto remove
                setTimeout(() => {
                    AnimationUtils.fadeOut(notification, 300);
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, duration);
            }
        };
    }
    
    // ==================== SPECIAL EFFECTS ====================
    
    // Add particle effect to buttons
    function addParticleEffect() {
        const buttons = document.querySelectorAll('.btn-primary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Create particle
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #fff;
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${x}px;
                    top: ${y}px;
                    z-index: 1000;
                `;
                
                this.style.position = 'relative';
                this.appendChild(particle);
                
                // Animate particle
                particle.style.transition = 'all 0.6s ease';
                particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`;
                particle.style.opacity = '0';
                
                setTimeout(() => {
                    particle.remove();
                }, 600);
            });
        });
    }
    
    // ==================== INITIALIZATION ====================
    
    // Initialize all animations
    function initializeAnimations() {
        // Wait for page to load completely
        setTimeout(() => {
            initializePageAnimations();
            addButtonAnimations();
            addCardAnimations();
            addImageAnimations();
            addScrollAnimations();
            addFormAnimations();
            addParticleEffect();
            
            // Create notification system
            window.notifications = createNotificationSystem();
            
            console.log('Animation system initialized successfully!');
        }, 100);
    }
    
    // Initialize animations
    initializeAnimations();
    
    // ==================== GLOBAL ANIMATION FUNCTIONS ====================
    
    // Make animation utilities globally available
    window.AnimationUtils = AnimationUtils;
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;
});
