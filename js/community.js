var images = [];

const imagesPerPage = 9;
let currentPage = 1;

const galleryGrid = document.getElementById("gallery_grid");

var pagination_bottom = document.getElementById("pagination_bottom");
var pagination_top = document.getElementById("pagination_top");

const modalImage = document.getElementById("modalImage");

function displayImages() {
  galleryGrid.innerHTML = "";

  const start = (currentPage - 1) * imagesPerPage;
  const end = start + imagesPerPage;
  const currentImages = images.slice(start, end);

  currentImages.forEach(image => {
    galleryGrid.innerHTML += `
      <button class="gallery_item" data-bs-toggle="modal" data-bs-target="#imageModal"
        onclick="showFullImage('${image.src}', '${image.alt}')">
        <img src="${image.src}" alt="${image.alt}">
      </button>
    `;
  });
}

function displayPagination() {
  pagination_bottom.innerHTML = "";
  pagination_top.innerHTML = "";

  const pageCount = Math.ceil(images.length / imagesPerPage);

  for (let i = 1; i <= pageCount; i++) {
    pagination_btn = `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <button class="page-link" onclick="goToGalleryPage(${i})">
          ${i}
        </button>
      </li>
    `;

    pagination_bottom.innerHTML += pagination_btn;
    pagination_top.innerHTML += pagination_btn;
  }
}

function goToGalleryPage(page) {
  currentPage = page;
  displayImages();
  displayPagination();
}

function showFullImage(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt;
}

async function loadImageList() {

    const response = await fetch("/data/gallery.json");

    images = await response.json();

    console.log(images);

    displayImages();
    displayPagination();
}

loadImageList();

