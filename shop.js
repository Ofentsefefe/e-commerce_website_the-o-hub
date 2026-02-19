// Shop Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeShop();
});

function initializeShop() {
    loadAllProducts();
    setupShopFilters();
    setupSearch();
    setupViewOptions();
    updateCartCount();
    updateWishlistCount();
}

// Enhanced product data with variations
const shopProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "phones",
        brand: "apple",
        price: 15499.99,
        originalPrice: 16999.99,
        image: "src/products/iphones/iphone_15_pro/iphone_15_pro_blue_512gb.jpg",
        images: [
            "src/products/iphones/iphone_15_pro/iphone_15_pro_blue_512gb.jpg",
            "src/products/iphones/iphone_15_pro/iphon_15_pro_white.jpg",
            "src/products/iphones/iphone_15_pro/iphone_15_pro_natural.jpg"
        ],
        rating: 5,
        reviewCount: 124,
        featured: true,
        inStock: true,
        variations: {
            colors: [
                { name: "Natural Titanium", value: "natural-titanium", image: "assets/products/iphones/iphone_15_pro_blue_512gb.jpg" },
                { name: "Blue Titanium", value: "blue-titanium", image: "photo/products/iphone15-pro-blue.jpg" },
                { name: "White Titanium", value: "white-titanium", image: "photo/products/iphone15-pro-white.jpg" },
                { name: "Black Titanium", value: "black-titanium", image: "photo/products/iphone15-pro-black.jpg" }
            ],
            storage: [
                { name: "128GB", value: "128gb", price: 100 },
                { name: "256GB", value: "256gb", price: 2000 },
                { name: "512GB", value: "512gb", price: 4000 },
                { name: "1TB", value: "1tb", price: 6000 }
            ]
        },
        description: "The most advanced iPhone with Titanium design and powerful A17 Pro chip."
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        category: "phones",
        brand: "samsung",
        price: 13999.99,
        originalPrice: 14999.99,
        image: "src/products/sumsang_phones/s24/sumsang_s24ultra_violet.jpg",
        images: [
            "src/products/sumsang_phones/s24/s24_yellow.jpg",
            "src/products/samsung-s24-ultra-2.jpg"
        ],
        rating: 4,
        reviewCount: 89,
        featured: true,
        inStock: true,
        variations: {
            colors: [
                { name: "Titanium Black", value: "black", image: "src/products/samsung-s24-black.jpg" },
                { name: "Titanium Gray", value: "gray", image: "src/products/samsung-s24-gray.jpg" },
                { name: "Titanium Violet", value: "violet", image: "src/products/samsung-s24-violet.jpg" },
                { name: "Titanium Yellow", value: "yellow", image: "src/products/samsung-s24-yellow.jpg" }
            ],
            storage: [
                { name: "256GB", value: "256gb", price: 0 },
                { name: "512GB", value: "512gb", price: 1500 },
                { name: "1TB", value: "1tb", price: 3000 }
            ]
        },
        description: "Ultimate Galaxy with AI features and S Pen included."
    },
    {
        id: 3,
        name: "MacBook Pro 16-inch",
        category: "laptops",
        brand: "apple",
        price: 32999.99,
        originalPrice: 34999.99,
        image: "src/products/macbooks/macbook_pro_M4.jpg",
        rating: 5,
        reviewCount: 67,
        featured: false,
        inStock: true,
        variations: {
            colors: [
                { name: "Space Gray", value: "space-gray", image: "src/products/macbook-space-gray.jpg" },
                { name: "Silver", value: "silver", image: "src/products/macbook-silver.jpg" }
            ],
            storage: [
                { name: "512GB SSD", value: "512gb", price: 0 },
                { name: "1TB SSD", value: "1tb", price: 4000 },
                { name: "2TB SSD", value: "2tb", price: 8000 }
            ],
            memory: [
                { name: "16GB Unified Memory", value: "16gb", price: 0 },
                { name: "32GB Unified Memory", value: "32gb", price: 6000 },
                { name: "64GB Unified Memory", value: "64gb", price: 12000 }
            ]
        },
        description: "Supercharged by M3 Pro or M3 Max chips for next-level performance."
    },
    {
        id: 4,
        name: "AirPods Pro (2nd Generation)",
        category: "accessories",
        brand: "apple",
        price: 4349.99,
        originalPrice: 4999.99,
        image: "src/products/airpods/airpod_2nd_gen.jpeg",
        rating: 5,
        reviewCount: 203,
        featured: true,
        inStock: true,
        variations: {
            colors: [
                { name: "White", value: "white", image: "assets/products/airpods/aipods_2gen_piece.jpg" }
            ]
        },
        description: "Active Noise Cancellation and Adaptive Transparency."
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        category: "accessories",
        brand: "sony",
        price: 5999.99,
        originalPrice: 6499.99,
        image: "src/products/airpods/aipods_2gen_piece.jpg",
        rating: 5,
        reviewCount: 156,
        featured: false,
        inStock: true,
        variations: {
            colors: [
                { name: "Black", value: "black", image: "src/products/headphones/sony_hex.jpg" },
                { name: "Silver", value: "silver", image: "src/products/sony-xm5-silver.jpg" },
                { name: "Blue", value: "blue", image: "src/products/sony-xm5-blue.jpg" }
            ]
        },
        description: "Industry-leading noise cancellation with 30-hour battery life."
    },
    {
        id: 6,
        name: "iPad Air",
        category: "tablets",
        brand: "apple",
        price: 12999.99,
        originalPrice: 13999.99,
        image: "src/products/ipad/ipad_air.PNG",
        rating: 4,
        reviewCount: 78,
        featured: false,
        inStock: true,
        variations: {
            colors: [
                { name: "Space Gray", value: "space-gray", image: "src/products/ipad-air-gray.jpg" },
                { name: "Blue", value: "blue", image: "src/products/ipad-air-blue.jpg" },
                { name: "Purple", value: "purple", image: "src/products/ipad-air-purple.jpg" },
                { name: "Starlight", value: "starlight", image: "src/products/ipad-air-starlight.jpg" }
            ],
            storage: [
                { name: "64GB", value: "64gb", price: 0 },
                { name: "256GB", value: "256gb", price: 2000 }
            ]
        },
        description: "Powerful. Colorful. Wonderful. With M1 chip."
    },
    {
        id: 7,
        name: "Apple Watch Series 10",
        category: "gadgets",
        brand: "apple",
        price: 7999.99,
        originalPrice: 8499.99,
        image: "src/products/apple_watch/apple_watch_S10.jpg",
        rating: 4,
        reviewCount: 92,
        featured: true,
        inStock: true,
        variations: {
            colors: [
                { name: "Midnight", value: "midnight", image: "src/products/apple_watch/apple_watch_s10_white.jpg" },
                { name: "Starlight", value: "starlight", image: "src/products/apple_watch/apple_watch_s10_Gray.jpg" },
                { name: "Silver", value: "silver", image: "src/products/watch-silver.jpg" },
                { name: "Red", value: "red", image: "src/products/watch-red.jpg" }
            ],
            size: [
                { name: "41mm", value: "41mm", price: 0 },
                { name: "45mm", value: "45mm", price: 500 }
            ]
        },
        description: "Advanced health features and fitness tracking."
    },
    {
        id: 8,
        name: "PlayStation 5 pro",
        category: "gadgets",
        brand: "sony",
        price: 14999.99,
        originalPrice: 12999.99,
        image: "src/products/playstation/PS5_pro.jpg",
        rating: 5,
        reviewCount: 234,
        featured: true,
        inStock: false,
        variations: {
            edition: [
                { name: "Standard Edition", value: "standard", price: 0 },
                { name: "Digital Edition", value: "digital", price: -2000 }
            ]
        },
        description: "Next-gen gaming console with lightning-fast loading."
    }
];

