document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // Скрываем контент по умолчанию
        content.style.display = 'none';
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-out';
        
        header.addEventListener('click', function() {
            const isOpen = content.style.display === 'block';
            
            // Закрываем все другие элементы
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherContent.style.display = 'none';
                    otherContent.style.maxHeight = '0';
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            if (isOpen) {
                content.style.display = 'none';
                content.style.maxHeight = '0';
                item.classList.remove('active');
            } else {
                content.style.display = 'block';
                content.style.maxHeight = content.scrollHeight + 'px';
                item.classList.add('active');
            }
        });
    });
});