const track = document.querySelector(".carousel-track");
const images = document.querySelectorAll(".carousel-img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");

const realSlidesCount = 5;
let currentIndex = 1;
let interval;

function getSlideWidth() {
  return images[0]?.offsetWidth || 0;
}

function setInitialPosition() {
  const slideWidth = getSlideWidth();
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

function updateDots(index) {
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

function moveTo(index) {
  currentIndex = index;
  const slideWidth = getSlideWidth();
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

function handleLoop() {
  track.addEventListener("transitionend", () => {
    const slideWidth = getSlideWidth();
    if (currentIndex === 0) {
      track.style.transition = "none";
      currentIndex = realSlidesCount;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    } else if (currentIndex === realSlidesCount + 1) {
      track.style.transition = "none";
      currentIndex = 1;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    updateDots(currentIndex - 1);
  });
}

function showNext() {
  if (currentIndex < realSlidesCount + 1) {
    moveTo(currentIndex + 1);
  }
}

function showPrev() {
  if (currentIndex > 0) {
    moveTo(currentIndex - 1);
  }
}

function goToSlide(dotIndex) {
  moveTo(dotIndex + 1);
}

function startAutoSlide() {
  interval = setInterval(showNext, 3000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  showNext();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  showPrev();
  startAutoSlide();
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const index = parseInt(e.target.dataset.index);
    stopAutoSlide();
    goToSlide(index);
    startAutoSlide();
  });
});

setInitialPosition();
updateDots(0);
handleLoop();
startAutoSlide();

window.addEventListener("resize", () => {
  setInitialPosition();
});

const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});
