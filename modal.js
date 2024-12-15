class Modal {
    constructor(modalId, btnId, closeClass, formId) {
        this.modal = document.getElementById(modalId);
        this.btn = document.getElementById(btnId);
        this.closeBtn = document.getElementsByClassName(closeClass)[0];
        this.form = document.getElementById(formId);

        this.init();
    }

   
    openModal() {
        this.modal.style.display = "block";
    }

    
    closeModal() {
        this.modal.style.display = "none";
    }

    
    submitForm(event) {
        event.preventDefault();
        alert("Отправлено");
        this.closeModal();
    }

    
    setEventListeners() {
        // Открытие модального окна при нажатии 
        this.btn.onclick = () => this.openModal();

        // Закрытие модального окна при нажатии на X
        this.closeBtn.onclick = () => this.closeModal();

        // Закрытие модального окна при клике вне его
        window.onclick = (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        };

       
        this.form.onsubmit = (event) => this.submitForm(event);
    }

 
    init() {
        this.setEventListeners();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const modal = new Modal("contactModal", "contactBtn", "close", "contactForm");
});
