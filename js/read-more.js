// Read More Functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const article = this.closest('.news-article-item');
            const readMoreContent = article.querySelector('.read-more-content');
            const isExpanded = readMoreContent.style.display !== 'none';
            
            if (isExpanded) {
                // Collapse content
                readMoreContent.style.display = 'none';
                this.textContent = 'Read More';
                this.classList.remove('expanded');
            } else {
                // Expand content
                readMoreContent.style.display = 'block';
                this.textContent = 'Read Less';
                this.classList.add('expanded');
                
                // Add smooth animation
                readMoreContent.style.opacity = '0';
                readMoreContent.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    readMoreContent.style.transition = 'all 0.3s ease';
                    readMoreContent.style.opacity = '1';
                    readMoreContent.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
});
