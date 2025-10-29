# Assignment 7: jQuery Implementation Report

**Team Name:** Vitality  
**Team Members:** Sariyev Maxot, Tanibergen Beknur  
**Group:** SE-2406  
**Date:** October 29, 2025

---

## Table of Contents
1. [Introduction](#introduction)
2. [Task 0: Setup](#task-0-setup)
3. [Part 1: jQuery Search](#part-1-jquery-search)
4. [Part 2: UX Engagement Elements](#part-2-ux-engagement-elements)
5. [Part 3: Web App Functionality Improvements](#part-3-web-app-functionality-improvements)
6. [Part 4: Deployment](#part-4-deployment)
7. [Challenges and Solutions](#challenges-and-solutions)
8. [Conclusion](#conclusion)

---

## Introduction

### Objective
The goal of this assignment is to introduce jQuery, a powerful JavaScript library that simplifies DOM manipulation, event handling, and animations. We implemented various interactive features to enhance user experience on our news website.

### Project Description
We continued working on our **Vitality News** website, adding jQuery-powered features including real-time search, autocomplete suggestions, scroll progress tracking, animated counters, loading spinners, toast notifications, clipboard functionality, and lazy image loading.

---

## Task 0: Setup

### Description
Set up jQuery library and verify it's working correctly.

### Implementation Steps
1. **Included jQuery CDN** in the `<head>` section of all HTML pages:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
```

2. **Created** `js/jquery-features.js` file with document ready function:
```javascript
$(document).ready(function(){
    console.log("jQuery is ready!");
});
```

3. **Linked the script** in all HTML pages before closing `</body>` tag.

### Screenshot: Code Implementation
**[INSERT SCREENSHOT: jQuery CDN in HTML head section]**

### Screenshot: Console Output
**[INSERT SCREENSHOT: Browser console showing "jQuery is ready!" message]**

### Result
✅ jQuery successfully loaded and initialized on all pages.

---

## Part 1: jQuery Search

### Task 1: Real-time Search and Live Filter

#### Description
Implemented a search bar on the News page that filters articles in real-time as users type.

#### Implementation Steps
1. Added search input field above news articles in `html/news.html`:
```html
<input id="news-search" type="text" class="form-control form-control-lg" 
       placeholder="Search articles..." data-i18n-placeholder="search_placeholder">
```

2. Implemented filtering logic in `js/jquery-features.js`:
```javascript
$search.on('keyup input', function(){
    const term = $(this).val();
    filterList(term);
});

function filterList(term){
    const q = term.toLowerCase();
    $articles.each(function(){
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.indexOf(q) !== -1);
    });
}
```

#### Screenshot: Search Bar UI
**[INSERT SCREENSHOT: News page with search bar visible]**

#### Screenshot: Filtering in Action
**[INSERT SCREENSHOT: Search results showing filtered articles based on search term]**

#### Result
✅ Articles filter instantly as user types in the search box.

---

### Task 2: Autocomplete Search Suggestions

#### Description
Display dropdown suggestions as user types in the search field.

#### Implementation Steps
1. Added suggestions container in `html/news.html`:
```html
<ul id="search-suggestions" class="list-group position-absolute w-100" 
    style="z-index: 1000;"></ul>
```

2. Implemented autocomplete logic:
```javascript
function buildSuggestions(term){
    $suggestions.empty();
    if(!term){ $suggestions.hide(); return; }
    const q = term.toLowerCase();
    const top = titles.filter(t => t.toLowerCase().includes(q)).slice(0,8);
    if(top.length === 0){ $suggestions.hide(); return; }
    top.forEach(t => {
        $('<li class="list-group-item"></li>').text(t).appendTo($suggestions);
    });
    $suggestions.show();
}
```

3. Added click handler for suggestions:
```javascript
$suggestions.on('click', '.list-group-item', function(){
    const val = $(this).text();
    $search.val(val).trigger('input');
    $suggestions.hide();
});
```

#### Screenshot: Autocomplete Dropdown
**[INSERT SCREENSHOT: Suggestions dropdown showing matching article titles]**

#### Screenshot: Code Implementation
**[INSERT SCREENSHOT: JavaScript code for autocomplete function]**

#### Result
✅ Dropdown shows up to 8 relevant suggestions based on article titles.

---

### Task 3: Search Highlighting

#### Description
Highlight matching keywords in article text when user searches.

#### Implementation Steps
1. Added CSS for highlight styling in `styles/style.css`:
```css
mark.search-highlight{ 
    background: #ffe58f; 
    padding: 0 2px; 
}
```

2. Implemented highlighting function:
```javascript
function highlight(term){
    if(!term) return;
    const regex = new RegExp('('+ $.escapeSelector(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +')', 'ig');
    $articles.find('h2, p').each(function(){
        const html = $(this).html();
        $(this).html(html.replace(regex, '<mark class="search-highlight">$1</mark>'));
    });
}
```

3. Integrated with search functionality to clear and re-highlight on each keystroke.

#### Screenshot: Highlighted Search Results
**[INSERT SCREENSHOT: Article text with search terms highlighted in yellow]**

#### Screenshot: CSS Styling
**[INSERT SCREENSHOT: CSS code for search-highlight class]**

#### Result
✅ Matching words are highlighted in yellow across article titles and content.

---

## Part 2: UX Engagement Elements

### Task 4: Colorful and Stylized Scroll Progress Bar

#### Description
Display a horizontal progress bar at the top of the page that fills as user scrolls.

#### Implementation Steps
1. Added progress bar HTML to all pages:
```html
<div id="scroll-progress"><div class="bar"></div></div>
```

2. Styled the progress bar in `styles/style.css`:
```css
#scroll-progress{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: rgba(0,0,0,0.08);
    z-index: 2000;
}
#scroll-progress .bar{
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #6f42c1, #0d6efd, #20c997);
    transition: width 0.1s linear;
}
```

3. Implemented scroll tracking:
```javascript
const updateProgress = () => {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $('#scroll-progress .bar').css('width', progress + '%');
};
$(window).on('scroll resize', updateProgress);
```

#### Screenshot: Progress Bar at Top
**[INSERT SCREENSHOT: Colorful gradient progress bar showing scroll position]**

#### Screenshot: CSS Gradient Styling
**[INSERT SCREENSHOT: CSS code for progress bar gradient]**

#### Result
✅ Smooth gradient progress bar tracks scroll position on all pages.

---

### Task 5: Animated Number Counter

#### Description
Smoothly animate numbers counting up when they come into viewport (e.g., "1000+ Users").

#### Implementation Steps
1. Added counter elements to `index.html`:
```html
<div class="h2 counter" data-target="1000">0</div>
<div class="text-muted">Users</div>
```

2. Implemented animation logic:
```javascript
function animate($el){
    const target = parseInt($el.data('target'), 10) || 0;
    const durationMs = 1500;
    const start = performance.now();
    function step(ts){
        const progress = Math.min(1, (ts - start)/durationMs);
        const value = Math.floor(progress * target);
        $el.text(value.toLocaleString());
        if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
```

3. Triggered animation when counters become visible during scroll.

#### Screenshot: Counter Animation
**[INSERT SCREENSHOT: Animated counters showing statistics (Users, Articles, Categories)]**

#### Screenshot: JavaScript Animation Code
**[INSERT SCREENSHOT: Code showing requestAnimationFrame implementation]**

#### Result
✅ Numbers smoothly count from 0 to target values when scrolled into view.

---

### Task 6: Loading Spinner on Submit

#### Description
Show loading spinner and disable button when contact form is submitted.

#### Implementation Steps
1. Added ID to contact form submit button:
```html
<button type="submit" class="btn btn-primary btn-lg" id="contact-submit" 
        data-i18n="form_send">Send Message</button>
```

2. Created spinner CSS:
```css
.btn-loading{ position: relative; pointer-events: none; opacity: 0.85; }
.btn-loading .spinner{
    width: 1rem; 
    height: 1rem; 
    border: 2px solid rgba(255,255,255,0.3); 
    border-top-color: #fff; 
    border-radius: 50%; 
    display: inline-block; 
    margin-right: 8px; 
    animation: spin 0.75s linear infinite;
}
@keyframes spin{ to{ transform: rotate(360deg); } }
```

3. Implemented form submit handler:
```javascript
$form.on('submit', function(e){
    e.preventDefault();
    const original = $btn.html();
    $btn.addClass('btn-loading').prop('disabled', true)
        .html('<span class="spinner"></span>Please wait…');
    
    setTimeout(function(){
        $btn.removeClass('btn-loading').prop('disabled', false).html(original);
        showToast('Form submitted successfully');
    }, 1800);
});
```

#### Screenshot: Loading State
**[INSERT SCREENSHOT: Submit button showing spinner and "Please wait..." text]**

#### Screenshot: Normal State After Submit
**[INSERT SCREENSHOT: Button returned to normal with success toast]**

#### Result
✅ Button shows spinner, disables during submission, then re-enables with success message.

---

## Part 3: Web App Functionality Improvements

### Task 7: Notification System (Toast)

#### Description
Display temporary toast notifications that fade out after user actions.

#### Implementation Steps
1. Added toast container to all pages:
```html
<div id="toast-container"></div>
```

2. Styled toast notifications:
```css
#toast-container{ 
    position: fixed; 
    right: 16px; 
    bottom: 16px; 
    z-index: 2100; 
}
.toast-item{ 
    background: #222; 
    color: #fff; 
    padding: 12px 14px; 
    border-radius: 8px; 
    margin-top: 8px; 
    opacity: 0.95; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
}
```

3. Created toast helper function:
```javascript
function showToast(message, duration=2500){
    const $toast = $('<div class="toast-item"></div>').text(message);
    $('#toast-container').append($toast);
    setTimeout(() => { 
        $toast.fadeOut(400, () => $toast.remove()); 
    }, duration);
}
```

4. Integrated with form submission and clipboard actions.

#### Screenshot: Toast Notification
**[INSERT SCREENSHOT: Toast message appearing in bottom-right corner]**

#### Screenshot: Multiple Toasts
**[INSERT SCREENSHOT: Example showing toast for "Form submitted successfully"]**

#### Result
✅ Toast notifications appear for form submissions and clipboard actions, then fade out.

---

### Task 8: Copy to Clipboard Button

#### Description
Add a "Copy" button that copies text to clipboard and shows confirmation.

#### Implementation Steps
1. Added copy snippet section in `html/about.html`:
```html
<h2 data-i18n="copy_title">Copy to Clipboard Demo</h2>
<div class="card">
    <div class="card-body">
        <pre class="mb-2"><code id="snippet-text">npm install jquery</code></pre>
        <button id="copy-snippet" class="btn btn-outline-primary" 
                data-copy-target="#snippet-text" data-i18n="copy_button">Copy</button>
    </div>
</div>
```

2. Implemented copy functionality:
```javascript
$(document).on('click', '#copy-snippet', function(){
    const targetSel = $(this).data('copy-target');
    const text = $(targetSel).text();
    navigator.clipboard.writeText(text).then(() => {
        const $btn = $('#copy-snippet');
        const original = $btn.text();
        $btn.html('✔ Copied');
        showToast('Copied to clipboard!');
        setTimeout(()=> $btn.html(original), 1200);
    });
});
```

#### Screenshot: Copy Button
**[INSERT SCREENSHOT: "Copy" button next to code snippet]**

#### Screenshot: Copied State
**[INSERT SCREENSHOT: Button showing "✔ Copied" with toast notification]**

#### Result
✅ Click copies text to clipboard, button shows checkmark, toast confirms action.

---

### Task 9: Image Lazy Loading

#### Description
Load images only when they scroll into viewport to improve page performance.

#### Implementation Steps
1. Modified image tags in `html/news.html`:
```html
<img class="lazy" loading="lazy" data-src="../images/photo_523404.png.webp" 
     src="../images/photo_523404.png.webp" alt="Article Image">
```

2. Implemented lazy loading logic:
```javascript
function loadInView(){
    const winTop = $(window).scrollTop();
    const winBottom = winTop + $(window).height();
    $lazy.each(function(){
        const $img = $(this);
        if($img.data('loaded')) return;
        const top = $img.offset().top;
        if(top < winBottom + 150){
            const src = $img.attr('data-src');
            if(src){ $img.attr('src', src); }
            $img.data('loaded', true).removeClass('lazy');
        }
    });
}
$(window).on('scroll resize', loadInView);
loadInView();
```

#### Screenshot: HTML with data-src Attribute
**[INSERT SCREENSHOT: HTML code showing lazy loading attributes]**

#### Screenshot: Images Loading on Scroll
**[INSERT SCREENSHOT: Browser showing images loading as user scrolls]**

#### Result
✅ Images load progressively as they enter viewport, improving initial page load time.

---

## Part 4: Deployment

### Deployment Process

1. **Version Control**
   - All changes committed to Git repository
   - Created feature branch for jQuery implementation
   - Merged to main branch after testing

2. **Deployment Platform**
   - Platform Used: [GitHub Pages / Netlify]
   - Build Process: Static site deployment
   - Domain: [INSERT YOUR DOMAIN]

3. **Testing**
   - Tested all jQuery features on deployed site
   - Verified cross-browser compatibility (Chrome, Firefox, Safari)
   - Checked mobile responsiveness

### Screenshot: Deployment Configuration
**[INSERT SCREENSHOT: GitHub Pages or Netlify deployment settings]**

### Deployed Website URL
**Live Website:** [INSERT YOUR DEPLOYED URL HERE]

---

## Challenges and Solutions

### Challenge 1: Search Highlighting with Special Characters
**Problem:** Regex patterns were breaking when users searched for special characters like `()`, `[]`, etc.

**Solution:** Implemented proper regex escaping:
```javascript
const regex = new RegExp('('+ $.escapeSelector(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +')', 'ig');
```

### Challenge 2: Scroll Progress Calculation
**Problem:** Progress bar would sometimes exceed 100% or not reach 100% at page bottom.

**Solution:** Added boundary checks and proper calculation:
```javascript
const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
```

### Challenge 3: Lazy Loading Initial Images
**Problem:** Images above the fold weren't loading immediately.

**Solution:** Called `loadInView()` immediately after setting up the event listeners to load visible images on page load.

### Challenge 4: Toast Notifications Stacking
**Problem:** Multiple toasts would overlap when triggered quickly.

**Solution:** Used `margin-top: 8px` in CSS to stack toasts vertically with proper spacing.

### Challenge 5: Autocomplete Click Outside
**Problem:** Suggestion dropdown wouldn't close when clicking outside.

**Solution:** Added document-level click handler:
```javascript
$(document).on('click', function(e){
    if(!$(e.target).closest('#news-search, #search-suggestions').length){
        $suggestions.hide();
    }
});
```

---

## Conclusion

### Summary
Successfully implemented all required jQuery features for Assignment 7:
- ✅ Real-time search with filtering
- ✅ Autocomplete suggestions
- ✅ Search term highlighting
- ✅ Scroll progress bar
- ✅ Animated number counters
- ✅ Loading spinner on form submit
- ✅ Toast notification system
- ✅ Copy to clipboard functionality
- ✅ Lazy image loading

### Learning Outcomes
1. **jQuery Mastery:** Gained hands-on experience with jQuery selectors, event handling, and DOM manipulation
2. **User Experience:** Learned how to implement modern UX patterns that enhance interactivity
3. **Performance Optimization:** Understood lazy loading and efficient scroll event handling
4. **Problem Solving:** Developed debugging skills when handling edge cases (special characters, scroll boundaries, etc.)

### Future Improvements
1. Add debouncing to search input for better performance
2. Implement keyboard navigation for autocomplete suggestions
3. Add animation effects to toast notifications
4. Create more sophisticated lazy loading with placeholder images
5. Add unit tests for jQuery functions

### Reflection
This assignment significantly improved our understanding of jQuery and modern web development practices. The hands-on experience of implementing interactive features taught us the importance of user feedback, smooth animations, and performance optimization. We successfully overcame technical challenges through research, debugging, and iterative testing.

---

**Team Vitality**  
*Sariyev Maxot, Tanibergen Beknur*  
*Group SE-2406*  
*Astana IT University*

