var slides = $(".showcase_slide");
var prevBtn = $("#prevBtn");
var nextBtn = $("#nextBtn");

let currentSlide = 0;

function showSlide(slide_index) {
  slides.each(function(index, obj) {
    $(obj).removeClass("active");
  });

  if (slide_index >= slides.length)
    currentSlide = 0;
  else if (slide_index < 0)
    currentSlide = slides.length - 1;
  else
    currentSlide = slide_index;

  slides.eq(currentSlide).addClass("active");
}

nextBtn.on("click", () => {
    showSlide(currentSlide + 1);
});

prevBtn.on("click", () => {
    showSlide(currentSlide - 1);
});