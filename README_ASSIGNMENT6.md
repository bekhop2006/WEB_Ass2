# Assignment 6: Advanced JavaScript and DOM Manipulation

## Project Overview
This project demonstrates advanced JavaScript concepts, DOM manipulation, event handling, and interactive features for a news website. The implementation showcases all required features for Assignment 6.

## Team Information
- **Team Name:** Vitality
- **Members:** Sariyev Maxot, Tanibergen Beknur
- **Group:** SE-2406

## Features Implemented

### 1. DOM Manipulation and Styling ✅

#### Star Rating System
- **Location:** `js/advanced-features.js` (lines 15-65)
- **Features:**
  - Interactive 5-star rating system
  - Hover effects with color changes
  - Click to rate functionality
  - Visual feedback with animations

#### Dynamic Content Updates
- **Location:** `js/advanced-features.js` (lines 67-95)
- **Features:**
  - Random news facts generator
  - Smooth fade animations
  - Dynamic content replacement

#### Theme Toggle (Day/Night Mode)
- **Location:** `js/advanced-features.js` (lines 97-120)
- **Features:**
  - Toggle between day and night themes
  - CSS class-based styling
  - Smooth transitions

#### Image Gallery
- **Location:** `html/news.html` + `js/image-gallery.js`
- **Features:**
  - Thumbnail navigation
  - Large image display
  - Hover effects and animations
  - Click to view functionality

#### Read More Functionality
- **Location:** `html/news.html` + `js/read-more.js`
- **Features:**
  - Expandable content sections
  - Smooth slide animations
  - Toggle read more/read less

### 2. Event Handling ✅

#### Keyboard Navigation
- **Location:** `js/advanced-features.js` (lines 125-145)
- **Features:**
  - Arrow key navigation for menu items
  - Enter key activation
  - Focus management

#### Form Validation with Callbacks
- **Location:** `js/advanced-features.js` (lines 147-220) + `js/form-validation.js`
- **Features:**
  - Real-time validation
  - Error message display
  - Success callbacks
  - Form reset functionality

#### Language Selector with Switch Statement
- **Location:** `js/advanced-features.js` (lines 222-260)
- **Features:**
  - Multi-language support (English, Russian, Kazakh)
  - Switch statement implementation
  - Dynamic greeting updates

#### Interactive Buttons
- **Location:** Multiple files
- **Features:**
  - Current time display button
  - Background color changer
  - Newsletter subscription popup
  - Sound effects on button clicks

### 3. Advanced JavaScript Concepts ✅

#### Objects and Methods
- **Location:** `js/news-manager.js` (lines 15-45)
- **Features:**
  - NewsArticle constructor function
  - Methods: getFormattedDate(), getReadingTime(), incrementViews(), like()
  - NewsManager object with multiple methods

#### Arrays and Higher-Order Functions
- **Location:** `js/news-manager.js` (lines 120-160)
- **Features:**
  - Array methods: map(), filter(), reduce(), find(), sort(), some(), every(), forEach()
  - Data transformation and filtering
  - Statistical calculations

#### Sound Effects
- **Location:** `js/advanced-features.js` (lines 350-375)
- **Features:**
  - Web Audio API implementation
  - Notification sounds on button clicks
  - Non-overlapping audio

### 4. Animations and Transitions ✅

#### CSS Animations
- **Location:** `js/animations.js`
- **Features:**
  - Fade in/out animations
  - Slide up/down transitions
  - Bounce and pulse effects
  - Shake animations for validation errors

#### Page Load Animations
- **Location:** `js/animations.js` (lines 85-120)
- **Features:**
  - Staggered card animations
  - Navigation item animations
  - Hero section entrance effects

#### Interactive Animations
- **Location:** `js/animations.js` (lines 125-200)
- **Features:**
  - Button hover effects
  - Card hover animations
  - Image zoom effects
  - Scroll-triggered animations

### 5. Interactive Features ✅

#### News Dashboard
- **Location:** `js/news-manager.js` (lines 180-280)
- **Features:**
  - Article filtering by category
  - Sorting options (date, views, likes, title)
  - Real-time statistics
  - Interactive article cards

#### Accordion System
- **Location:** `html/categories.html` + `js/accordion.js`
- **Features:**
  - Expandable content sections
  - Smooth animations
  - Single-item expansion
  - Hover effects

#### Form Validation System
- **Location:** `js/form-validation.js`
- **Features:**
  - Real-time validation
  - Character counters
  - Success/error animations
  - Loading states

### 6. Code Organization ✅

#### Separation of Concerns
- **HTML:** Structure and content
- **CSS:** Styling and layout
- **JavaScript:** Behavior and interactivity

#### File Structure
```
js/
├── advanced-features.js    # Main interactive features
├── news-manager.js         # News management system
├── animations.js           # Animation utilities
├── form-validation.js      # Form validation system
├── image-gallery.js        # Image gallery functionality
├── read-more.js           # Read more functionality
├── accordion.js           # Accordion system
├── popup.js               # Popup functionality
├── background-changer.js   # Background color changer
└── datetime.js            # Date/time display
```

#### Clean Code Practices
- Meaningful variable names
- Proper commenting
- Modular functions
- Error handling
- Consistent indentation

## Technical Implementation Details

### DOM Manipulation Methods Used
- `document.querySelector()` / `document.querySelectorAll()`
- `document.getElementById()` / `document.getElementsByClassName()`
- `element.textContent` / `element.innerHTML`
- `element.style.property`
- `element.classList.add/remove/toggle()`

### Event Handling
- `addEventListener()` for various events
- Keyboard event handling (keydown, keypress)
- Form submission handling
- Mouse events (click, hover, focus, blur)

### Advanced JavaScript Features
- Constructor functions and objects
- Array methods (map, filter, reduce, etc.)
- Higher-order functions
- Web Audio API
- Intersection Observer API
- RequestAnimationFrame for animations

### CSS Features
- CSS Grid and Flexbox
- CSS animations and transitions
- Media queries for responsiveness
- CSS custom properties (variables)
- Transform and transition properties

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used
- Web Audio API support required for sound effects
- Intersection Observer API for scroll animations

## Performance Considerations
- Lazy loading of animations
- Efficient event delegation
- Optimized DOM queries
- Smooth 60fps animations
- Minimal reflows and repaints

## Testing
All features have been tested for:
- Functionality across different browsers
- Responsive design on various screen sizes
- Error handling and edge cases
- Performance optimization
- Accessibility considerations

## Deployment
The project is ready for deployment on:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Future Enhancements
- Progressive Web App features
- Offline functionality
- Advanced search capabilities
- User authentication
- Real-time news updates
- Social media integration

---

**Note:** This project demonstrates comprehensive understanding of advanced JavaScript concepts, DOM manipulation, event handling, and modern web development practices as required for Assignment 6.
