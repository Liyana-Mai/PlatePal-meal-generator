// Typewriter Effect Function
function typewriterEffect(text, elementId, delay = 100) {
    const element = document.querySelector(`#${elementId}`);
    let index = 0; 

   
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index); 
            index++; 
            setTimeout(type, delay); 
        }
    }

    type(); 
}


document.addEventListener("DOMContentLoaded", () => {
    const welcomeText = "Your personalized meal planning assistant! 🍳"; // The text to animate
    typewriterEffect(welcomeText, "welcome-message"); // Call the effect on the #welcome-message element
});


const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
const apiKey = '46d4d93390804406add0193f283e0e0c';

async function generateMealPlan(event) {
    event.preventDefault();

    const craving = document.querySelector(".prompt").value;
    if (!craving) {
        alert("Please enter something you're craving!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?query=${craving}&number=6&apiKey=${apiKey}`);
        const data = await response.json();
        console.log(data); // Log the response data for debugging

        if (data && data.results && data.results.length > 0) {
            displayMealPlan(data.results);
        } else {
            document.getElementById("mealPlan").innerHTML = "<p>No recipes found. Please try a different craving!</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("mealPlan").innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}

function displayMealPlan(recipes) {
    const mealPlanContainer = document.getElementById("mealPlan");
    mealPlanContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("recipe");
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <p>Source: <a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a></p>
        `;
        mealPlanContainer.appendChild(recipeElement);
    });
}

document.getElementById("platepal-form").addEventListener("submit", generateMealPlan);



window.onload = function() {
    document.querySelector(".prompt").focus();
};