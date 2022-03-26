

function Toggle() { }
Toggle.prototype.toggleMethod = function toggleMethod() {

    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    const menuLink = document.querySelectorAll('.nav-link');
    if (hamburger && menu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        menuLink.forEach((n => n.addEventListener('click', function () {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        })))
    }


};
var toggleMenu = new Toggle();

export { toggleMenu };


