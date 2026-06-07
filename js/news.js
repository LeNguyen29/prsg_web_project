const posts = [
  {
    date: "June 6, 2026",
    title: "GOKAI BLACK UPDATE",
    description: "A menacing ship approaches the island. Give no quarter, for this be mutiny. Dead men tell no tales, so live and make it showy.",
    link: "post-1.html",
    img_cover: "assets/GokaiBlack.png"
  },
  {
    date: "May 28, 2026",
    title: "Development Blog: Ranger Combat",
    description: "A closer look at how Ranger weapons and abilities work.",
    link: "post-2.html",
    img_cover: "assets/GokaiBlack.png"
  },
  {
    date: "May 15, 2026",
    title: "Version 0.4.1 Update",
    description: "New suits, UI improvements, and mission updates.",
    link: "post-3.html",
    img_cover: "assets/GokaiBlack.png"
  }
];

const postsPerPage = 5;
let currentPage = 1;

const newsList = document.getElementById("news_list");
const paginationTop = document.getElementById("pagination_top");
const paginationBottom = document.getElementById("pagination_bottom");

function displayPosts() {
  newsList.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach(post => {
    newsList.innerHTML += `
      <article class="news_card">
        <img src="${post.img_cover}">
        <div class="card_txt">
            <p class="news_date">${post.date}</p>
            <h2 class="news_title">${post.title}</h2>
            <p class="news_desc">${post.description}</p>
            <a class="read_more_link" href="${post.link}">Read More</a>
        </div>
      </article>
    `;
  });
}

function displayPagination() {
  paginationTop.innerHTML = "";
  paginationBottom.innerHTML = "";

  const pageCount = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= pageCount; i++) {

    const paginationButton = `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <button class="page-link" onclick="goToPage(${i})">
          ${i}
        </button>
      </li>
    `;

    paginationTop.innerHTML += paginationButton;
    paginationBottom.innerHTML += paginationButton;
  }
}

function goToPage(page) {
  currentPage = page;
  displayPosts();
  displayPagination();
}

displayPosts();
displayPagination();