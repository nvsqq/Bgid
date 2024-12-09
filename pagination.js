document.addEventListener('DOMContentLoaded', async function () {
    let showAllItems = false;
    let filteredItems = [];
    let activeFilter = new URLSearchParams(window.location.search).get('filter') || 'Все';
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

    const itemsPerPage = 10;
    let items = [];
    const pagination = document.getElementById('pagination');
    const noResultsMessage = document.getElementById('noResultsMessage');

    async function getData() {
        try {
            const response = await fetch('https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog');
            const items_temp = await response.json(); 
            items_temp.forEach(item => {
                items.push(item);
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    await getData(); 

    activeFilter = 'Все';
    localStorage.setItem('currentPage', 1);
    document.querySelectorAll('.catalog__filter-btn').forEach(btn => btn.classList.remove('active'));
    const allButton = document.querySelector('[data-id="Все"]');
    if (allButton) {
        allButton.classList.add('active');
    }

    function createPlate(elemNum) {
        const catalogPlate = document.createElement('div'); 
        catalogPlate.classList.add('catalog__plate');
        catalogPlate.id = filteredItems[elemNum].filtr;  
        catalogPlate.setAttribute('data-id', filteredItems[elemNum].id);
        catalogPlate.innerHTML = `
        <button id="contactBtn" class="btn">
        <a href="./attractions.html">
            <img src="${filteredItems[elemNum].imgs[0]}" class="catalog__container_plate_img"></img>
            <div class="catalog__plate_text">   
                <h4 class="catalog__plate_title">
                    ${filteredItems[elemNum].title}
                </h4>
                <p class="catalog__plate_type">${filteredItems[elemNum].filtr}</p>
                <p class="catalog__plate_description">
                    ${filteredItems[elemNum].description_plate}
                </p>
            </div>
        </a>
        </button>
        `;
        document.getElementById('catalog__container').appendChild(catalogPlate);
    }

    function createPage() {
        document.querySelector('.catalog__container').innerHTML = '';
    }

    
    document.querySelectorAll('.catalog__container').forEach(plate => {
        plate.addEventListener('click', function (elem) {
            const itemid = elem.target.closest('.catalog__plate').getAttribute('data-id')
            localStorage.setItem('item-id', itemid)
        });
    });


    function renderCatalog(page) {
        currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        filteredItems = Array.from(items).filter(item => {
            const title = item.title.toLowerCase(); 
            return title.includes(searchTerm) && (activeFilter == 'Все' || item.filtr === activeFilter);
        });

        createPage(); 

        for (let i = start; i < end && i < filteredItems.length; i++) {
            createPlate(i);
        }

        if (filteredItems.length === 0) {
            noResultsMessage.style.display = 'block';
            pagination.style.display = 'none';
            document.getElementById('catalog__container').style.display = 'none';
        } else {
            noResultsMessage.style.display = 'none';
            pagination.style.display = 'flex';
            document.getElementById('catalog__container').style.display = 'grid';
        }
    }

   
    function renderPagination() {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        pagination.innerHTML = '';
    
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('pagination__button');
            if (i === currentPage) {
                pageButton.classList.add('active'); 
            }
            pageButton.addEventListener('click', function () {
                currentPage = i;
                updateCatalog();
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth' // Это как катание на круизном лайнере 🛥️
                  });
                  
            });
            pagination.appendChild(pageButton);
        }
    }

    function saveState() {
        localStorage.setItem('currentPage', currentPage);
        const url = new URL(window.location);
        url.searchParams.set('filter', activeFilter);
        window.history.replaceState(null, '', url);
    }

    document.getElementById('searchInput').addEventListener('input', function () {
        currentPage = 1; 
        updateCatalog();
    });

    document.querySelectorAll('.catalog__filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            activeFilter = this.getAttribute('data-id');
            currentPage = 1; 
            document.querySelectorAll('.catalog__filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateCatalog();
        });
    });

    document.querySelectorAll('.catalog__container').forEach(plate => {
        plate.addEventListener('click', function (elem) {
            const itemid = elem.target.closest('.catalog__plate').getAttribute('data-id');
            localStorage.setItem('item-id', itemid);
        });
    });

    document.getElementById('showAllButton').addEventListener('click', function () {
        showAllItems = true;
        updateCatalog();
    });

    function updateCatalog() {
        saveState();
        renderCatalog(currentPage);
        renderPagination();
        showAllItems = false;
    }

    updateCatalog();
});