document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('subscription-popup');
    const openBtn = document.getElementById('open-popup');
    const closeBtn = document.getElementById('close-popup');
    const popupForm = document.getElementById('popup-form');
    
    // Открытие попапа
    openBtn.addEventListener('click', function() {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие попапа
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие при клике вне попапа
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Обработка формы подписки
    popupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('popup-email').value;
        if (email) {
            alert('Thank you for subscribing!');
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
            popupForm.reset();
        }
    });
});