document.addEventListener('DOMContentLoaded', function() {
    const changeColorBtn = document.getElementById('change-bg-color');
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
    
    changeColorBtn.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[currentColorIndex];
        changeColorBtn.textContent = `Change Color (${currentColorIndex + 1}/${colors.length})`;
    });
});