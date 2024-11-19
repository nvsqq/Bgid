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






// интерактифчек с картой ()

const map1 = document.getElementById('map1');
        const map2 = document.getElementById('map2');
            const map3 = document.getElementById('map3');
                const map4 = document.getElementById('map4');
                    const map5 = document.getElementById('map5');
                        map5.style.display = 'block'; 

                    document.getElementById('showMap1').addEventListener('click', function() {
                        showMap1.style.background = "#000";
                        showMap1.style.color = "#fff";
                        showMap1.style.transition = "all 1s";
                        showMap2.style.background = "#D9D9D9";
                        showMap2.style.color = "#000";
                        showMap3.style.background = "#D9D9D9";
                        showMap3.style.color = "#000";
                        showMap4.style.background = "#D9D9D9";
                        showMap4.style.color = "#000";

                        map1.style.display = 'block';
                        map2.style.display = 'none';   
                        map3.style.display = 'none'; 
                        map4.style.display = 'none'; 
                        map5.style.display = 'none'; 
                    });

                    document.getElementById('showMap2').addEventListener('click', function() {
                        showMap1.style.background = "#D9D9D9";
                        showMap1.style.color = "#000";
                        showMap2.style.background = "#000";
                        showMap2.style.color = "#fff";
                        showMap2.style.transition = "all 1s";
                        showMap3.style.background = "#D9D9D9";
                        showMap3.style.color = "#000";
                        showMap4.style.background = "#D9D9D9";
                        showMap4.style.color = "#000";
                        

                        map1.style.display = 'none';
                        map2.style.display = 'block';   
                        map3.style.display = 'none'; 
                        map4.style.display = 'none'; 
                        map5.style.display = 'none'; 
                    });

                    document.getElementById('showMap3').addEventListener('click', function() {
                        showMap1.style.background = "#D9D9D9";
                        showMap1.style.color = "#000";
                        showMap2.style.background = "#D9D9D9";
                        showMap2.style.color = "#000";
                        showMap3.style.background = "#000";
                        showMap3.style.color = "#fff";
                        showMap3.style.transition = "all 1s";
                        showMap4.style.background = "#D9D9D9";
                        showMap4.style.color = "#000";
                        
                      
                        map1.style.display = 'none';
                        map2.style.display = 'none';   
                        map3.style.display = 'block'; 
                        map4.style.display = 'none'; 
                        map5.style.display = 'none'; 
                    });

                    document.getElementById('showMap4').addEventListener('click', function() {
                        showMap1.style.background = "#D9D9D9";
                        showMap1.style.color = "#000";
                        showMap2.style.background = "#D9D9D9";
                        showMap2.style.color = "#000";
                        showMap3.style.background = "#D9D9D9";
                        showMap3.style.color = "#000";
                        showMap4.style.background = "#000";
                        showMap4.style.color = "#fff";
                        showMap4.style.transition = "all 1s";
                        
                      
                        map1.style.display = 'none';
                        map2.style.display = 'none';   
                        map3.style.display = 'none'; 
                        map4.style.display = 'block'; 
                        map5.style.display = 'none'; 
                    });