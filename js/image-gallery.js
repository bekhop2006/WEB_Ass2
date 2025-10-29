// Image Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const displayImage = document.getElementById('gallery-display');
    const caption = document.getElementById('gallery-caption');
    
    if (thumbnails.length > 0 && displayImage && caption) {
        // Add click event listeners to thumbnails
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                const fullImageSrc = this.dataset.full;
                const altText = this.alt;
                
                // Add fade effect
                displayImage.style.opacity = '0.5';
                displayImage.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    displayImage.src = fullImageSrc;
                    displayImage.alt = altText;
                    caption.textContent = `Viewing: ${altText}`;
                    
                    displayImage.style.opacity = '1';
                    displayImage.style.transform = 'scale(1)';
                }, 200);
                
                // Add bounce animation to clicked thumbnail
                this.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
            
            // Add hover effects
            thumbnail.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            });
            
            thumbnail.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
});
