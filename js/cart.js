
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(food) {

    let cart = getCart();

    const existing = cart.find(item => item.id === food.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert(food.name + " added to cart!");
}

function updateCartCount() {

    const element = document.getElementById("cart-count");

    if (element) {

        const count = getCart().reduce(
            (sum, item) => sum + item.quantity, 0
        );

        element.textContent = count;
    }
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) return;

    const cart = getCart();

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is empty!";

        document.getElementById("total").textContent =
            "Total: ₹0";

        document.getElementById("checkout-btn").style.display =
            "none";

        return;
    }

    document.getElementById("checkout-btn").style.display =
        "inline-block";

    cart.forEach((item, index) => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const div = document.createElement("div");
        div.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + item.price;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const subtotalText = document.createElement("p");
        subtotalText.textContent = "Subtotal: ₹" + subtotal;

        const minus = document.createElement("button");
        minus.textContent = "-";
        minus.onclick = () => changeQuantity(index, -1);

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.onclick = () => changeQuantity(index, 1);

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = () => removeItem(index);

        details.append(
            name, price, quantity, subtotalText,
            minus, plus, remove
        );

        div.append(image, details);

        cartItems.appendChild(div);

    });

    document.getElementById("total").textContent =
        "Total Amount: ₹" + total;
}

function changeQuantity(index, change) {

    let cart = getCart();

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);

    displayCart();
    updateCartCount();
}

function removeItem(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();
    updateCartCount();
}

updateCartCount();
displayCart();
