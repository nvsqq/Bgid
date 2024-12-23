document.addEventListener('DOMContentLoaded', function () {
    const acc = document.querySelectorAll('.accordion-btn');
    const allPanel = document.querySelectorAll('.panel')
    console.log(allPanel)
    acc.forEach(button => {
        button.addEventListener('click', function () {
            const panel = this.nextElementSibling;
            const old_display = panel.style.display
            allPanel.forEach((elem) => {
                elem.style.display = 'none'
                console.log(elem)
            })
            if (old_display !== 'block') {
                panel.style.display = 'block';
            }
        });
    });
});
