// cлайдер
let currentSlide = 0;
let slideInterval;
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
// setInterval(nextSlide, 3000);

// Показывает первый слайд
showSlide(currentSlide);



// смена слайдов каждые 10 секунд
function startSlideShow() {
    slideInterval = setInterval(() => {
        nextSlide(1);
    }, 3000); 
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

const slider = document.getElementById('slider');
slider.addEventListener('mouseenter', stopSlideShow);
slider.addEventListener('mouseleave', startSlideShow);