const recepiesList = [
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




const recipeCard = document.getElementById("container");

const filterDropDown = document.getElementById("filterDropdown");


const renderRecepies = () => {

    const selectedCountry = filterDropDown.value; // Get selected value
    //console.log(selectedCountry);
    recipeCard.innerHTML = ""; // Clear existing recipes

    if (selectedCountry === "All") {
        recepiesList.forEach(recipe => {


            recipeCard.innerHTML += `<div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>Time: ${recipe.time} minutes</p>
                <p>Difficulty: ${recipe.difficulty}</p>
                <p>Country: ${recipe.country}</p>
                    </div>   `;

        });
    } else {
        recepiesList.forEach(recipe => {
            if (recipe.country === selectedCountry) {
                recipeCard.innerHTML += `<div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p>Time: ${recipe.time} minutes</p>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p>Country: ${recipe.country}</p>
            </div>   `;

            }
        });

    }
}

filterDropdown.addEventListener("change", renderRecepies);
renderRecepies();
//////////////////////////////////////////////////////
// ////////Filter by time/////////////////////////////
//////////////////////////////////////////////////////
const filterDropDownTime = document.getElementById("filterDropdownTime");

const renderRecepiesTime = () => {

    const selectedTime = filterDropDownTime.value; // Get selected value
    console.log(selectedTime);
    recipeCard.innerHTML = ""; // Clear existing recipes

    recepiesList.forEach(recipe => {
        if (
            selectedTime === "All" || // Show all if "All" is selected
            (selectedTime === "30" && recipe.time <= 30) ||  // 0 to 30 minutes
            (selectedTime === "60" && recipe.time > 30 && recipe.time <= 60) || // 30 to 60 minutes
            (selectedTime === "120" && recipe.time > 60) // More than 60 minutes
        ) {
            recipeCard.innerHTML += `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                    <p>Time: ${recipe.time} minutes</p>
                    <p>Difficulty: ${recipe.difficulty}</p>
                    <p>Country: ${recipe.country}</p>
                </div>
            `;
        }else{
            recipeCard.innerHTML = `<div class="recipe-card">
            
            <h3>No any receipies found matching with your filter</h3>
            
                </div>   `;
        }
    });
}

filterDropDownTime.addEventListener("change", renderRecepiesTime);
renderRecepiesTime();