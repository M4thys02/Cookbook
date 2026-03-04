const searchInput = document.getElementById('recipe-search');
const resultsList = document.getElementById('search-results');
const baseUrl = '/Cookbook'; // base URL

let recipesIndex = [];

// 1. Function for data downloading
const loadIndex = async () => {
    try {
        const response = await fetch(`${baseUrl}/search.json`);
        if (!response.ok) throw new Error('Nepodařilo se stáhnout search.json');
        
        recipesIndex = await response.json();
        console.log("Index receptů úspěšně načten:", recipesIndex.length);
    } catch (e) {
        console.error("Chyba při načítání indexu:", e);
    }
};

loadIndex();

// 2. Searching logic
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Clear old results
        resultsList.innerHTML = '';

        // Start searching from 2 letters
        if (query.length < 2 || recipesIndex.length === 0) {
            return;
        }

        // 3. Filtering in memory
        const filtered = recipesIndex.filter(recipe => 
            (recipe.title && recipe.title.toLowerCase().includes(query)) || 
            (recipe.category && recipe.category.toLowerCase().includes(query))
        );

        // 4. Results to HTML
        if (filtered.length > 0) {
            filtered.forEach(recipe => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="${recipe.url}">
                        ${recipe.title} 
                        <span style="font-size: 0.8em; opacity: 0.7;">(${recipe.category})</span>
                    </a>
                `;
                resultsList.appendChild(li);
            });
        } else {
            // Nothing was found
            const li = document.createElement('li');
            li.style.padding = "10px";
            li.style.color = "#888";
            li.textContent = "Žádný recept neodpovídá zadání...";
            resultsList.appendChild(li);
        }
    });
}