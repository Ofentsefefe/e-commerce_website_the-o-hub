// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();
    updateCartCount();

    // Checkout button event listener
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });
    }
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fal fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="shop.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">R${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">
                R${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.dataset.id);
            removeFromCart(productId);
            loadCartItems();
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.dataset.id);
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let quantity = parseInt(input.value) - 1;
            input.value = quantity;
            updateCartQuantity(productId, quantity);
            loadCartItems();
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.dataset.id);
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let quantity = parseInt(input.value) + 1;
            input.value = quantity;
            updateCartQuantity(productId, quantity);
            loadCartItems();
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function () {
            const productId = parseInt(this.dataset.id);
            const quantity = parseInt(this.value);
            updateCartQuantity(productId, quantity);
            loadCartItems();
        });
    });

    updateCartSummary();
}

function updateCartSummary() {
    const cart = getCart();
    const totals = calculateCartTotals();

    document.getElementById('cart-subtotal').textContent = `R${totals.subtotal}`;
    document.getElementById('cart-shipping').textContent = `R${totals.shipping}`;
    document.getElementById('cart-tax').textContent = `R${totals.tax}`;
    document.getElementById('cart-total').textContent = `R${totals.total}`;

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}