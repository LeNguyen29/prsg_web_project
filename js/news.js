var posts = [];

const postsPerPage = 4;
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

async function loadPosts() {

  const response = await fetch("data/news_posts.json");

  posts = await response.json();

  console.log(posts);

  displayPosts();
  displayPagination();
}

loadPosts();