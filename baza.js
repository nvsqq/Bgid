// alert("cooki")




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
setInterval(nextSlide, 10000);

// Показать первый слайд
showSlide(currentSlide);






// интерактифчек с картой
class MapSwitcher {
    constructor(mapIds, buttonIds) {
        this.maps = mapIds.map(id => document.getElementById(id));
        this.buttons = buttonIds.map(id => document.getElementById(id));
        this.init();
    }

    init() {
        this.maps.forEach((map, index) => {
            map.style.display = index === 0 ? 'block' : 'none'; // Показываем первую карту
            this.buttons[index].addEventListener('click', () => this.showMap(index));
        });
    }

    showMap(index) {
        this.maps.forEach((map, i) => {
            map.style.display = i === index ? 'block' : 'none'; // Показываем только выбранную карту
            this.updateButtonStyle(i, index);
        });
    }

    updateButtonStyle(currentIndex, selectedIndex) {
        this.buttons.forEach((button, i) => {
            if (i === selectedIndex) {
                button.style.background = "#000";
                button.style.color = "#fff";
            } else {
                button.style.background = "#D9D9D9";
                button.style.color = "#000";
            }
            button.style.transition = "all 1s";
        });
    }
}

// Инициализация класса с идентификаторами карт и кнопок
const mapIds = ['map1', 'map2', 'map3', 'map4', 'map5'];
const buttonIds = ['showMap1', 'showMap2', 'showMap3', 'showMap4'];
const mapSwitcher = new MapSwitcher(mapIds, buttonIds);