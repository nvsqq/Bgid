class Slider {
    constructor(selector) {
        this.sliderElement = document.querySelector(selector);
        this.slides = this.sliderElement.querySelectorAll('.slider__slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slideContainer = this.sliderElement.querySelector('.slider__slides');

        this.init();
    }

    showSlide(index) {
        if (index >= this.slides.length) {
            this.currentSlide = 0;
        }
        if (index < 0) {
            this.currentSlide = this.slides.length - 1;
        }

        const slideWidth = this.slides[this.currentSlide].clientWidth;
        this.slideContainer.style.transform = `translateX(${-this.currentSlide * slideWidth}px)`;
    }

    
    nextSlide() {
        this.currentSlide++;
        this.showSlide(this.currentSlide);
    }

    
    prevSlide() {
        this.currentSlide--;
        this.showSlide(this.currentSlide);
    }

    
    startSlideShow() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); 
    }

   
    stopSlideShow() {
        clearInterval(this.slideInterval);
    }

    
    init() {
        this.showSlide(this.currentSlide);

        
        this.sliderElement.addEventListener('mouseenter', () => this.stopSlideShow());
        this.sliderElement.addEventListener('mouseleave', () => this.startSlideShow());

       
        this.startSlideShow();
    }
}

const slider = new Slider('#slider');
