document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 6;
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
    let showAllItems = false;
    let filteredItems = [];
    let activeFilter = localStorage.getItem('selectedFilter') || 'Все';

    const items = document.querySelectorAll('.catalog__plate');
    const pagination = document.getElementById('pagination');
    const noResultsMessage = document.getElementById('noResultsMessage');

    function renderCatalog(page) {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const savedFilter = localStorage.getItem('selectedFilter');

        if (savedFilter) {
            const filterButton = document.querySelector(`button[data-id="${savedFilter}"]`);
            if (filterButton) {
                filterButton.click();
            }
        }

        filteredItems = Array.from(items).filter(item => {
            const titleElement = item.querySelector('.catalog__plate_title');
            const title = titleElement.textContent.toLowerCase();
            return title.includes(searchTerm) && (activeFilter === 'Все' || item.id === activeFilter);
        });

        items.forEach(item => item.style.display = 'none');
        filteredItems.forEach(item => item.querySelector('.catalog__plate_type').innerHTML = item.id);

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        for (let i = start; i < end && i < filteredItems.length; i++) {
            filteredItems[i].style.display = 'flex';
        }

        if (showAllItems) {
            items.forEach(item => item.style.display = 'flex');
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

        
        

        // кнопки
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.toggle('active', i === currentPage);
            pageButton.addEventListener('click', () => {
                currentPage = i;
                updateCatalog();
            });
            pagination.appendChild(pageButton);
        }

        
        
    }

    // сохранение фильтров и пагинация
    function saveState() {
        localStorage.setItem('selectedFilter', activeFilter);
        localStorage.setItem('currentPage', currentPage);
    }

    document.getElementById('searchInput').addEventListener('input', function () {
        updateCatalog();
    });

    document.querySelectorAll('.catalog__filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.catalog__filter-btn').forEach(button => {
                button.classList.remove('active');
            });
            activeFilter = this.getAttribute('data-id');
            this.classList.add('active');
            updateCatalog();
        });
    });

    function set_first_page() {
        currentPage=1
    }

    document.getElementById('showAllButton').addEventListener('click', function () {
        showAllItems = true;
        updateCatalog();
    });

    function updateCatalog() {
        showAllItems = false;
        saveState(); 
        renderCatalog(currentPage);
        renderPagination();
    }

    updateCatalog();
});

