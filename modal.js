document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("contactBtn");
    const span = document.getElementsByClassName("close")[0];

    // Открыть модальное окно при нажатии на кнопкуЫ
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Закрыть модальное окно при нажатии на "X"
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Закрыть модальное окно при нажатии вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // отправльение формы
    document.getElementById("contactForm").onsubmit = function(event) {
        event.preventDefault();
        alert("отправлено");
        modal.style.display = "none"; 
    }
}); 