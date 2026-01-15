// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});
// Initialize Application
function initializeApp() {
    // Initialize navigation
    initNavigation();

    // Load products
    loadFeaturedProducts();
    loadNewProducts();

    // Initialize cart functionality
    initCart();

    // Initialize newsletter form
    initNewsletter();
}

// Navigation Toggle
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Product Data
const products = [
    {
        id: 1,
        name: "Cartoon Astronaut T-Shirts",
        category: "adidas",
        price: 199,
        image: "photo/products/f1.jpg",
        rating: 5,
        featured: true,
        new: false
    },
    {
        id: 2,
        name: "Men's Casual Shirt",
        category: "Zara",
        price: 299,
        image: "photo/products/f2.jpg",
        rating: 4,
        featured: true,
        new: false
    },
    {
        id: 3,
        name: "Women's Summer Dress",
        category: "H&M",
        price: 399,
        image: "photo/products/f3.jpg",
        rating: 5,
        featured: true,
        new: false
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "Nike",
        price: 599,
        image: "photo/products/f4.jpg",
        rating: 4,
        featured: true,
        new: false
    },
    {
        id: 5,
        name: "Wireless Headphones",
        category: "Sony",
        price: 799,
        image: "photo/products/f5.jpg",
        rating: 5,
        featured: false,
        new: true
    },
    {
        id: 6,
        name: "Smart Watch",
        category: "Apple",
        price: 1299,
        image: "photo/products/f6.jpg",
        rating: 4,
        featured: false,
        new: true
    },
    {
        id: 7,
        name: "Backpack",
        category: "Puma",
        price: 499,
        image: "photo/products/f7.jpg",
        rating: 4,
        featured: false,
        new: true
    },
    {
        id: 8,
        name: "Sunglasses",
        category: "Ray-Ban",
        price: 349,
        image: "photo/products/f8.jpg",
        rating: 5,
        featured: false,
        new: true
    }
];

// Load Featured Products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = products.filter(product => product.featured);

    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="product-badge">Featured</span>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                </div>
                <div class="product-price">
                    <div class="price">R${product.price}</div>
                    <button class="add-to-cart" aria-label="Add to cart">
                        <i class="fal fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to add-to-cart buttons
    initAddToCartButtons();
}

// Load New Products
function loadNewProducts() {
    const newContainer = document.getElementById('new-products');
    if (!newContainer) return;

    const newProducts = products.filter(product => product.new);

    newContainer.innerHTML = newProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="product-badge">New</span>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                </div>
                <div class="product-price">
                    <div class="price">R${product.price}</div>
                    <button class="add-to-cart" aria-label="Add to cart">
                        <i class="fal fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to add-to-cart buttons
    initAddToCartButtons();
}

// Get Rating Stars
function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Initialize Cart
function initCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Initialize Add to Cart Buttons
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            addToCart(productId);
        });
    });
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <p>${message}</p>
    `;

    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'all 0.3s ease';
    notification.style.transform = 'translateX(100px)';
    notification.style.opacity = '0';

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize Newsletter Form
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (isValidEmail(email)) {
            // Here you would typically send the email to your server
            showNotification('Thanks for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.');
        }
    });
}

// Validate Email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Cart Functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });

    return totalItems;
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showNotification('Item removed from cart');
}

function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }

    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity;
        saveCart(cart);
    }
}

function calculateCartTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0; // R50 shipping for non-empty carts
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + shipping + tax;

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };

}
