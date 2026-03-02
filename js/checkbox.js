document.addEventListener('DOMContentLoaded', () => {
const items = document.querySelectorAll('main li');

items.forEach(item => {
    item.addEventListener('click', () => {
    item.classList.toggle('done');
    });
});
});