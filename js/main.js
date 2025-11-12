// NewsAPI integration example
// const NEWS_API_KEY = '915be58668064ad3b1b5076f3c8b2255'; // замените на свой ключ
// const NEWS_API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2025-10-12&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

function fetchNewsFromAPI() {
    // Пример безопасного запроса к вашему серверу-прокси (Express)
    fetch('http://localhost:3000/news')
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        const container = document.getElementById('newsapi-articles');
        if (!container) return; // Проверка на существование контейнера
        container.innerHTML = '';
        if (!articles || !Array.isArray(articles)) {
          container.innerHTML = '<div class="text-danger">Нет новостей для отображения.</div>';
          return;
        }
        articles.forEach(article => {
          const div = document.createElement('div');
          div.className = 'newsapi-card mb-3 p-2 border rounded';
          div.innerHTML = `
            <h5>${article.title}</h5>
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="" class="img-fluid mb-2">` : ''}
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          `;
          container.appendChild(div);
        });
      })
      .catch(error => {
        const container = document.getElementById('newsapi-articles');
        if (container) container.innerHTML = '<div class="text-danger">Ошибка загрузки новостей с NewsAPI.</div>';
      });
}

// Вывод локальных новостей во вкладке 'Новости сайта'
function renderLocalNews() {
    if (window.NewsManager && window.NewsManager.articles) {
        const container = document.getElementById('local-articles');
        if (container) container.innerHTML = '';
        window.NewsManager.articles.slice(0, 5).forEach(article => {
            const div = document.createElement('div');
            div.className = 'local-card mb-3 p-2 border rounded';
            div.innerHTML = `
                <h5>${article.title}</h5>
                <p>${article.content.substring(0, 120)}...</p>
            `;
            if (container) container.appendChild(div);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Добавьте этот div в нужное место на странице для вывода новостей
    if (!document.getElementById('newsapi-articles')) {
        const main = document.querySelector('main') || document.body;
        const div = document.createElement('div');
        div.id = 'newsapi-articles';
        div.className = 'mb-4';
        main.appendChild(div);
    }
    fetchNewsFromAPI();
    renderLocalNews();
});