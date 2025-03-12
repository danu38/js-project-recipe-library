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
    const URL = `https://api.spoonacular.com/recipes/random?number=10&apiKey=b7ce86ca197c48c491b8eadf53278878`;
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        recepiesList = data.recipes; // Store fetched recipes
        console.log("Fetched Recipes:", recepiesList); 
        renderRecepies(); // Render after fetching
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

// Render Recipes Based on Selected Filters
const renderRecepies = () => {
    const selectedCountry = filterDropdown.value;
    const selectedTime = filterDropdownTime.value;
    
    recipeCard.innerHTML = ""; // Clear previous recipes

    let filteredRecipes = recepiesList;

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

