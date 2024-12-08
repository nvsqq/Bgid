document.addEventListener('DOMContentLoaded', async function () {
    let items = [];
    let itemid = localStorage.getItem('item-id');
    let getItem = [];
    let currentImg = 0;

    function updateUrlWithId(id) {
        const newUrl = `${window.location.pathname}?attractions-id=${id}`;
        history.replaceState(null, '', newUrl);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlItemId = urlParams.get('item-id');
    if (urlItemId) {
        itemid = urlItemId;
    } else {
        updateUrlWithId(itemid);
    }

    async function getData() {
        try {
            const response = await fetch('https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog');
            const items_temp = await response.json();
            items_temp.forEach(item => {
                if (item.id == itemid) {
                    getItem = item;
                }
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    await getData();
    document.querySelector('.card').innerHTML = `
    <div class="card" style="margin: 150px;">
        <div class="container">
            <div class="card__title">
                <a href="./catalog.html" style="width: 35px; height: 35px; margin-right: 50px;">
                    <img src="./assets/img/free-icon-arrow-left-9847479.png" style="width: 35px; height: 35px;" alt="cnhtkrf">
                </a>       
                <p>${getItem.title}</p>
            </div>
            <div class="card__wrap">
                <div class="card__card">
                    <div class="slider" id="slider">
                        <div class="slider__slides">
                            <div class="slider__slide"><img src="${getItem.imgs[0]}" alt="${getItem.imgs[0]}" class="slider-img"></div>
                            <div class="slider__slide"><img src="${getItem.imgs[1]}" alt="${getItem.imgs[1]}" class="slider-img"></div>
                            <div class="slider__slide"><img src="${getItem.imgs[2]}" alt="${getItem.imgs[2]}" class="slider-img"></div>
                            <div class="slider__slide"><img src="${getItem.imgs[3]}" alt="${getItem.imgs[3]}" class="slider-img"></div>                
                        </div>
                    </div>
                    <div style="position:relative;overflow:hidden;">
                        <iframe src="${getItem.src_map}" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
                    </div>
                </div>
                <div class="card__card">
                    <div class="card__description">
                        <p>${getItem.description_attractions}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // Модальное окно
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalImage = document.createElement('img');
    modalContent.appendChild(modalImage);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;'; 
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    function showModal(index) {
        currentImg = index;
        modalImage.src = getItem.imgs[currentImg];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }

    function nextImage() {
        currentImg = (currentImg + 1) % getItem.imgs.length;
        modalImage.src = getItem.imgs[currentImg];
    }

    function prevImage() {
        currentImg = (currentImg - 1 + getItem.imgs.length) % getItem.imgs.length;
        modalImage.src = getItem.imgs[currentImg];
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    closeButton.addEventListener('click', closeModal); 

    // Клик по изображению в слайдере
    const sliderImages = document.querySelectorAll('.slider-img');
    sliderImages.forEach((img, index) => {
        img.addEventListener('click', () => showModal(index));
    });

    // переключениe
    const nextButton = document.createElement('button');
    nextButton.classList.add('next'); 
    const prevButton = document.createElement('button');
    prevButton.classList.add('prev'); 

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    modalContent.appendChild(prevButton);
    modalContent.appendChild(nextButton);

    
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

    
    showSlide(currentSlide);

    let slideInterval;
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

    startSlideShow();
});
