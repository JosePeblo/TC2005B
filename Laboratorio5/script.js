const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-links');
const modal = document.getElementById('modal');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active');
});

const notice = () => {
    modal.classList.toggle('is-active');
}