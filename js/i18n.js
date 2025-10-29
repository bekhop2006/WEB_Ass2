// Simple i18n powered by data-i18n attributes
(function(){
    const DICT = {
        en: {
            nav_news: 'News',
            nav_categories: 'Categories',
            nav_about: 'About Us',
            nav_contact: 'Contact',
            hero_title: 'Welcome to Our News Website!',
            hero_sub: 'Stay informed with the latest events.',
            hero_read: 'Read News',
            interactive_title: 'Interactive Features',
            subscribe_btn: 'Subscribe to Newsletter',
            search_placeholder: 'Search articles...',
            clear_search: 'Clear',
            latest_news: 'Latest News',
            footer_rights: 'All rights reserved.',
            footer_team: 'Team: Vitality | Members: Sariyev Maxot, Tanibergen Beknur | Group: SE-2406',
            stats_users: 'Users',
            stats_articles: 'Articles',
            stats_categories: 'Categories',
            news_page_title: 'News Page',
            news_page_desc: 'All news will be displayed here. Below are some of our latest articles:',
            subscribe_now: 'Subscribe Now',
            subscribe_title: 'Subscribe to Our Newsletter',
            subscribe_email: 'Email Address',
            subscribe_submit: 'Subscribe',
            about_title: 'About Us',
            about_mission: 'Our Mission',
            about_team: 'Our Team',
            about_values: 'Our Values',
            copy_title: 'Copy to Clipboard Demo',
            copy_button: 'Copy',
            categories_title: 'News Categories',
            categories_desc: 'News categories will be displayed here. Explore different topics below:',
            contact_title: 'Contact Us',
            contact_desc: 'You can find our contact information on this page. Feel free to reach out to us!',
            form_name: 'Name',
            form_email: 'Email',
            form_subject: 'Subject',
            form_message: 'Message',
            form_send: 'Send Message',
            form_reset: 'Reset'
        },
        ru: {
            nav_news: 'Новости',
            nav_categories: 'Категории',
            nav_about: 'О нас',
            nav_contact: 'Контакты',
            hero_title: 'Добро пожаловать на наш новостной сайт!',
            hero_sub: 'Будьте в курсе последних событий.',
            hero_read: 'Читать новости',
            interactive_title: 'Интерактивные функции',
            subscribe_btn: 'Подписаться на рассылку',
            search_placeholder: 'Поиск статей...',
            clear_search: 'Очистить',
            latest_news: 'Последние новости',
            footer_rights: 'Все права защищены.',
            footer_team: 'Команда: Vitality | Участники: Сариев Махсат, Таниберген Бекнур | Группа: SE-2406',
            stats_users: 'Пользователи',
            stats_articles: 'Статьи',
            stats_categories: 'Категории',
            news_page_title: 'Страница новостей',
            news_page_desc: 'Здесь отображаются все новости. Ниже представлены некоторые из последних статей:',
            subscribe_now: 'Подписаться',
            subscribe_title: 'Подписка на рассылку',
            subscribe_email: 'Адрес электронной почты',
            subscribe_submit: 'Подписаться',
            about_title: 'О нас',
            about_mission: 'Наша миссия',
            about_team: 'Наша команда',
            about_values: 'Наши ценности',
            copy_title: 'Копирование в буфер обмена',
            copy_button: 'Копировать',
            categories_title: 'Категории новостей',
            categories_desc: 'Здесь отображаются категории новостей. Исследуйте темы ниже:',
            contact_title: 'Свяжитесь с нами',
            contact_desc: 'Контактная информация на этой странице. Мы всегда на связи!',
            form_name: 'Имя',
            form_email: 'Эл. почта',
            form_subject: 'Тема',
            form_message: 'Сообщение',
            form_send: 'Отправить сообщение',
            form_reset: 'Сбросить'
        },
        kz: {
            nav_news: 'Жаңалықтар',
            nav_categories: 'Санаттар',
            nav_about: 'Біз туралы',
            nav_contact: 'Байланыс',
            hero_title: 'Жаңалықтар сайтымызға қош келдіңіз!',
            hero_sub: 'Соңғы оқиғалардан хабардар болыңыз.',
            hero_read: 'Жаңалықтарды оқу',
            interactive_title: 'Интерактивті мүмкіндіктер',
            subscribe_btn: 'Жаңалықтарға жазылу',
            search_placeholder: 'Мақалаларды іздеу...',
            clear_search: 'Тазарту',
            latest_news: 'Соңғы жаңалықтар',
            footer_rights: 'Барлық құқықтар қорғалған.',
            footer_team: 'Топ: Vitality | Қатысушылар: Сariyev Махсат, Таниберген Бекнұр | Топ: SE-2406',
            stats_users: 'Пайдаланушылар',
            stats_articles: 'Мақалалар',
            stats_categories: 'Санаттар',
            news_page_title: 'Жаңалықтар беті',
            news_page_desc: 'Мұнда барлық жаңалықтар көрсетіледі. Төменде соңғы мақалалар:',
            subscribe_now: 'Жазылу',
            subscribe_title: 'Жаңалықтарға жазылу',
            subscribe_email: 'Электрондық пошта',
            subscribe_submit: 'Жазылу',
            about_title: 'Біз туралы',
            about_mission: 'Біздің міндетіміз',
            about_team: 'Біздің команда',
            about_values: 'Құндылықтарымыз',
            copy_title: 'Буферге көшіру',
            copy_button: 'Көшіру',
            categories_title: 'Жаңалықтар санаттары',
            categories_desc: 'Жаңалықтар санаттары осында. Тақырыптарды зерттеңіз:',
            contact_title: 'Бізбен байланысыңыз',
            contact_desc: 'Байланыс ақпараты осы бетте. Біз әрқашан байланыстамыз!',
            form_name: 'Аты-жөні',
            form_email: 'Эл. пошта',
            form_subject: 'Тақырыбы',
            form_message: 'Хабарлама',
            form_send: 'Хабарлама жіберу',
            form_reset: 'Тазарту'
        }
    };

    function applyI18n(lang){
        const dict = DICT[lang] || DICT.en;
        // text nodes
        $('[data-i18n]').each(function(){
            const key = $(this).data('i18n');
            if(dict[key]) $(this).text(dict[key]);
        });
        // placeholders
        $('[data-i18n-placeholder]').each(function(){
            const key = $(this).data('i18n-placeholder');
            if(dict[key]) $(this).attr('placeholder', dict[key]);
        });
        // aria-labels or titles if ever needed later
    }

    function setLang(lang){
        localStorage.setItem('lang', lang);
        $('.language-btn').removeClass('active');
        $('.language-btn[data-lang="'+lang+'"]').addClass('active');
        applyI18n(lang);
    }

    $(document).ready(function(){
        const saved = localStorage.getItem('lang') || 'en';
        setLang(saved);
        $(document).on('click', '.language-btn', function(){
            setLang($(this).data('lang'));
        });
    });
})();


