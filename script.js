/* const recepiesList = [
    {
        name: "Chicken Alfredo",
        ingredients: ["chicken", "pasta", "alfredo sauce"],
        instructions: "Cook chicken, cook pasta, mix together with alfredo sauce",
        time: 30,
        difficulty: "easy",
        country: "Italy",
        diets: ["vegan"],
        image: "https://gimmedelicious.com/wp-content/uploads/2024/10/Skinny-Chicken-Broccoli-Alfredo-1.jpg"
    },
    {
        name: "Chicken Parmesan",
        ingredients: ["chicken", "bread crumbs", "marinara sauce", "mozzarella cheese"],
        instructions: "Bread chicken, fry chicken, bake chicken with marinara sauce and cheese",
        time: 60,
        difficulty: "medium",
        country: "Italy",
        diets: ["vegan"],
        image: "https://thecleaneatingcouple.com/wp-content/uploads/2021/11/baked-chicken-parmesan-1.jpg"
    },
    {
        name: "Chicken Caesar Salad",
        ingredients: ["chicken", "romaine lettuce", "caesar dressing", "croutons", "parmesan cheese"],
        instructions: "Cook chicken, chop lettuce, mix together with dressing, croutons, and cheese",
        time: 20,
        difficulty: "easy",
        country: "USA",
        diets: ["gluten-free"],
        image: "https://feelgoodfoodie.net/wp-content/uploads/2020/04/Caesar-Salad-TIMG.jpg"
    },
    {
        name: "Chicken Fajitas",
        ingredients: ["chicken", "bell peppers", "onions", "tortillas", "salsa", "sour cream"],
        instructions: "Cook chicken, slice peppers and onions, cook together, serve on tortillas with salsa and sour cream",
        time: 40,
        difficulty: "medium",
        country: "China",
        diets: ["vegetarian"],
        image: "https://feelgoodfoodie.net/wp-content/uploads/2024/08/Chicken-Fajitas-16.jpg"
        // image: "https://www.cookingclassy.com/wp-content/uploads/2019/09/chicken-fajitas-11.jpg" 
    }
];
 */

const recipeCard = document.getElementById("container");
const filterDropdown = document.getElementById("filterDropdown");
const filterDropdownTime = document.getElementById("filterDropdownTime");

let recepiesList = []; // Store API data

//Fetch Data from Spoonacular API
const fetchRecipes = async () => {
    const URL2 = `https://api.spoonacular.com/recipes/random?number=10&apiKey=b7ce86ca197c48c491b8eadf53278878`;

    const URL1 = `https://api.spoonacular.com/recipes/complexSearch?number=10&cuisine=Asian,Italian,American&apiKey=YOUR_API_KEY`;
    const URL = `https://api.spoonacular.com/recipes/complexSearch?number=10&cuisine=Asian,Italian,American&addRecipeInformation=true&apiKey=09ec631e6f78437b8866d73dffc26edb`;


    try {
        const response = await fetch(URL);
        const data = await response.json();

        /* console.log("API Response:", data); // Debugging
        if (!data.results || data.results.length === 0) {
            console.error("No recipes found!");
            return; // Stop execution if no recipes are found
        } */


        recepiesList = data.recipes; // Store fetched recipes

        recepiesList = data.results; // Use 'results' from complexSearch API
        console.log("Fetched Recipes:", recepiesList);
        renderRecepies(); // Render after fetching
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const renderRecepies = () => {
    const selectedCountry = filterDropdown.value;
    const selectedTime = filterDropdownTime.value;

    recipeCard.innerHTML = ""; // Clear previous recipes

    // let filteredRecipes = recepiesList;
    let filteredRecipes = [...recepiesList]; // Clone the array safely

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
    filterDropdown.addEventListener("change", renderRecepies);
    filterDropdownTime.addEventListener("change", renderRecepies);
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






/* const fetchRecipes = async () => {

    const URL = `https://api.spoonacular.com/recipes/complexSearch?number=10&cuisine=Asian,Italian,American&addRecipeInformation=true&apiKey=b7ce86ca197c48c491b8eadf53278878`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        console.log("API Response:", data); // Debugging
        if (!data.results || data.results.length === 0) {
            console.error("No recipes found!");
            return; // Stop execution if no recipes are found
        }

        recepiesList = data.results; // Use 'results' from complexSearch API
        renderRecepies(); // Render after fetching
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

const renderRecepies = () => {
    if (!recepiesList || recepiesList.length === 0) {
        console.error("No data available to render.");
        return;
    }

    const selectedCountry = filterDropdown.value;
    const selectedTime = filterDropdownTime.value;

    recipeCard.innerHTML = ""; // Clear previous recipes

    let filteredRecipes = [...recepiesList]; // Clone the array safely

    // Filter by Time
    if (selectedTime !== "All") {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.readyInMinutes && (
            (selectedTime === "30" && recipe.readyInMinutes <= 30) ||
            (selectedTime === "60" && recipe.readyInMinutes > 30 && recipe.readyInMinutes <= 60) ||
            (selectedTime === "120" && recipe.readyInMinutes > 60)
        ));
    }

    // Filter by Cuisine (Check if `cuisines` exists)
    if (selectedCountry !== "All") {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.cuisines && recipe.cuisines.includes(selectedCountry) // Check if cuisines exist
        );
    }

    // Render recipes
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => {
            recipeCard.innerHTML += `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>Time: ${recipe.readyInMinutes || 'N/A'} minutes</p>
                    <p>Cuisines: ${recipe.cuisines ? recipe.cuisines.join(", ") : "Unknown"}</p>
                </div>
            `;
        });
    } else {
        recipeCard.innerHTML = `<div class="recipe-card"><h3>No recipes found matching your filters.</h3></div>`;
    }
}; */

// Render Recipes Based on Selected Filters