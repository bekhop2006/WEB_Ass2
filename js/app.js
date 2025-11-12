// App.js - All features in one file

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle-navbar');
let isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) document.body.classList.add('dark-theme');
if (themeToggleBtn) {
    themeToggleBtn.innerHTML = isDarkMode ? '☀️ Day Mode' : '🌙 Night Mode';
    themeToggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
        themeToggleBtn.innerHTML = isDarkMode ? '☀️ Day Mode' : '🌙 Night Mode';
    });
}

// i18n (full, with placeholders)
const DICT = { /* Твой полный словарь, добавь для placeholders: en: { subscribe_email_placeholder: 'Enter your email' }, ru: {...}, kz: {...} */ };
function applyI18n(lang) {
    const dict = DICT[lang] || DICT.en;
    $('[data-i18n]').each(function() { $(this).text(dict[$(this).data('i18n')]); });
    $('[data-i18n-placeholder]').each(function() { $(this).attr('placeholder', dict[$(this).data('i18n-placeholder')]); });
}
const savedLang = localStorage.getItem('lang') || 'en';
applyI18n(savedLang);
$('.language-btn').click(function() {
    const lang = $(this).data('lang');
    localStorage.setItem('lang', lang);
    $('.language-btn').removeClass('active');
    $(this).addClass('active');
    applyI18n(lang);
});

// Scroll Progress
$(window).on('scroll resize', () => {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $('#scroll-progress .bar').css('width', progress + '%');
});

// Toast Helper
function showToast(message, duration = 2500) {
    const $toast = $('<div class="toast-item"></div>').text(message);
    $('#toast-container').append($toast);
    setTimeout(() => $toast.fadeOut(400, () => $toast.remove()), duration);
}

// News Search (from jquery-features)
if ($('#news-search').length) {
    const $articles = $('.news-article-item');
    const titles = $articles.map(function() { return $(this).find('h2').text().trim(); }).get();
    $('#news-search').on('input', function() {
        const term = $(this).val().trim();
        filterList(term);
        buildSuggestions(term);
        clearHighlights();
        highlight(term);
    });
    // ... (остальной код поиска из твоего jquery-features.js, без console.log)
}

// Accordion (from accordion.js)
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.accordion-content').style.display = 'none';
            }
        });
        if (!isActive) {
            item.classList.add('active');
            content.style.display = 'block';
            // Simple fade
            content.style.opacity = '0';
            setTimeout(() => content.style.opacity = '1', 10);
        } else {
            item.classList.remove('active');
            content.style.display = 'none';
        }
    });
});

// DateTime (from datetime.js)
const datetimeElement = document.getElementById('current-datetime');
function updateDateTime() {
    const now = new Date();
    datetimeElement.textContent = now.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
updateDateTime();
setInterval(updateDateTime, 60000); // Every minute, not second

// Form Validation (unified from form-validation.js and popup.js)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        // Simple validation example
        const email = form.querySelector('input[type="email"]');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showToast('Invalid email', 3000);
            valid = false;
        }
        if (valid) {
            showToast('Submitted successfully!');
            form.reset();
        }
    });
});

// Image Gallery (from image-gallery.js)
const thumbnails = document.querySelectorAll('.gallery-thumbnail');
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const display = document.getElementById('gallery-display');
        display.src = thumb.dataset.full;
    });
});

// Read More (from read-more.js, fixed class)
$('.read-more-btn').click(function() {
    const content = $(this).closest('.news-article-item').find('.read-more-content');
    content.toggle();
    $(this).text(content.is(':visible') ? 'Read Less' : 'Read More');
});

// News Manager (from news-manager.js, simplified)
const NewsManager = {
    articles: [ /* Твои статьи */ ],
    renderNews: function() {
        const container = $('.news-articles');
        this.articles.forEach(article => {
            container.append(`
                <div class="news-article-item" data-aos="fade-up">
                    <h2>${article.title}</h2>
                    <p>${article.content.substring(0, 100)}...</p>
                    <button class="read-more-btn">Read More</button>
                    <div class="read-more-content" style="display:none;">${article.content}</div>
                </div>
            `);
        });
    }
};
NewsManager.renderNews();

// Infinite Scroll for News
let page = 1;
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && page < 3) { // Limit to 2 loads
        page++;
        // Simulate load more
        showToast('Loading more news...');
        setTimeout(() => NewsManager.renderNews(), 1000); // Add more articles
    }
});

// Popup (from popup.js, simplified)
const popup = document.getElementById('subscription-popup');
$('#open-popup, #open-popup-news').click(() => popup.style.display = 'flex');
$('#close-popup').click(() => popup.style.display = 'none');

// Lazy Images (native)
$('img.lazy').each(function() { this.loading = 'lazy'; });