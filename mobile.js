// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in UI
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} has been added to the cart!`);
}

// View cart items
function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        let cartDetails = cart.map(item => `${item.name} - $${item.price}`).join("\n");
        alert("Your Cart:\n" + cartDetails);
    }
}

// Handle registration
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.some(user => user.email === email)) {
        alert("Email already registered.");
    } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        $("#registerModal").modal("hide");
    }
});

// Handle login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", email);
        alert("Login successful!");
        $("#loginModal").modal("hide");
        updateUI();
    } else {
        alert("Invalid email or password.");
    }
});

// Show order modal
function openOrderModal() {
    let orderList = document.getElementById("orderItemsList");
    orderList.innerHTML = "";

    cart.forEach((item, index) => {
        orderList.innerHTML += `
            <input type="radio" name="orderItem" value="${index}" id="item${index}">
            <label for="item${index}">${item.name} - $${item.price}</label><br>
        `;
    });

    $("#orderModal").modal("show");
}

// Confirm order
document.getElementById("orderForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let selectedItemIndex = document.querySelector('input[name="orderItem"]:checked');

    if (selectedItemIndex) {
        alert("Order placed for: " + cart[selectedItemIndex.value].name);
        cart.splice(selectedItemIndex.value, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        $("#orderModal").modal("hide");
    }
});

updateCartCount();
