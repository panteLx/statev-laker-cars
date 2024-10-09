$(function () {
  // MENU
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // SMOOTHSCROLL NAVBAR
  $(function () {
    $(".navbar a, .hero-text a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll(".slideshow");

  slideshows.forEach((slideshow) => {
    const slides = slideshow.querySelectorAll(".slide");
    let index = 0;

    // Funktion, um die Slideshow zu aktualisieren
    function updateSlideshow() {
      const slideshowContainer = slideshow.parentElement; // Container für die Slides
      const slideshowDiv = slideshowContainer.querySelector(".slideshow");
      if (slideshowDiv) {
        slideshowDiv.style.transform = `translateX(${-index * 100}%)`;
      }
    }

    const leftArrow = slideshow.parentElement.querySelector(".left-arrow");
    const rightArrow = slideshow.parentElement.querySelector(".right-arrow");

    leftArrow.addEventListener("click", () => {
      index = index > 0 ? index - 1 : slides.length - 1; // Gehe zum vorherigen Slide
      updateSlideshow();
    });

    rightArrow.addEventListener("click", () => {
      index = index < slides.length - 1 ? index + 1 : 0; // Gehe zum nächsten Slide
      updateSlideshow();
    });

    // Auto-Play-Funktionalität (optional)
    setInterval(() => {
      index = index < slides.length - 1 ? index + 1 : 0;
      updateSlideshow();
    }, 30000); // Wechselt alle 5 Sekunden
  });
});
