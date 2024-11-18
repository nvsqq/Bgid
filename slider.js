// слайдер  

let currentSlide = 0;
const slides = document.querySelectorAll('.slider__slide');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    }
    if (index < 0) {
        currentSlide = slides.length - 1;
    }

    const slideWidth = slides[currentSlide].clientWidth;
    const slidesContainer = document.querySelector('.slider__slides');
    slidesContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// смена слайдов каждые 10 секунд
setInterval(nextSlide, 6000);

// Показать первый слайд
showSlide(currentSlide);