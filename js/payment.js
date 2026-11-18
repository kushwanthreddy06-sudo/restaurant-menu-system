
const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {

    const cart = getCart();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("checkout-total").textContent =
        "Total Amount: ₹" + total;

    if (cart.length === 0) {

        paymentForm.innerHTML =
            "<h3>Your cart is empty! Please add food first.</h3>";

    } else {

        paymentForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const name =
                document.getElementById("customerName").value.trim();

            const mobile =
                document.getElementById("mobile").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );

            if (!selectedPayment) {
                alert("Please select a payment method");
                return;
            }

            const paymentMethod = selectedPayment.value;

            const order = {

                orderId: "ORD" + Date.now(),

                customer: name,

                mobile: mobile,

                address: address,

                paymentMethod: paymentMethod,

                total: total,

                items: cart,

                status: paymentMethod === "Cash on Delivery"
                    ? "Confirmed - Pay on Delivery"
                    : "Demo Payment Successful"

            };

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );

            localStorage.removeItem("cart");

            window.location.href = "payment-success.html";

        });
    }
}
