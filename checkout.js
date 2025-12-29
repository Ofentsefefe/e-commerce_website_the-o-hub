// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutItems();
    setupCheckoutSteps();
    setupTermsModal();
    updateCartCount();

    // Back to cart button
    const backToCartBtn = document.getElementById('back-to-cart');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function () {
            window.location.href = 'cart.html';
        });
    }
});

function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const cart = getCart();

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                <div class="checkout-item-price">R${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div class="checkout-item-total">
                R${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const totals = calculateCartTotals();

    document.getElementById('checkout-subtotal').textContent = `R${totals.subtotal}`;
    document.getElementById('checkout-shipping').textContent = `R${totals.shipping}`;
    document.getElementById('checkout-tax').textContent = `R${totals.tax}`;
    document.getElementById('checkout-total').textContent = `R${totals.total}`;
}

function setupCheckoutSteps() {
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextToPaymentBtn = document.getElementById('next-to-payment');
    const backToShippingBtn = document.getElementById('back-to-shipping');
    const nextToConfirmBtn = document.getElementById('next-to-confirm');
    const termsCheckbox = document.getElementById('terms');

    // Next to payment step
    if (nextToPaymentBtn) {
        nextToPaymentBtn.addEventListener('click', function () {
            // Validate shipping form
            const shippingForm = document.getElementById('step-1');
            const inputs = shippingForm.querySelectorAll('input, select');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                switchStep(1, 2);
            } else {
                showNotification('Please fill all required fields');
            }
        });
    }

    // Back to shipping step
    if (backToShippingBtn) {
        backToShippingBtn.addEventListener('click', function () {
            switchStep(2, 1);
        });
    }

    // Complete payment
    if (nextToConfirmBtn) {
        nextToConfirmBtn.addEventListener('click', function () {
            if (termsCheckbox.checked) {
                // Process payment (simulated)
                processPayment();
            } else {
                showNotification('Please accept the terms and conditions');
            }
        });
    }
}

function switchStep(current, next) {
    // Update steps UI
    document.querySelector(`.step[data-step="${current}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${next}"]`).classList.add('active');

    // Update form steps
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${next}`).classList.add('active');
}

function setupTermsModal() {
    const termsLink = document.getElementById('terms-link');
    const termsModal = document.getElementById('terms-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const acceptTermsBtn = document.getElementById('accept-terms');
    const termsCheckbox = document.getElementById('terms');
    const modalTermsCheckbox = document.getElementById('modal-terms');

    // Open modal
    if (termsLink) {
        termsLink.addEventListener('click', function (e) {
            e.preventDefault();
            termsModal.style.display = 'block';
        });
    }

    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            termsModal.style.display = 'none';
        });
    });

    // Accept terms from modal
    if (acceptTermsBtn) {
        acceptTermsBtn.addEventListener('click', function () {
            if (modalTermsCheckbox.checked) {
                termsCheckbox.checked = true;
                termsModal.style.display = 'none';
            } else {
                showNotification('Please confirm you have read the terms');
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });
}

function processPayment() {
    // Simulate payment processing
    showNotification('Processing payment...');

    setTimeout(() => {
        // Clear cart
        saveCart([]);

        // Generate random order number
        const orderNumber = 'OH-' + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('order-number').textContent = orderNumber;

        // Calculate delivery date (3-5 business days from now)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('delivery-date').textContent = deliveryDate.toLocaleDateString('en-ZA', options);

        // Go to confirmation step
        switchStep(2, 3);
    }, 2000);
}