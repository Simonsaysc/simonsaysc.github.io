const apiKey = "f1d02c8f1bb643c7af37bb441189b3aa"; // Replace with your key
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

async function fetchAndDisplayNews() {
  const apiKey = "f1d02c8f1bb643c7af37bb441189b3aa"; // Replace with your key
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
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

    // Create the accordion container
    const accordion = document.createElement("div");
    accordion.classList.add("accordion");
    accordion.id = "newsAccordion";
    newsContainer.appendChild(accordion);

    articles.forEach((article, index) => {
      // Create accordion item
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");

      // Create accordion header
      const accordionHeader = document.createElement("h2");
      accordionHeader.classList.add("accordion-header");
      accordionHeader.id = `heading-${index}`;

      // Create accordion button
      const accordionButton = document.createElement("button");
      accordionButton.classList.add("accordion-button", "collapsed");
      accordionButton.type = "button";
      accordionButton.setAttribute("data-bs-toggle", "collapse");
      accordionButton.setAttribute("data-bs-target", `#collapse-${index}`);
      accordionButton.setAttribute("aria-expanded", "false");
      accordionButton.setAttribute("aria-controls", `collapse-${index}`);
      accordionButton.textContent = article.title;
      accordionHeader.appendChild(accordionButton);

      // Create accordion collapse
      const accordionCollapse = document.createElement("div");
      accordionCollapse.id = `collapse-${index}`;
      accordionCollapse.classList.add("accordion-collapse", "collapse");
      accordionCollapse.setAttribute("aria-labelledby", `heading-${index}`);
      accordionCollapse.setAttribute("data-bs-parent", "#newsAccordion");

      // Create accordion body
      const accordionBody = document.createElement("div");
      accordionBody.classList.add("accordion-body");
      
      const description = document.createElement("p");
      description.textContent = article.description || "No description available.";
      accordionBody.appendChild(description);

      const link = document.createElement("a");
      link.href = article.url;
      link.textContent = "Read more";
      link.target = "_blank";
      link.classList.add("btn", "btn-primary");
      accordionBody.appendChild(link);
      
      accordionCollapse.appendChild(accordionBody);

      accordionItem.appendChild(accordionHeader);
      accordionItem.appendChild(accordionCollapse);
      accordion.appendChild(accordionItem);
    });
  }
}


addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayNews();
});
