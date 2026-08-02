let images = [];

const imagesPerPage = 9;
let currentPage = 1;

const $galleryGrid = $("#gallery_grid");
const $paginationBottom = $("#pagination_bottom");
const $paginationTop = $("#pagination_top");
const $modalImage = $("#modalImage");

function displayImages() {
    $galleryGrid.empty();

    const start = (currentPage - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const currentImages = images.slice(start, end);

    $.each(currentImages, function (_, image) {
        $galleryGrid.append(`
            <button class="gallery_item"
                    data-bs-toggle="modal"
                    data-bs-target="#imageModal"
                    data-src="${image.src}"
                    data-alt="${image.alt}">
                <img src="${image.src}" alt="${image.alt}">
            </button>
        `);
    });
}

function displayPagination() {
    $paginationBottom.empty();
    $paginationTop.empty();

    const pageCount = Math.ceil(images.length / imagesPerPage);

    // Previous button
    const previousBtn = `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <button class="page-link gallery-page" data-page="${currentPage - 1}">
                &laquo;
            </button>
        </li>
    `;

    $paginationBottom.append(previousBtn);
    $paginationTop.append(previousBtn);

    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        const paginationBtn = `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <button class="page-link gallery-page" data-page="${i}">
                    ${i}
                </button>
            </li>
        `;

        $paginationBottom.append(paginationBtn);
        $paginationTop.append(paginationBtn);
    }

    // Next button
    const nextBtn = `
        <li class="page-item ${currentPage === pageCount ? "disabled" : ""}">
            <button class="page-link gallery-page" data-page="${currentPage + 1}">
                &raquo;
            </button>
        </li>
    `;

    $paginationBottom.append(nextBtn);
    $paginationTop.append(nextBtn);
}

function goToGalleryPage(page) {
    const pageLimit = Math.ceil(images.length / imagesPerPage);

    if (page < 1 || page > pageLimit) {
        return;
    }

    currentPage = page;
    displayImages();
    displayPagination();
}

function showFullImage(src, alt) {
    $modalImage.attr({
        src: src,
        alt: alt
    });
}

async function loadImageList() {
    try {
        const response = await $.getJSON("/data/gallery.json");

        images = response;

        console.log(images);

        displayImages();
        displayPagination();
    } catch (error) {
        console.error("Failed to load gallery:", error);
    }
}

// Pagination click
$(document).on("click", ".gallery-page", function () {
    goToGalleryPage($(this).data("page"));
});

// Gallery image click
$(document).on("click", ".gallery_item", function () {
    showFullImage(
        $(this).data("src"),
        $(this).data("alt")
    );
});

// Load gallery
$(function () {
    loadImageList();
});