// Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');
        
        // Initially hide all content
        content.style.display = 'none';
        
        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.display = 'none';
                    otherItem.querySelector('.accordion-icon').textContent = '+';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                content.style.display = 'none';
                icon.textContent = '+';
            } else {
                item.classList.add('active');
                content.style.display = 'block';
                icon.textContent = '−';
                
                // Add smooth animation
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    content.style.transition = 'all 0.3s ease';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 10);
            }
        });
        
        // Add hover effects
        header.addEventListener('mouseenter', function() {
            if (!item.classList.contains('active')) {
                header.style.backgroundColor = '#e9ecef';
            }
        });
        
        header.addEventListener('mouseleave', function() {
            if (!item.classList.contains('active')) {
                header.style.backgroundColor = '#f8f9fa';
            }
        });
    });
});