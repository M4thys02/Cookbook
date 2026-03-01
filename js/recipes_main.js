const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("open");
    overlay.classList.toggle("show");

    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !expanded);
});

overlay.addEventListener("click", () => {
    burger.classList.remove("active");
    menu.classList.remove("open");
    overlay.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
});