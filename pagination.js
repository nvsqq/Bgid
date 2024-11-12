document.addEventListener('DOMContentLoaded', async function () {
    let showAllItems = false;
    let filteredItems = [];
    let activeFilter = new URLSearchParams(window.location.search).get('filter') || 'Все';
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

    const itemsPerPage = 6;
    // const items = document.querySelectorAll('.catalog__plate');
    let items = []
    const pagination = document.getElementById('pagination');
    const noResultsMessage = document.getElementById('noResultsMessage');
    
    async function getData() {
        try {
            const response = await fetch('https://672a01fc6d5fa4901b6f58b6.mockapi.io/catalog/catalog');
            const items_temp = await response.json(); 
            items_temp.forEach(item => {
                items.push(item)
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    await getData()

    function createPlate(elemNum) {
        const catalogPlate = document.createElement('div'); 
        catalogPlate.classList.add('catalog__plate');
        catalogPlate.id = filteredItems[elemNum].filter
        catalogPlate.setAttribute('data-id', filteredItems[elemNum].id)
        // catalogPlate.innerHTML = `
        // <a href="landmark.html">
        //     <img src="https://raw.githubusercontent.com/nvsqq/Bgid/refs/heads/main/assets/img/${filteredItems[elemNum].imgs[0]}" id="plate_img"></img>
        //     <div class="catalog__plate_text">
        //         <h4 class="catalog__plate_title">
        //             ${filteredItems[elemNum].title}
        //         </h4>
        //         <p class="catalog__plate_grade">${filteredItems[elemNum].grade}</p>
        //         <p class="catalog__plate_type">${filteredItems[elemNum].filter}</p>
        //         <p class="catalog__plate_description">
        //             ${filteredItems[elemNum].description}
        //         </p>
        //         <p class="catalog__plate_adress">${filteredItems[elemNum].adress}</p>
        //     </div>
        // </a>
        // `
        catalogPlate.innerHTML = `
        <button id="contactBtn" class="btn">
            <img src="./assets/img/${filteredItems[elemNum].imgs[0]}" class="catalog__container_plate_img"></img>
            <div class="catalog__plate_text">   
                <h4 class="catalog__plate_title">
                    ${filteredItems[elemNum].title}
                </h4>
                <p class="catalog__plate_type"></p>
                <p class="catalog__plate_description">
                    ${filteredItems[elemNum].description_plate }
                </p>
            </div>
        </button>
        `
        document.getElementById('catalog__container').appendChild(catalogPlate);
    }

    function createPage(elemNum) {
        document.querySelector('.catalog__container').innerHTML = '';
    }

    function renderCatalog(page) {
        currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        filteredItems = Array.from(items).filter(item => {
            const title = item.title.toLowerCase(); 
            return title.includes(searchTerm) && (activeFilter === 'Все' || item.filter === activeFilter);
        });

        document.querySelector(`button[data-id="${activeFilter}"]`).classList.add('active');
        
        filteredItems.forEach(item => {
            createPage()
            for (let i = start; i < end && i < filteredItems.length; i++) {
                createPlate(i)
            }
        });

        for (let i = start; i < end && i < items.length; i++) {
            items[i].style = 'display: flex';
        }

        if (showAllItems) {
            createPage()
            for (let i = start; i < end && i < filteredItems.length; i++) {
                createPlate(i)
            }
        }

        if (filteredItems.length === 0) {
            noResultsMessage.style.display = 'block';
            pagination.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'none';
            pagination.style.display = 'flex';
        }
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        pagination.innerHTML = '';
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
            const itemid = elem.target.closest('.catalog__plate').getAttribute('data-id')
            localStorage.setItem('item-id', itemid)
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
        showAllItems=false
    }

    updateCatalog();
});
