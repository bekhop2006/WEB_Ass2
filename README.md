# 📰 Vitality News  

Welcome to **Vitality News** — a news website designed to provide fast and easy access to the latest information.  

## 🚀 About the Project
Our platform delivers fresh news across different categories: sports, technology, local and global events.  
This project was created for educational purposes and demonstrates basic HTML and CSS skills.  

## 📂 Project Structure
WEB_ASS2/
├── index.html # Homepage
├── styles/
│ └── style.css # Styles
├── html/
│ ├── news.html # News
│ ├── categories.html # Categories
│ ├── about.html # About Us
│ └── contact.html # Contact
└── README.md # Documentation

## ✨ Features
- 🌐 Homepage with a hero section  
- 🗞️ "News" section with the latest articles  
- 📑 Categories for easier navigation  
- ℹ️ "About Us" page with mission and goals  
- 📬 Contact page for feedback  

## 📱 Assignment #4. Media Queries + Bootstrap Grid

Ниже приведены цели задания, правила сдачи, задачи по частям и то, как они реализованы в этом проекте.

### 🎯 Цель (Objective)
Научиться создавать адаптивные веб‑страницы с помощью CSS Media Queries и Bootstrap Grid. В итоге макеты автоматически подстраиваются под разные экраны (мобильный, планшет, десктоп), эффективно используется 12‑колоночная сетка и компоненты Bootstrap для оптимизации стилей, улучшения отзывчивости и UX при чистом и организованном коде.

### 📋 Инструкции (Assignment Instructions)
1. Каждый участник реализует минимум один компонент Bootstrap (navbar, carousel, grid и т.п.) как минимум на двух страницах.
2. Если команда не планирует использовать Bootstrap дальше — сделать копию сайта только для этого задания (в данном проекте Bootstrap уже интегрирован).
3. Все участники сдают работу; имена всех участников указаны в `<footer>` каждой HTML‑страницы (выполнено).

### 📨 Правила сдачи (Rules for Submission)
1. Сдают ВСЕ участники команды.
2. Загружается ZIP проекта и DOCX‑отчёт. Отчёт должен содержать:
   - Название команды, имена участников и группу;
   - Список задач со скриншотами кода и итоговых страниц;
   - Пошаговое описание выполнения каждой задачи;
   - URL развёрнутого сайта.
3. Сдать до дедлайна в `lms.astanait.edu.kz` и защитить на практическом занятии.

### 🧩 Part 1. Media Queries
— Task 1. Responsive Typography
- Реализовано: добавлены медиа‑запросы типографики в `styles/style.css` (mobile/tablet/desktop). Примеры: уменьшаем базовый размер шрифта на мобайле, средний на планшете, крупный на десктопе.

— Task 2. Card group (без Bootstrap)
- Реализовано на `index.html` через CSS media queries:
  - Desktop: три карточки в ряд;
  - Tablet: две карточки в ряд;
  - Mobile: карточки в колонку.

### 🧱 Part 2. Bootstrap
— Task 3. Bootstrap Grid Layout
- Заменены кастомные лэйауты на Bootstrap Grid. Используются `container`/`container-fluid`, `row`, `col-sm`, `col-md`, `col-lg`. Есть секции с двумя колонками (`col-lg-6`) и тремя колонками (`col-lg-4`).

— Task 4. Bootstrap Spacing Utilities
- Отступы заменены на утилиты (`m*`, `p*`, responsive‑варианты: `mt-lg-4`, `px-sm-2` и др.).

— Task 5. Bootstrap Navigation Bar
- На всех страницах — адаптивный `navbar` с `navbar-toggler` (гамбургер на малых экранах), кастомизация через классы Bootstrap.

— Task 6. Bootstrap Buttons
- Все кнопки заменены на классы Bootstrap (`btn`, `btn-primary`, `btn-outline-*`, размеры `btn-lg`, `btn-sm`). Добавлена `btn-group` на странице контактов.

— Task 7. Bootstrap Carousel
- На главной странице добавлена карусель из 9 изображений с индикаторами и контролами, встроена в сетку.

— Task 8. Bootstrap Cards
- Используются карточки/контентные блоки, размещённые в сетке Bootstrap (колонки), кнопки унифицированы стилями Bootstrap.

— Task 9. Responsive Form Design
- Страница контактов: верстка формы на `row/col`, поля `form-control`, применены утилиты отступов.

— Task 10. Accessibility
- Семантические теги (`<nav>`, `<main>`, `<footer>`), хороший контраст (`navbar-dark bg-dark`), ARIA‑атрибуты у тогглера, у карусели — индикаторы и скрытые подписи.

### 🗂 Где именно внесены изменения
- `index.html`: Navbar, контейнер/сетка, утилиты отступов, карусель (9 слайдов), кнопки Bootstrap, карточки в колонках.
- `html/news.html`: Navbar + контейнер, кнопки Bootstrap.
- `html/contact.html`: Navbar + контейнер, форма на `row/col`, `form-control`, `btn-group`.
- `styles/style.css`: медиа‑запросы типографики, изоляция старых стилей навигации от Bootstrap.

### ▶️ Как запустить локально
1. Откройте `index.html` в браузере (сборка не требуется).
2. Убедитесь, что в `images/` есть `p1.svg` … `p9.svg` (присутствуют).

### 🌐 Публикация (Part 3)
- Закоммитьте и запушьте изменения в общий репозиторий.
- Разверните на GitHub Pages или Netlify.
- Приложите URL в отчёт и сдачу.

### ✅ Критерии оценивания (100%)
- Media Queries и адаптив (10%)
- Bootstrap Grid и утилиты отступов (10%)
- Bootstrap Buttons и Navbar (10%)
- Bootstrap Carousel и Cards (10%)
- Дизайн, качество кода и доступность (10%)
- Защита на практике (40%)
- Отчёт (10%)

### 🔗 Ресурсы
- Abitova G.A. Web technologies Front-End Development. Part 1 (2022)
- Видео‑курс: `https://www.youtube.com/playlist?list=PLPT6CF0r4E3rkvy1rLUKdDHfHmWZeURW_`
- Документация Bootstrap 5.3: [getbootstrap.com/docs/5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction)
- Media Queries (W3Schools): `https://www.w3schools.com/css/css_rwd_mediaqueries.asp`
- MDN: Responsive Design: `https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design`

## 👥 Team
- **Sariyev Maxot**  
- **Tanibergen Beknur**  

Group: **SE-2406**  

## ⚙️ Technologies
- **HTML5** — website structure  
- **CSS3** — styling and design  
- **Bootstrap 5** — grid, components, spacing utilities  


---

📌 *Project created in 2025 for educational purposes.*  
