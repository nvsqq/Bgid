class Preloader {
    constructor(preloaderId, hideDelay = 400) {
        this.preloader = document.getElementById(preloaderId);
        this.hideDelay = hideDelay; 
    }

    
    hide() {
        setTimeout(() => {
            this.preloader.style.display = "none";
        }, this.hideDelay);
    }

 
    init() {
        window.onload = () => this.hide();
    }
}


const preloader = new Preloader('preloader');
preloader.init();
