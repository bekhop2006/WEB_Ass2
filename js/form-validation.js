document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Создаем контейнер для ошибок
    function createErrorContainer(input) {
        let errorContainer = input.parentNode.querySelector('.error-message');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'error-message text-danger mt-1';
            input.parentNode.appendChild(errorContainer);
        }
        return errorContainer;
    }
    
    // Валидация email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Валидация имени
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    // Валидация сообщения
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Валидация имени
        if (!validateName(nameInput.value)) {
            const errorContainer = createErrorContainer(nameInput);
            errorContainer.textContent = 'Name must be at least 2 characters long';
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
            const errorContainer = nameInput.parentNode.querySelector('.error-message');
            if (errorContainer) errorContainer.remove();
        }
        
        // Валидация email
        if (!validateEmail(emailInput.value)) {
            const errorContainer = createErrorContainer(emailInput);
            errorContainer.textContent = 'Please enter a valid email address';
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            const errorContainer = emailInput.parentNode.querySelector('.error-message');
            if (errorContainer) errorContainer.remove();
        }
        
        // Валидация сообщения
        if (!validateMessage(messageInput.value)) {
            const errorContainer = createErrorContainer(messageInput);
            errorContainer.textContent = 'Message must be at least 10 characters long';
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
            const errorContainer = messageInput.parentNode.querySelector('.error-message');
            if (errorContainer) errorContainer.remove();
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });
});