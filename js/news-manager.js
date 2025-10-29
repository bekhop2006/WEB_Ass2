// Advanced JavaScript Concepts - News Management System
// Demonstrates Objects, Arrays, Higher-Order Functions, and Advanced Features

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== OBJECTS AND METHODS ====================
    
    // News Article Constructor
    function NewsArticle(id, title, content, category, author, publishDate, views = 0, likes = 0) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.publishDate = new Date(publishDate);
        this.views = views;
        this.likes = likes;
        this.isPublished = true;
        
        // Method to get formatted date
        this.getFormattedDate = function() {
            return this.publishDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };
        
        // Method to get reading time estimate
        this.getReadingTime = function() {
            const wordsPerMinute = 200;
            const wordCount = this.content.split(' ').length;
            return Math.ceil(wordCount / wordsPerMinute);
        };
        
        // Method to increment views
        this.incrementViews = function() {
            this.views++;
            return this.views;
        };
        
        // Method to like article
        this.like = function() {
            this.likes++;
            return this.likes;
        };
    }
    
    // News Manager Object with Methods
    const NewsManager = {
        articles: [],
        categories: ['Sports', 'Technology', 'Politics', 'Business', 'Health', 'Entertainment'],
        authors: ['Sariyev Maxot', 'Tanibergen Beknur', 'John Doe', 'Jane Smith'],
        
        // Initialize with sample data
        initialize: function() {
            this.articles = [
                new NewsArticle(1, 'Kairat vs Real Madrid: Ticket Sales Begin', 
                    'The long-awaited ticket sales for the Champions League match between Almaty\'s "Kairat" and Madrid\'s "Real" officially began today. Even before the system opened, it was expected that the interest would be enormous: tens of thousands of fans were preparing to join the virtual queue in hopes of securing the coveted tickets.', 
                    'Sports', 'Sariyev Maxot', '2025-09-22', 1250, 89),
                new NewsArticle(2, 'Police Department Leadership Changes', 
                    'According to the Ministry of Internal Affairs, Malybayev submitted his resignation report and was relieved of his post by order of the Minister of Internal Affairs. It is noted that Bakytzhan Malybayev was appointed to the position in September 2024.', 
                    'Politics', 'Beknur Tanibergen', '2025-09-23', 890, 45),
                new NewsArticle(3, 'AI Startup Raises $16M in Funding', 
                    'Higgsfield is a generative artificial intelligence model that creates videos based on text queries. The startup has raised $16 million in investment from renowned Silicon Valley venture capital firms. It currently competes directly with products from major tech giants like Open AI and Google.', 
                    'Technology', 'Tanibergen Beknur', '2025-09-20', 2100, 156),
                new NewsArticle(4, 'New Medical Breakthrough in Cancer Treatment', 
                    'Scientists have discovered a revolutionary new approach to cancer treatment that shows promising results in early clinical trials. The new therapy targets specific cancer cells while leaving healthy cells unharmed.', 
                    'Health', 'Dr. Sarah Johnson', '2025-09-21', 3200, 234),
                new NewsArticle(5, 'Stock Market Reaches New Heights', 
                    'The stock market has reached unprecedented levels this week, with major indices showing strong gains across all sectors. Analysts attribute this growth to positive economic indicators and strong corporate earnings.', 
                    'Business', 'Financial Reporter', '2025-09-19', 1800, 78)
            ];
        },
        
        // Get all articles
        getAllArticles: function() {
            return this.articles;
        },
        
        // Get article by ID
        getArticleById: function(id) {
            return this.articles.find(article => article.id === id);
        },
        
        // Get articles by category
        getArticlesByCategory: function(category) {
            return this.articles.filter(article => article.category === category);
        },
        
        // Get articles by author
        getArticlesByAuthor: function(author) {
            return this.articles.filter(article => article.author === author);
        },
        
        // Get most popular articles
        getMostPopularArticles: function(limit = 5) {
            return this.articles
                .sort((a, b) => b.views - a.views)
                .slice(0, limit);
        },
        
        // Get most liked articles
        getMostLikedArticles: function(limit = 5) {
            return this.articles
                .sort((a, b) => b.likes - a.likes)
                .slice(0, limit);
        },
        
        // Add new article
        addArticle: function(title, content, category, author) {
            const newId = Math.max(...this.articles.map(a => a.id)) + 1;
            const newArticle = new NewsArticle(newId, title, content, category, author, new Date().toISOString());
            this.articles.push(newArticle);
            return newArticle;
        },
        
        // Get category statistics
        getCategoryStats: function() {
            return this.categories.map(category => {
                const articles = this.getArticlesByCategory(category);
                return {
                    category: category,
                    count: articles.length,
                    totalViews: articles.reduce((sum, article) => sum + article.views, 0),
                    totalLikes: articles.reduce((sum, article) => sum + article.likes, 0)
                };
            });
        }
    };
    
    // ==================== ARRAYS AND HIGHER-ORDER FUNCTIONS ====================
    
    // Initialize the news manager
    NewsManager.initialize();
    
    // Demonstrate array methods and higher-order functions
    function demonstrateArrayMethods() {
        console.log('=== Array Methods and Higher-Order Functions Demo ===');
        
        // Map - Transform articles to display format
        const articleTitles = NewsManager.articles.map(article => ({
            id: article.id,
            title: article.title,
            category: article.category,
            readingTime: article.getReadingTime()
        }));
        console.log('Article titles with reading time:', articleTitles);
        
        // Filter - Get only technology articles
        const techArticles = NewsManager.articles.filter(article => article.category === 'Technology');
        console.log('Technology articles:', techArticles);
        
        // Reduce - Calculate total views across all articles
        const totalViews = NewsManager.articles.reduce((sum, article) => sum + article.views, 0);
        console.log('Total views across all articles:', totalViews);
        
        // Find - Find article with most likes
        const mostLikedArticle = NewsManager.articles.reduce((max, article) => 
            article.likes > max.likes ? article : max
        );
        console.log('Most liked article:', mostLikedArticle);
        
        // Sort - Sort articles by publish date (newest first)
        const sortedByDate = [...NewsManager.articles].sort((a, b) => b.publishDate - a.publishDate);
        console.log('Articles sorted by date:', sortedByDate);
        
        // Some - Check if any article has more than 2000 views
        const hasPopularArticles = NewsManager.articles.some(article => article.views > 2000);
        console.log('Has articles with 2000+ views:', hasPopularArticles);
        
        // Every - Check if all articles are published
        const allPublished = NewsManager.articles.every(article => article.isPublished);
        console.log('All articles are published:', allPublished);
        
        // ForEach - Log each article's summary
        console.log('Article summaries:');
        NewsManager.articles.forEach((article, index) => {
            console.log(`${index + 1}. ${article.title} (${article.category}) - ${article.views} views`);
        });
    }
    
    // ==================== INTERACTIVE FEATURES ====================
    
    // Create interactive news dashboard
    function createNewsDashboard() {
        const dashboardContainer = document.createElement('div');
        dashboardContainer.className = 'news-dashboard mt-5';
        dashboardContainer.innerHTML = `
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center mb-4">Interactive News Dashboard</h2>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Filter Articles</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Category:</label>
                                <select class="form-select" id="category-filter">
                                    <option value="">All Categories</option>
                                    ${NewsManager.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Sort by:</label>
                                <select class="form-select" id="sort-filter">
                                    <option value="date">Date (Newest First)</option>
                                    <option value="views">Most Views</option>
                                    <option value="likes">Most Likes</option>
                                    <option value="title">Title (A-Z)</option>
                                </select>
                            </div>
                            <button class="btn btn-primary" id="apply-filters">Apply Filters</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Statistics</h5>
                        </div>
                        <div class="card-body">
                            <div id="news-stats">
                                <p><strong>Total Articles:</strong> <span id="total-articles">${NewsManager.articles.length}</span></p>
                                <p><strong>Total Views:</strong> <span id="total-views">${NewsManager.articles.reduce((sum, article) => sum + article.views, 0)}</span></p>
                                <p><strong>Total Likes:</strong> <span id="total-likes">${NewsManager.articles.reduce((sum, article) => sum + article.likes, 0)}</span></p>
                                <p><strong>Most Popular:</strong> <span id="most-popular">${NewsManager.getMostPopularArticles(1)[0].title}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <div id="filtered-articles" class="row g-3"></div>
                </div>
            </div>
        `;
        
        // Add to main content
        const mainContent = document.querySelector('#main-content') || document.querySelector('main');
        if (mainContent) {
            mainContent.appendChild(dashboardContainer);
        }
        
        // Add event listeners
        setupDashboardInteractions();
    }
    
    // Setup dashboard interactions
    function setupDashboardInteractions() {
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        const applyFiltersBtn = document.getElementById('apply-filters');
        const filteredArticlesContainer = document.getElementById('filtered-articles');
        
        function displayArticles(articles) {
            filteredArticlesContainer.innerHTML = '';
            
            articles.forEach(article => {
                const articleCard = document.createElement('div');
                articleCard.className = 'col-md-6 col-lg-4';
                articleCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="card-title">${article.title}</h6>
                            <p class="card-text small">${article.content.substring(0, 100)}...</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${article.category}</small>
                                <div class="btn-group btn-group-sm">
                                    <button class="btn btn-outline-primary" onclick="viewArticle(${article.id})">View</button>
                                    <button class="btn btn-outline-success" onclick="likeArticle(${article.id})">👍 ${article.likes}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                filteredArticlesContainer.appendChild(articleCard);
            });
        }
        
        function applyFilters() {
            let filteredArticles = [...NewsManager.articles];
            
            // Filter by category
            const selectedCategory = categoryFilter.value;
            if (selectedCategory) {
                filteredArticles = filteredArticles.filter(article => article.category === selectedCategory);
            }
            
            // Sort articles
            const sortBy = sortFilter.value;
            switch(sortBy) {
                case 'date':
                    filteredArticles.sort((a, b) => b.publishDate - a.publishDate);
                    break;
                case 'views':
                    filteredArticles.sort((a, b) => b.views - a.views);
                    break;
                case 'likes':
                    filteredArticles.sort((a, b) => b.likes - a.likes);
                    break;
                case 'title':
                    filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
            
            displayArticles(filteredArticles);
        }
        
        applyFiltersBtn.addEventListener('click', applyFilters);
        
        // Initial display
        displayArticles(NewsManager.articles);
    }
    
    // Global functions for article interactions
    window.viewArticle = function(articleId) {
        const article = NewsManager.getArticleById(articleId);
        if (article) {
            article.incrementViews();
            alert(`Viewing: ${article.title}\nViews: ${article.views}\nReading time: ${article.getReadingTime()} minutes`);
            updateStats();
        }
    };
    
    window.likeArticle = function(articleId) {
        const article = NewsManager.getArticleById(articleId);
        if (article) {
            article.like();
            alert(`Liked: ${article.title}\nTotal likes: ${article.likes}`);
            updateStats();
        }
    };
    
    function updateStats() {
        const totalViewsElement = document.getElementById('total-views');
        const totalLikesElement = document.getElementById('total-likes');
        const mostPopularElement = document.getElementById('most-popular');
        
        if (totalViewsElement) {
            totalViewsElement.textContent = NewsManager.articles.reduce((sum, article) => sum + article.views, 0);
        }
        if (totalLikesElement) {
            totalLikesElement.textContent = NewsManager.articles.reduce((sum, article) => sum + article.likes, 0);
        }
        if (mostPopularElement) {
            mostPopularElement.textContent = NewsManager.getMostPopularArticles(1)[0].title;
        }
    }
    
    // ==================== ADVANCED FEATURES ====================
    
    // Create a news ticker with dynamic content
    function createNewsTicker() {
        const tickerContainer = document.createElement('div');
        tickerContainer.className = 'news-ticker';
        tickerContainer.innerHTML = `
            <div class="ticker-content">
                <span class="ticker-label">Breaking News:</span>
                <span class="ticker-text" id="ticker-text">Loading latest news...</span>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .news-ticker {
                background: linear-gradient(90deg, #007bff, #0056b3);
                color: white;
                padding: 10px 0;
                overflow: hidden;
                position: relative;
                margin: 20px 0;
            }
            .ticker-content {
                display: flex;
                align-items: center;
                white-space: nowrap;
                animation: ticker 30s linear infinite;
            }
            .ticker-label {
                font-weight: bold;
                margin-right: 15px;
                background: rgba(255,255,255,0.2);
                padding: 5px 10px;
                border-radius: 15px;
            }
            @keyframes ticker {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        const mainContent = document.querySelector('#main-content') || document.querySelector('main');
        if (mainContent) {
            mainContent.insertBefore(tickerContainer, mainContent.firstChild);
        }
        
        // Update ticker content
        function updateTicker() {
            const tickerText = document.getElementById('ticker-text');
            const randomArticle = NewsManager.articles[Math.floor(Math.random() * NewsManager.articles.length)];
            if (tickerText && randomArticle) {
                tickerText.textContent = `${randomArticle.title} - ${randomArticle.category} News`;
            }
        }
        
        // Update ticker every 5 seconds
        updateTicker();
        setInterval(updateTicker, 5000);
    }
    
    // ==================== INITIALIZATION ====================
    
    // Initialize all features
    demonstrateArrayMethods();
    createNewsDashboard();
    createNewsTicker();
    
    console.log('Advanced JavaScript News Management System initialized successfully!');
    console.log('Available methods:', Object.keys(NewsManager));
});
