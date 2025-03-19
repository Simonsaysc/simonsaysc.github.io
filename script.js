const apiKey = 'Yf1d02c8f1bb643c7af37bb441189b3aa'; 
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
addEventListener("DOMContentLoaded", fetch)

fetch(apiUrl).then(response => {return response.json()})
.then(data => {
    console.log(data); 
    const firstTenArticles = data.articles.slice(0, 10);
    displayNews(firstTenArticles); 
  })

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    if(newsContainer){
      newsContainer.innerHTML = '';
    
    articles.forEach(article=> {
      const col = document.createElement('div');
      col.classList.add('col-md-4', 'mb-4');

      const articleElement = document.createElement('div');
      articleElement.classList.add('article', 'card', 'h-100');

      const title = document.createElement('h5');
      title.textContent = article.title;
      title.classList.add('card-title');
      articleElement.appendChild(title);

      const description = document.createElement('p');
      description.textContent = article.description;
      description.classList.add('card-text');
      articleElement.appendChild(description);

      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = 'Read more';
      link.target = '_blank'; 
      link.classList.add('btn', 'btn-primary'); 
      articleElement.appendChild(link);

      col.appendChild(articleElement);
      newsContainer.appendChild(col);
    });
};
};