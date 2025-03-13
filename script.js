const recipeCard = document.getElementById("container");
const filterDropdown = document.getElementById("filterDropdown");
const filterDropdownTime = document.getElementById("filterDropdownTime");

let recepiesList = []; // Store API data

// Fetch Data from Spoonacular API
const fetchRecipes = async () => {
    const URL2 = `https://api.spoonacular.com/recipes/random?number=10&apiKey=b7ce86ca197c48c491b8eadf53278878`;

    const URL1 = `https://api.spoonacular.com/recipes/complexSearch?number=10&cuisine=Asian,Italian,American&apiKey=09ec631e6f78437b8866d73dffc26edb`;
    const URL = `https://api.spoonacular.com/recipes/complexSearch?number=10&cuisine=Asian,Italian,American&addRecipeInformation=true&apiKey=b7ce86ca197c48c491b8eadf53278878`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            alert("API quota exceeded or an error occurred. Please try again later.");
            return; // Stop execution
        }

        const data = await response.json();

        console.log("API Response:", data); // Debugging
        if (!data.results || data.results.length === 0) {
            console.error("No recipes found!");
            return; // Stop execution if no recipes are found
        }

        recepiesList = data.results; // Use 'results' from complexSearch API
        console.log("Fetched Recipes:", recepiesList);
        renderRecepies(); // Render after fetching
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const renderRecepies = (recipes = recepiesList) => {
    const selectedCountry = filterDropdown.value;
    const selectedTime = filterDropdownTime.value;

    recipeCard.innerHTML = ""; // Clear previous recipes

    let filteredRecipes = [...recipes]; // Clone the array safely

    // Filter by Time
    if (selectedTime !== "All") {
        filteredRecipes = filteredRecipes.filter(recipe => {
            const time = recipe.readyInMinutes || 0; // Ensure time exists
            return (selectedTime === "30" && time <= 30) ||
                (selectedTime === "60" && time > 30 && time <= 60) ||
                (selectedTime === "120" && time > 60);
        });
    }

    // Filter by Cuisine (Ensure cuisines exist)
    if (selectedCountry !== "All") {
        filteredRecipes = filteredRecipes.filter(recipe =>
            Array.isArray(recipe.cuisines) && recipe.cuisines.includes(selectedCountry)
        );
    }

    // Display Filtered Recipes
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => {
            recipeCard.innerHTML += `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>Time: ${recipe.readyInMinutes || "Unknown"} minutes</p>
                    <p>Cuisines: ${recipe.cuisines ? recipe.cuisines.join(", ") : "Unknown"}</p>
                    <p>Diets: ${recipe.diets ? recipe.diets.join(", ") : "Unknown"}</p>
                    <p>Very Popular: ${recipe.veryPopular}</p>
                </div>
            `;
        });
    } else {
        recipeCard.innerHTML = `<div class="recipe-card">
            <h3>No recipes found matching your filters.</h3>
        </div>`;
    }
};

// Fetch API Data and Set Up Filters
fetchRecipes().then(() => {
    filterDropdown.addEventListener("change", () => renderRecepies());
    filterDropdownTime.addEventListener("change", () => renderRecepies());
});

const sortAscButton = document.getElementById("sort-asc");
const sortDescButton = document.getElementById("sort-desc");
const sortTimeButton = document.getElementById("sort-time");

const sortReceipecs = (order) => {
    if (order === "time") {
        recepiesList.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    } else {
        recepiesList.sort((a, b) => {
            if (order === "asc") {
                return a.veryPopular - b.veryPopular;
            } else {
                return b.veryPopular - a.veryPopular;
            }
        });
    }
    renderRecepies();
};

sortAscButton.addEventListener("click", () => sortReceipecs("asc"));
sortDescButton.addEventListener("click", () => sortReceipecs("desc"));
sortTimeButton.addEventListener("click", () => sortReceipecs("time"));

const searchInput = document.getElementById("searchInput");

const searchRecepies = () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredRecepies = recepiesList.filter(recipe =>
        recipe.title && recipe.title.toLowerCase().includes(searchValue) // Check if `title` exists
    );
    console.log(filteredRecepies);
    renderRecepies(filteredRecepies);
};

searchInput.addEventListener("input", searchRecepies);

// Render Recipes Based on Selected Filters

const randomButton = document.getElementById("random-btn");
const randomReceipie = () => {
    const randomRecipe = Math.floor(Math.random() * recepiesList.length);
    console.log("Random Recipe:", recepiesList[randomRecipe]);
    renderRecepies([recepiesList[randomRecipe]]);
};
randomButton.addEventListener("click", randomReceipie);

function updatePlaceholder() {
    let selectedCountry = document.getElementById("filterDropdown").value;
    let selectedTime = document.getElementById("filterDropdownTime").value;
    let placeholder = document.getElementById("placeholder");

    let placeholderText = "None";

    if (selectedCountry !== "All Cuisines" || selectedTime !== "All Time durations") {
        placeholderText = `Cuisine : ${selectedCountry} , Time : ${selectedTime}`;
    }

    placeholder.innerHTML = placeholderText;
}

document.getElementById("filterDropdown").addEventListener("change", updatePlaceholder);
document.getElementById("filterDropdownTime").addEventListener("change", updatePlaceholder);

updatePlaceholder();


document.getElementById("clearFilters").addEventListener("click", () => {
    // Reset dropdowns
    document.getElementById("filterDropdown").value = "All";
    document.getElementById("filterDropdownTime").value = "All";

    // Trigger change event to update the displayed text
    document.getElementById("filterDropdown").dispatchEvent(new Event("change"));
    document.getElementById("filterDropdownTime").dispatchEvent(new Event("change"));

    // Clear placeholder
    document.getElementById("placeholder").innerHTML = "None";

    // Reset sorting (you might need to update the button styles too)
    document.querySelectorAll(".sort-btn").forEach(btn => btn.classList.remove("active"));

    // Reload all recipes (assuming fetchReceipes fetches all recipes)
    fetchRecipes();
});

