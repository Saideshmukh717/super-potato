document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.getElementById('cart');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cart-items');
    const closeCartButton = document.querySelector('.close');
    const checkoutButton = document.getElementById('checkout');

    // Load cart data from localStorage
    let cart = loadCartFromStorage();

    function openCartModal() {
        displayCart();
        cartModal.style.display = 'block';
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    function displayCart() {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItemsContainer.appendChild(cartItem);
            totalAmount += item.price * item.quantity;
        });
        cartItemsContainer.innerHTML += `<p>Total: $${totalAmount.toFixed(2)}</p>`;
        
        // Add event listeners for incrementing and decrementing quantity
        cartItemsContainer.querySelectorAll('.decrement-quantity').forEach(button => {
            button.addEventListener('click', function(event) {
                const name = event.target.dataset.name;
                cart.forEach(item => {
                    if (item.name === name && item.quantity > 1) {
                        item.quantity--;
                    }
                });
                saveCartToStorage(cart); // Save cart data to localStorage
                displayCart(); // Update cart display after quantity change
                updateCartButton();
            });
        });

        cartItemsContainer.querySelectorAll('.increment-quantity').forEach(button => {
            button.addEventListener('click', function(event) {
                const name = event.target.dataset.name;
                cart.forEach(item => {
                    if (item.name === name) {
                        item.quantity++;
                    }
                });
                saveCartToStorage(cart); // Save cart data to localStorage
                displayCart(); // Update cart display after quantity change
                updateCartButton();
            });
        });
    }

    function createCartItem(item) {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - 
                <button class="decrement-quantity" data-name="${item.name}">(-)</button>
                ${item.quantity}
                <button class="increment-quantity" data-name="${item.name}">(+) </button>
                - $${item.price * item.quantity}
            </p>
            <button class="remove-from-cart" data-name="${item.name}">Remove</button>
        `;
        return cartItem;
    }

    function updateCartButton() {
        const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartButton.textContent = `Cart (${totalQuantity})`;
    }

    function addToCart(name, price) {
        let found = false;
        cart.forEach(item => {
            if (item.name === name) {
                item.quantity++;
                found = true;
            }
        });
        if (!found) {
            cart.push({ name, price, quantity: 1 });
        }
        saveCartToStorage(cart); // Save cart data to localStorage
        updateCartButton();
        displayCart();
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            addToCart(name, price);
        } else if (event.target.classList.contains('remove-from-cart')) {
            const name = event.target.dataset.name;
            cart = cart.filter(item => item.name !== name);
            saveCartToStorage(cart); // Save cart data to localStorage
            displayCart();
            updateCartButton();
        }
    });

    checkoutButton.addEventListener('click', function () {
        alert('Thank you for your purchase!');
        cart = [];
        saveCartToStorage(cart); // Save cart data to localStorage
        updateCartButton();
        closeCartModal();
    });

    cartButton.addEventListener('click', openCartModal);
    closeCartButton.addEventListener('click', closeCartModal);
});

// Function to save cart data to localStorage
function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart data from localStorage
function loadCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}
