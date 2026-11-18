
const API_URL =
"https://www.themealdb.com/api/json/v1/1/search.php?s=";

const foodContainer = document.getElementById("food-container");
const loading = document.getElementById("loading");

async function loadFood(search = "chicken") {

    loading.textContent = "Loading food items...";
    foodContainer.innerHTML = "";

    try {

        const response = await fetch(
            API_URL + encodeURIComponent(search)
        );

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        loading.textContent = "";

        if (!data.meals) {
            foodContainer.textContent = "No food found!";
            return;
        }

        data.meals.forEach((food, index) => {

            const price = 150 + (index * 30);

            const card = document.createElement("div");
            card.className = "food-card";

            const image = document.createElement("img");
            image.src = food.strMealThumb;
            image.alt = food.strMeal;

            const name = document.createElement("h3");
            name.textContent = food.strMeal;

            const category = document.createElement("p");
            category.textContent = food.strCategory || "Food";

            const priceText = document.createElement("h3");
            priceText.textContent = "₹" + price;

            const button = document.createElement("button");
            button.textContent = "Add to Cart";

            button.onclick = function () {

                addToCart({
                    id: food.idMeal,
                    name: food.strMeal,
                    image: food.strMealThumb,
                    price: price
                });

            };

            card.append(
                image,
                name,
                category,
                priceText,
                button
            );

            foodContainer.appendChild(card);

        });

    } catch (error) {

        loading.textContent =
            "Unable to load food. Check your internet connection.";

        console.error(error);
    }
}

function searchFood() {

    const search =
        document.getElementById("searchInput").value.trim();

    if (search) {
        loadFood(search);
    } else {
        loadFood("chicken");
    }
}

loadFood();
