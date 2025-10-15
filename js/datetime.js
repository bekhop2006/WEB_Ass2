document.addEventListener('DOMContentLoaded', function() {
    const datetimeElement = document.getElementById('current-datetime');
    
    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        const formattedDateTime = now.toLocaleDateString('en-US', options);
        datetimeElement.textContent = formattedDateTime;
    }
    
    // Обновляем время сразу и каждую секунду
    updateDateTime();
    setInterval(updateDateTime, 1000);
});