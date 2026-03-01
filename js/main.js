const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");
const searchInput = document.getElementById('recipe-search');
const resultsList = document.getElementById('search-results');

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

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase();
        
        // 1. Load searching index
        const response = await fetch('/kucharka/search.json'); // Dont forget base URL
        const recipes = await response.json();

        // 2. Clean up old results
        resultsList.innerHTML = '';

        if (query.length < 2) return; // Search start from two literals

        // 3. Filtering
        const filtered = recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query) || 
            recipe.category.toLowerCase().includes(query)
        );

        // 4. Showing up results
        filtered.forEach(recipe => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${recipe.url}">${recipe.title} <span>(${recipe.category})</span></a>`;
            resultsList.appendChild(li);
        });
    });
}