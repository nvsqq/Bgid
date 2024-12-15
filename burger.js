class Menu {
    constructor(menuSelector, menuBtnSelector) {
        this.menu = document.querySelector(menuSelector);
        this.menuBtn = document.querySelector(menuBtnSelector);
        
        if (this.menu && this.menuBtn) {
            this.init();
        }
    }

    toggleMenu() {
        this.menu.classList.toggle('active');
        this.menuBtn.classList.toggle('active');
    }

    closeMenu() {
        this.menu.classList.remove('active');
        this.menuBtn.classList.remove('active');
    }

    addEventListeners() {
        this.menuBtn.addEventListener('click', () => this.toggleMenu());

        this.menu.addEventListener('click', (e) => {
            if (e.target === this.menu) {
                this.closeMenu();
            }
        });

        this.menu.querySelectorAll('.menu__link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    init() {
        this.addEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menu = new Menu('.menu__body', '.menu__icon');
});
