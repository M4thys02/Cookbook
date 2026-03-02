// Počkáme, až se načte celý obsah stránky
document.addEventListener('DOMContentLoaded', () => {
// Najdeme všechny položky seznamu v sekci <main>
const items = document.querySelectorAll('main li');

items.forEach(item => {
    item.addEventListener('click', () => {
    // Přepne třídu "done" (pokud ji nemá, přidá ji; pokud má, odebere ji)
    item.classList.toggle('done');
    });
});
});