document.addEventListener('DOMContentLoaded', async function () {
    let showAllItems = false;
    let filteredItems = [];
    let activeFilter = new URLSearchParams(window.location.search).get('filter') || 'Все';
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
    let attractionData;
    const itemsPerPage = 10;
    let items = [];
    let timeout 
    const pagination = document.getElementById('pagination');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const catalogContainer = document.getElementById('catalog__container');

    

    let isLoading = false;  
    let loadedItems = []; 

    // Функция для получения данных с сервера
    async function getData(searchTerm = '', sortBy = '', filter) {
        try {
            console.log(activeFilter,`https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog?${sortBy ? `sortBy=${sortBy}` : ''}${(filter) ? `&filter=${filter}`:''}${(searchTerm) ? `&search=${searchTerm}`:''}`)
            const apiUrl = `https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog?${sortBy ? `sortBy=${sortBy}` : ''}${(filter != 'Все') ? `&filter=${filter}`:''}${(searchTerm) ? `&search=${searchTerm}`:''}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
            }
            
            const items_temp = await response.json();
            return items_temp
        } catch (error) {
            console.error('Ошибка:', error);
            noResultsMessage.textContent = 'Ошибка загрузки данных. Пожалуйста, попробуйте позже.';
            noResultsMessage.style.display = 'block';
            catalogContainer.style.display = 'none';
        }
    }

    // Функция для создания  достопримечательности
    function createPlate(elemNum) {
        const catalogPlate = document.createElement('div');
        catalogPlate.classList.add('catalog__plate');
        catalogPlate.id = filteredItems[elemNum].filtr;
        catalogPlate.setAttribute('data-id', filteredItems[elemNum].id);
        catalogPlate.innerHTML = `
            <button id="contactBtn" class="btn">
                <a href="./attractions.html?attraction-id=${filteredItems[elemNum].id}">
                <img src="${filteredItems[elemNum].imgs[0]}" class="catalog__container_plate_img"></img>
                <div class="catalog__plate_text">
                    <h4 class="catalog__plate_title">${filteredItems[elemNum].title}</h4>
                    <h4 class="grade">рейтинг: ${filteredItems[elemNum].rating}</h4>
                    <h4 class="grade">посещаемость: ${filteredItems[elemNum].attendance}</h4>
                    <p class="catalog__plate_type">${filteredItems[elemNum].filtr}</p>
                    <p class="catalog__plate_description">${filteredItems[elemNum].description_plate}</p>
                </div>
            </a>
            </button>
        `;
        catalogContainer.appendChild(catalogPlate);
    }
    

    // Функция для рендеринга каталога
    async function renderCatalog() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const sortBy = document.getElementById('sortBy').value;
        let activeFilter = new URLSearchParams(window.location.search).get('filter') || 'Все';
        filteredItems = await getData(searchTerm, sortBy, activeFilter)
        console.log(filteredItems)
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        
        let addedCount = 0; 
        
        for (let i = start; i < end && i < filteredItems.length; i++) {
            if (!loadedItems.includes(filteredItems[i].id)) {
                createPlate(i);
                loadedItems.push(filteredItems[i].id); 
                addedCount++;
            }
        }

       
        if (filteredItems.length === 0 ) {
            noResultsMessage.style.display = 'block';
            catalogContainer.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'none';
            catalogContainer.style.display = 'grid';
        }

        
        loader.style.display = 'none';
        isLoading = false;  
    }

   
    function handleScroll() {
    
        if (isLoading || filteredItems.length <= loadedItems.length) return;  

        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.scrollHeight;

        
        if (scrollPosition >= threshold - 10) {
            isLoading = true; 
            loader.style.display = 'block'; 
            currentPage++; 
            renderCatalog()
        }
    }

    renderCatalog();
    
    window.addEventListener('scroll', handleScroll);

    // Обработка поиска
    document.getElementById('searchInput').addEventListener('input', function () {
        currentPage = 1; 
        loadedItems = []; 
        catalogContainer.innerHTML = ''
        clearTimeout(timeout)
            timeout = setTimeout(() => {
                updateCatalog()
            }, 2000);
    });

    // Обработка фильтрации
    document.querySelectorAll('.catalog__filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            activeFilter = this.getAttribute('data-id');
            currentPage = 1;
            loadedItems = []; 
            document.querySelectorAll('.catalog__filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            catalogContainer.innerHTML = ''
            updateCatalog()
        });
    });

    
    document.getElementById('showAllButton').addEventListener('click', function () {
        showAllItems = true;
        currentPage = 1; 
        loadedItems = [];
        renderCatalog();
    });

    // Сохранение состояния фильтра и текущей страницы
    function saveState() {
        localStorage.setItem('currentPage', currentPage);
        const url = new URL(window.location);
        url.searchParams.set('filter', activeFilter);
        window.history.replaceState(null, '', url);
    }

    // Получаем все изменения, чтобы обновить каталог
    document.addEventListener('change', () => {
        updateCatalog();
    });

    document.getElementById("sortBy").addEventListener("click", () => {
        catalogContainer.innerHTML = ''
        updateCatalog();
    });

    // Обновление каталога
    function updateCatalog() {
        saveState();
        renderCatalog();
    }

    updateCatalog();
});