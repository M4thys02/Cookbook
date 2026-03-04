const searchInput = document.getElementById('recipe-search');
const resultsList = document.getElementById('search-results');

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase();
        
        // 1. Load searching index
        const response = await fetch('/Cookbook/search.json'); // Dont forget base URL
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