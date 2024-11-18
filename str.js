document.addEventListener('DOMContentLoaded', async function () {
    let items = []
    let itemid = localStorage.getItem('item-id')
    let getItem = []
    let currentImg = 0;
    let random_reviews = Math.floor(Math.random() * (999 - 1 + 1) + 1)

    async function getData() {
        try {
            const response = await fetch('https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog');
            const items_temp = await response.json();
            items_temp.forEach(item => {
                if (item.id == itemid) {
                    getItem = item
                }
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    await getData()
    document.querySelector('.card').innerHTML = 
    `
    <div class="card" style="margin: 150px;">
    <div class="container">
                <div class="card__title">
                    <p>${getItem.title}</p>
                </div>
                <div class="card__wrap">
                    <div class="card__card">
                        <div class="slider" id="slider">
                            <div class="slider__slides">
                                <div class="slider__slide"><img src="${getItem.imgs[0]}" alt="${getItem.imgs[0]}"></div>
                                <div class="slider__slide"><img src="${getItem.imgs[1]}" alt="${getItem.imgs[1]}"></div>
                                <div class="slider__slide"><img src="${getItem.imgs[2]}" alt="${getItem.imgs[2]}"></div>
                                <div class="slider__slide"><img src="${getItem.imgs[3]}" alt="${getItem.imgs[3]}"></div>
                            </div>
                        </div>
                        <div style="position:relative;overflow:hidden;">
                            <iframe src="${getItem.src_map}" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
                        </div>
                    </div>
                    <div class="card__card">
                        <div class="card__description">
                            <p>
                                ${getItem.description_attractions}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    `;

    // Slider functionality
    let currentSlide = 0;
    let slideInterval;
    const slides = document.querySelectorAll('.slider__slide'); // Corrected selector

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        }
        if (index < 0) {
            currentSlide = slides.length - 1;
        }

        const slideWidth = slides[currentSlide].clientWidth;
        const slidesContainer = document.querySelector('.slider__slides'); // Corrected selector
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

    // Показывает первый слайд
    showSlide(currentSlide);

    // смена слайдов каждые 10 секунд
    function startSlideShow() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 3000); 
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    const slider = document.getElementById('slider');
    slider.addEventListener('mouseenter', stopSlideShow);
    slider.addEventListener('mouseleave', startSlideShow);
});