// Current filtered products
let currentProducts = [...shopProducts];

// Load all products
function loadAllProducts(productsToLoad = currentProducts) {
    const productsGrid = document.getElementById('products-grid');
    const productsCount = document.getElementById('products-count');
    const noProducts = document.getElementById('no-products');

    if (productsToLoad.length === 0) {
        productsGrid.style.display = 'none';
        noProducts.style.display = 'block';
        productsCount.querySelector('span').textContent = '0';
        return;
    }

    noProducts.style.display = 'none';
    productsGrid.style.display = 'grid';
    productsCount.querySelector('span').textContent = productsToLoad.length;

    productsGrid.innerHTML = productsToLoad.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-brand="${product.brand}" data-price="${product.price}" data-rating="${product.rating}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='photo/products/placeholder.jpg'">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
                ${!product.inStock ? '<span class="product-badge" style="background: var(--danger);">Out of Stock</span>' : ''}
                <button class="wishlist-btn" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    <div class="price">
                        R${product.price.toFixed(2)}
                        ${product.originalPrice > product.price ?
            `<span style="text-decoration: line-through; color: var(--gray); font-size: 0.9rem; margin-left: 5px;">R${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="quick-view-btn" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fal fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    initProductInteractions();
}

// Setup search functionality - FIXED VERSION
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');

    // Show/hide clear button based on input
    searchInput.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            clearSearch.style.opacity = '1';
            clearSearch.style.pointerEvents = 'auto';
        } else {
            clearSearch.style.opacity = '0';
            clearSearch.style.pointerEvents = 'none';
        }

        // Perform search with debouncing
        performSearch(this.value.trim());
    });

    // Clear search
    clearSearch.addEventListener('click', function () {
        searchInput.value = '';
        searchInput.focus();
        clearSearch.style.opacity = '0';
        clearSearch.style.pointerEvents = 'none';
        performSearch('');
    });

    // Enter key support
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(this.value.trim());
        }
    });
}

// Perform search function
function performSearch(searchTerm) {
    if (!searchTerm) {
        // If search is empty, show all products
        currentProducts = [...shopProducts];
        loadAllProducts(currentProducts);
        return;
    }

    const searchLower = searchTerm.toLowerCase();

    // Filter products based on search term
    const filtered = shopProducts.filter(product => {
        const searchFields = [
            product.name.toLowerCase(),
            product.category.toLowerCase(),
            product.brand.toLowerCase(),
            product.description.toLowerCase()
        ];

        // Check if search term exists in any field
        return searchFields.some(field => field.includes(searchLower));
    });

    currentProducts = filtered;
    loadAllProducts(currentProducts);
}

// Setup shop filters
function setupShopFilters() {
    const filterToggle = document.getElementById('filter-toggle');
    const closeFilters = document.getElementById('close-filters');
    const filtersSidebar = document.getElementById('filters-sidebar');
    const applyFilters = document.getElementById('apply-filters');
    const clearFilters = document.getElementById('clear-filters');
    const resetSearch = document.getElementById('reset-search');

    // Toggle filters sidebar
    filterToggle.addEventListener('click', () => {
        filtersSidebar.classList.add('active');
    });

    closeFilters.addEventListener('click', () => {
        filtersSidebar.classList.remove('active');
    });

    // Apply filters
    applyFilters.addEventListener('click', applyProductFilters);

    // Clear filters
    clearFilters.addEventListener('click', clearProductFilters);

    // Reset search
    resetSearch.addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        document.getElementById('clear-search').style.opacity = '0';
        document.getElementById('clear-search').style.pointerEvents = 'none';
        currentProducts = [...shopProducts];
        loadAllProducts(currentProducts);
    });

    // Sort functionality
    document.getElementById('sort-by').addEventListener('change', sortProducts);
}

// Apply product filters
function applyProductFilters() {
    const selectedCategories = getSelectedValues('category');
    const selectedBrands = getSelectedValues('brand');
    const selectedRatings = getSelectedValues('rating');
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filtered = shopProducts.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }

        // Rating filter
        if (selectedRatings.length > 0 && !selectedRatings.some(rating => product.rating >= parseInt(rating))) {
            return false;
        }

        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }

        return true;
    });

    currentProducts = filtered;
    loadAllProducts(currentProducts);
    document.getElementById('filters-sidebar').classList.remove('active');
}

// Clear all filters
function clearProductFilters() {
    // Clear checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Clear price inputs
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';

    // Reset sort
    document.getElementById('sort-by').value = 'default';

    // Reload all products
    currentProducts = [...shopProducts];
    loadAllProducts(currentProducts);
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sort-by').value;
    let sortedProducts = [...currentProducts];

    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // Assuming newer products have higher IDs
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
    }

    currentProducts = sortedProducts;
    loadAllProducts(currentProducts);
}

// Get selected values from checkboxes
function getSelectedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Setup view options
function setupViewOptions() {
    const viewOptions = document.querySelectorAll('.view-option');
    const productsGrid = document.getElementById('products-grid');

    viewOptions.forEach(option => {
        option.addEventListener('click', function () {
            const view = this.dataset.view;

            // Update active state
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Apply view
            productsGrid.className = `products-grid ${view}-view`;
        });
    });
}

// Initialize product interactions
function initProductInteractions() {
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.dataset.id);
            toggleWishlist(productId, this);
        });
    });

    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            showProductModal(productId);
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.id);
            const product = shopProducts.find(p => p.id === productId);

            if (product && product.inStock) {
                addToCart(productId);
                showNotification(`${product.name} added to cart!`);
            }
        });
    });

    // Update wishlist button states
    updateWishlistButtonStates();
}

// Show product modal with variations
function showProductModal(productId) {
    const product = shopProducts.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('product-modal-body');

    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-grid">
                <!-- Product Images -->
                <div class="product-images">
                    <div class="main-image">
                        <img src="${product.image}" alt="${product.name}" id="main-product-image">
                    </div>
                    <div class="image-thumbnails">
                        ${product.images ? product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name} ${index + 1}" 
                                 class="thumbnail ${index === 0 ? 'active' : ''}"
                                 onclick="changeProductImage('${img}')">
                        `).join('') : ''}
                    </div>
                </div>

                <!-- Product Details -->
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="product-rating-large">
                        ${getRatingStars(product.rating)}
                        <span>${product.rating} (${product.reviewCount} reviews)</span>
                    </div>
                    <div class="product-price-large">
                        <span class="current-price">R${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ?
            `<span class="original-price">R${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>

                    <!-- Product Variations -->
                    <div class="product-variations">
                        ${product.variations.colors ? `
                            <div class="variation-group">
                                <h4>Color</h4>
                                <div class="color-options">
                                    ${product.variations.colors.map(color => `
                                        <label class="color-option">
                                            <input type="radio" name="color" value="${color.value}" ${color.value === product.variations.colors[0].value ? 'checked' : ''}>
                                            <span class="color-swatch" style="background-image: url('${color.image}')" title="${color.name}"></span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${product.variations.storage ? `
                            <div class="variation-group">
                                <h4>Storage</h4>
                                <div class="storage-options">
                                    ${product.variations.storage.map(storage => `
                                        <label class="storage-option">
                                            <input type="radio" name="storage" value="${storage.value}" ${storage.value === product.variations.storage[0].value ? 'checked' : ''}>
                                            <span class="storage-label">${storage.name}</span>
                                            ${storage.price > 0 ? `<span class="price-difference">+R${storage.price.toFixed(2)}</span>` : ''}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${product.variations.memory ? `
                            <div class="variation-group">
                                <h4>Memory</h4>
                                <div class="memory-options">
                                    ${product.variations.memory.map(memory => `
                                        <label class="memory-option">
                                            <input type="radio" name="memory" value="${memory.value}" ${memory.value === product.variations.memory[0].value ? 'checked' : ''}>
                                            <span class="memory-label">${memory.name}</span>
                                            ${memory.price > 0 ? `<span class="price-difference">+R${memory.price.toFixed(2)}</span>` : ''}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        ${product.variations.size ? `
                            <div class="variation-group">
                                <h4>Size</h4>
                                <div class="size-options">
                                    ${product.variations.size.map(size => `
                                        <label class="size-option">
                                            <input type="radio" name="size" value="${size.value}" ${size.value === product.variations.size[0].value ? 'checked' : ''}>
                                            <span class="size-label">${size.name}</span>
                                            ${size.price > 0 ? `<span class="price-difference">+R${size.price.toFixed(2)}</span>` : ''}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${product.variations.edition ? `
                            <div class="variation-group">
                                <h4>Edition</h4>
                                <div class="edition-options">
                                    ${product.variations.edition.map(edition => `
                                        <label class="edition-option">
                                            <input type="radio" name="edition" value="${edition.value}" ${edition.value === product.variations.edition[0].value ? 'checked' : ''}>
                                            <span class="edition-label">${edition.name}</span>
                                            ${edition.price !== 0 ? `<span class="price-difference">${edition.price > 0 ? '+' : ''}R${edition.price.toFixed(2)}</span>` : ''}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Quantity and Actions -->
                    <div class="product-actions-modal">
                        <div class="quantity-selector">
                            <label for="quantity">Quantity:</label>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
                                <input type="number" id="quantity" value="1" min="1" max="10">
                                <button class="quantity-btn" onclick="increaseQuantity()">+</button>
                            </div>
                        </div>
                        <div class="action-buttons">
                            <button class="btn-primary add-to-cart-modal" onclick="addToCartFromModal(${productId})" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart"></i>
                                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            <button class="btn-outline wishlist-btn-modal" onclick="toggleWishlist(${productId})">
                                <i class="far fa-heart"></i> Wishlist
                            </button>
                        </div>
                    </div>

                    <!-- Product Features -->
                    <div class="product-features">
                        <h4>Features</h4>
                        <ul>
                            <li><i class="fas fa-shipping-fast"></i> Free shipping on orders over R2000</li>
                            <li><i class="fas fa-undo"></i> 30-day return policy</li>
                            <li><i class="fas fa-shield-alt"></i> 1-year warranty included</li>
                            <li><i class="fas fa-headset"></i> 24/7 customer support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';

    // Close modal events
    document.getElementById('close-product-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Utility functions
function changeProductImage(src) {
    document.getElementById('main-product-image').src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = shopProducts.find(p => p.id === productId);

    if (product && product.inStock) {
        // Get selected variations
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        const selectedStorage = document.querySelector('input[name="storage"]:checked')?.value;
        const selectedMemory = document.querySelector('input[name="memory"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
        const selectedEdition = document.querySelector('input[name="edition"]:checked')?.value;

        // Calculate final price with variations
        let finalPrice = product.price;

        if (selectedStorage) {
            const storage = product.variations.storage.find(s => s.value === selectedStorage);
            finalPrice += storage.price;
        }

        if (selectedMemory) {
            const memory = product.variations.memory.find(m => m.value === selectedMemory);
            finalPrice += memory.price;
        }

        if (selectedSize) {
            const size = product.variations.size.find(s => s.value === selectedSize);
            finalPrice += size.price;
        }

        if (selectedEdition) {
            const edition = product.variations.edition.find(e => e.value === selectedEdition);
            finalPrice += edition.price;
        }

        // Add to cart
        for (let i = 0; i < quantity; i++) {
            addToCart(productId, 1, finalPrice);
        }

        showNotification(`${product.name} added to cart!`);
        document.getElementById('product-modal').style.display = 'none';
    }
}


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

// Add modal-specific CSS
const modalStyles = `
    .product-modal-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    
    .product-images .main-image {
        margin-bottom: 15px;
    }
    
    .main-image img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .image-thumbnails {
        display: flex;
        gap: 10px;
    }
    
    .thumbnail {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0.6;
        transition: var(--transition);
    }
    
    .thumbnail.active, .thumbnail:hover {
        opacity: 1;
        border: 2px solid var(--primary);
    }
    
    .product-rating-large {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 15px 0;
    }
    
    .product-price-large {
        margin: 20px 0;
    }
    
    .current-price {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--primary);
    }
    
    .original-price {
        text-decoration: line-through;
        color: var(--gray);
        margin-left: 10px;
        font-size: 1.2rem;
    }
    
    .product-description {
        color: var(--gray);
        line-height: 1.6;
        margin-bottom: 25px;
    }
    
    .variation-group {
        margin-bottom: 20px;
    }
    
    .variation-group h4 {
        margin-bottom: 10px;
        color: var(--dark);
    }
    
    .color-options, .storage-options, .memory-options, .size-options, .edition-options {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .color-option input, .storage-option input, .memory-option input, .size-option input, .edition-option input {
        display: none;
    }
    
    .color-swatch {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--border);
        cursor: pointer;
        background-size: cover;
        background-position: center;
        transition: var(--transition);
    }
    
    .color-option input:checked + .color-swatch {
        border-color: var(--primary);
        transform: scale(1.1);
    }
    
    .storage-option, .memory-option, .size-option, .edition-option {
        padding: 10px 15px;
        border: 1px solid var(--border);
        border-radius: 5px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .storage-option input:checked + .storage-label,
    .memory-option input:checked + .memory-label,
    .size-option input:checked + .size-label,
    .edition-option input:checked + .edition-label {
        color: var(--primary);
    }
    
    .storage-option input:checked, .memory-option input:checked, .size-option input:checked, .edition-option input:checked {
        border-color: var(--primary);
        background: rgba(74, 108, 247, 0.05);
    }
    
    .price-difference {
        color: var(--success);
        font-size: 0.9rem;
        margin-left: 5px;
    }
    
    .product-actions-modal {
        margin: 30px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .quantity-selector {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .quantity-btn {
        width: 35px;
        height: 35px;
        border: 1px solid var(--border);
        background: white;
        border-radius: 5px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .quantity-btn:hover {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }
    
    #quantity {
        width: 60px;
        text-align: center;
        padding: 8px;
        border: 1px solid var(--border);
        border-radius: 5px;
    }
    
    .action-buttons {
        display: flex;
        gap: 15px;
    }
    
    .action-buttons button {
        flex: 1;
    }
    
    .product-features ul {
        list-style: none;
        padding: 0;
    }
    
    .product-features li {
        padding: 8px 0;
        color: var(--gray);
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .product-features i {
        color: var(--primary);
    }
    
    @media (max-width: 768px) {
        .product-modal-grid {
            grid-template-columns: 1fr;
        }
        
        .action-buttons {
            flex-direction: column;
        }
    }
`;

// Add modal styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);