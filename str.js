document.addEventListener('DOMContentLoaded', async function () {
    let itemid = parseInt(new URLSearchParams(window.location.search).get('attraction-id'))
    let getItem = [];
    let currentImg = 0;

    async function getData() {
        try {
            const response = await fetch('https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog');
            const items_temp = await response.json();
            items_temp.forEach(item => {
                if (item.id == itemid) {
                    getItem = item;
                    
                }
                
            });
            console.log(itemid)
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    await getData();
    // console.log(getItem)
    document.querySelector('.card').innerHTML = `
        <div class="card">
            <div class="container">
                <div class="card__title">
                    <a href="./catalog.html" style="width: 35px; height: 35px; margin-right: 50px;">
                        <img src="./assets/img/free-icon-arrow-left-9847479.png" style="width: 35px; height: 35px;" alt="back">
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
        
            <!-- Форма добавления отзыва -->
            <div class="comments-container">
                <h3>Добавить отзыв</h3>
                <form id="comment-form" class="comment-form">
                    <input type="text" id="name" placeholder="Ваше имя" required>
                    <textarea id="text" placeholder="Ваш отзыв" required></textarea>
                    <div class="captcha">
                        <label class="checkbox-label">
                            <input type="checkbox" id="captchaCheckbox"> 
                            <span></span>
                        </label>
                        <p>Я не робот</p>
                        
                    </div>
                    <div id="message"></div>
                    <button id="submitBtn" disabled type="submit">Отправить</button>
                </form>
            </div>

            <!-- Отзывы -->
            <div class="comments-container">
                <h3>Отзывы</h3>
                <div id="comments-list"></div>
            </div>
        </div>
    `;

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

    const prevModalButton = document.createElement('button');
    prevModalButton.classList.add('prev-modal');
    prevModalButton.innerHTML = '<';
    
    const nextModalButton = document.createElement('button');
    nextModalButton.classList.add('next-modal');
    nextModalButton.innerHTML = '>';

    modalContent.appendChild(prevModalButton);
    modalContent.appendChild(nextModalButton);

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

    prevModalButton.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    nextModalButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    const sliderImages = document.querySelectorAll('.slider-img');
    sliderImages.forEach((img, index) => {
        img.addEventListener('click', () => showModal(index));
    });

    let sliderInterval; 
    let isMouseOverSlider = false; 
    let isModalOpen = false;

    function autoSwitchSlide() {
        const slider = document.getElementById('slider');
        const slides = slider.querySelector('.slider__slides');
        const slideWidth = slider.querySelector('.slider__slide').offsetWidth;
        slides.scrollBy({
            left: slideWidth,
            behavior: 'smooth',
        });

        if (slides.scrollLeft + slideWidth >= slides.scrollWidth) {
            slides.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
        }
    }

    function startAutoSlider() {
        if (!sliderInterval) {
            sliderInterval = setInterval(() => {
                if (!isMouseOverSlider && !isModalOpen) {
                    autoSwitchSlide();
                }
            }, 3000);
        }
    }

    function stopAutoSlider() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
            sliderInterval = null;
        }
    }

    const sliderElement = document.getElementById('slider');
    sliderElement.addEventListener('mouseenter', () => {
        isMouseOverSlider = true;
        stopAutoSlider();
    });

    sliderElement.addEventListener('mouseleave', () => {
        isMouseOverSlider = false;
        startAutoSlider();
    });

    startAutoSlider();

    // Загрузка комментариев
    async function loadComments() {
        try {
            const response = await fetch(`https://672a01fc6d5fa4901b6f58b6.mockapi.io/comments?attractionId=${itemid}`);
            const comments = await response.json();

            const commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = ''; 

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <div>
                        <strong class="comment__name">${comment.name}</strong>
                        <p class="comment__text">${comment.text}</p>
                        <button class="delete-comment" data-id="${comment.id}">
                            <img src="https://cdn-icons-png.flaticon.com/512/7709/7709786.png" alt="" class="delete-icon">
                        </button>
                    </div>
                `;

                // Кнопка удаления с иконкой мусорки
                const deleteButton = commentElement.querySelector('.delete-comment');
                deleteButton.addEventListener('click', async () => {
                    try {
                        const response = await fetch(`https://672a01fc6d5fa4901b6f58b6.mockapi.io/comments/${comment.id}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            commentElement.remove();
                        }
                    } catch (error) {
                        console.error('Ошибка при удалении отзыва:', error);
                    }
                });

                commentsList.appendChild(commentElement);
            });
        } catch (error) {
            console.error('Ошибка при загрузке комментариев:', error);
        }
    }

    // Загрузка комментариев при загрузке страницы
    loadComments();

    const captchaCheckbox = document.getElementById('captchaCheckbox');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');

    captchaCheckbox.addEventListener('change', () => {
        submitBtn.disabled = !captchaCheckbox.checked;
        messageDiv.textContent = ''; 
    });

    submitBtn.addEventListener('click', () => {
        if (captchaCheckbox.checked) {
            messageDiv.textContent = "Поздравляем вы не робот!";
            messageDiv.style.color = "green"; 
        } else {
            messageDiv.textContent = "Пожалуйста, подтвердите, что вы не робот.";
            messageDiv.style.color = "red"; 
        }
    });

    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const text = document.getElementById('text').value;

        if (name && text) {
            try {
                const response = await fetch('https://672a01fc6d5fa4901b6f58b6.mockapi.io/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        text: text,
                        attractionId: itemid
                    }),
                });

                if (response.ok) {
                    loadComments();
                    commentForm.reset();
                }
            } catch (error) {
                console.error('Ошибка при добавлении отзыва:', error);
            }
        }
    });
});
