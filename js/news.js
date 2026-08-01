var posts = [];
var newsCardTemplate = "";

const POSTS_PER_PAGE = 4;
const NEWSCARD_TEMPLATE_PATH = "templates/news_card_template.html";
const POSTS_JSON_PATH = "data/news_posts.json";

const newsList = $("#news_list");
const paginationTop = $("#pagination_top");
const paginationBottom = $("#pagination_bottom");

var currentPage = 1;

async function loadPosts() {
  try {
      const [postsResponse, templateResponse] = await Promise.all([
          fetch(POSTS_JSON_PATH),
          fetch(NEWSCARD_TEMPLATE_PATH)
      ]);

      posts = await postsResponse.json();
      newsCardTemplate = await templateResponse.text();

      displayPosts();
      displayPagination();
  }
  catch (err) {
      console.error("Something went wrong!\n", err);
  }
}

function displayPosts() {
  newsList.empty();

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  posts.slice(start, end).forEach(post => {
      const newsCard = $(newsCardTemplate).clone();

      newsCard.find(".card_img img")
          .attr("src", post.img_cover)
          .attr("alt", post.title);

      newsCard.find(".title_txt").text(post.title);
      newsCard.find(".date_txt").text(post.date);
      newsCard.find(".card_desc").text(post.description);
      newsCard.find(".card_link").attr("href", post.link);

      newsList.append(newsCard);
  });
}

function createPageItem(pageNumber) {
  const li = $("<li>")
      .addClass("page-item")
      .toggleClass("active", pageNumber === currentPage);

  const link = $("<a>")
      .addClass("page-link")
      .attr("href", "#")
      .text(pageNumber)
      .on("click", (e) => {
          e.preventDefault();
          goToPage(pageNumber);
      });

  li.append(link);

  return li;
}

function displayPagination() {
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);

  paginationTop.empty();
  paginationBottom.empty();
  
  // Previous button
  const prev = $(`
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
          <a class="page-link" href="#">
              <span>&laquo;</span>
          </a>
      </li>
  `);

  prev.find("a").on("click", (e) => {
      e.preventDefault();
      if (currentPage > 1)
          goToPage(currentPage - 1);
  });

  paginationTop.append(prev.clone(true));
  paginationBottom.append(prev);
  
  // Number buttons
  for (let i = 1; i <= pageCount; i++) {
      paginationTop.append(createPageItem(i));
      paginationBottom.append(createPageItem(i));
  }

  // Next button
  const next = $(`
      <li class="page-item ${currentPage === pageCount ? "disabled" : ""}">
          <a class="page-link" href="#">
              <span>&raquo;</span>
          </a>
      </li>
  `);

  next.find("a").on("click", (e) => {
      e.preventDefault();

      if (currentPage < pageCount)
          goToPage(currentPage + 1);
  });

  paginationTop.append(next.clone(true));
  paginationBottom.append(next);

}

function goToPage(page) {
  page_limit = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  if (page < 1 || page > page_limit)
      return;

  currentPage = page;

  displayPosts();
  displayPagination();
}

loadPosts();