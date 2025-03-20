function fetchNewsWithXHR() {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const apiKey = "f1d02c8f1bb643c7af37bb441189b3aa"; // Replace with your key
      const apiUrl = `http://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

      xhr.open("GET", apiUrl);

      xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
          } else {
              reject(new Error(`Request failed with status ${xhr.status}`));
          }
      };

      xhr.onerror = function () {
          reject(new Error("Network error"));
      };

      xhr.send();
  });
}

async function fetchAndDisplayNewsXHR(){
  try {
     const data = await fetchNewsWithXHR();
     console.log(data);
     const firstTenArticles = data.articles.slice(0, 10);
     displayNews(firstTenArticles);
  } catch (error){
      console.log("Error fetching or processing news:", error)
  }
}

async function fetchAndDisplayNews() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const firstTenArticles = data.articles.slice(0, 10);
    displayNews(firstTenArticles);
  } catch (error) {
    console.error("Error fetching or processing news:", error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  if (newsContainer) {
    newsContainer.innerHTML = "";

    articles.forEach((article) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4", "mb-4");

      const articleElement = document.createElement("div");
      articleElement.classList.add("article", "card", "h-100");

      const title = document.createElement("h5");
      title.textContent = article.title;
      title.classList.add("card-title");
      articleElement.appendChild(title);

      const description = document.createElement("p");
      description.textContent = article.description || "No description available.";
      description.classList.add("card-text");
      articleElement.appendChild(description);

      const link = document.createElement("a");
      link.href = article.url;
      link.textContent = "Read more";
      link.target = "_blank";
      link.classList.add("btn", "btn-primary");
      articleElement.appendChild(link);

      col.appendChild(articleElement);
      newsContainer.appendChild(col);
    });
  }
}
addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayNewsXHR();
});
