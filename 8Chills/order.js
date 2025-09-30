// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((total, item) => total + item.quantity, 0);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupMobileMenu();
    setupThumbnailClick();
    
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProductData(productId);
    }
});

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const mobileCartCountElement = document.getElementById('mobile-cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    if (mobileCartCountElement) {
        mobileCartCountElement.textContent = cartCount;
    }
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Setup thumbnail click events
function setupThumbnailClick() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove border from all thumbnails
            thumbnails.forEach(t => t.classList.remove('border-2', 'border-amber-400'));
            
            // Add border to clicked thumbnail
            this.classList.add('border-2', 'border-amber-400');
            
            // Update main image (in a real app, you'd use different image sources)
            mainImage.src = this.src;
        });
    });
}

// Update quantity
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantity += change;
    
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;
    
    quantityInput.value = quantity;
}

// Add to cart function
function addToCart() {
    const product = {
        id: getProductIdFromPage(),
        name: document.getElementById('product-name').textContent,
        price: parseFloat(document.getElementById('product-price').textContent.replace('GHC ', '').replace(',', '')),
        quantity: parseInt(document.getElementById('quantity').value),
        image: document.getElementById('product-image').src
    };
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Add new product to cart
        cart.push(product);
    }
    
    // Update cart count
    cartCount += product.quantity;
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    
    // Show notification
    showNotification(`${product.quantity} ${product.name} added to cart!`);
}

// Get product ID from the page (in a real app, this would come from your database)
function getProductIdFromPage() {
    // This is a simplified example - in a real application, 
    // you would get the product ID from a data attribute or the URL
    const productName = document.getElementById('product-name').textContent;
    return productName.toLowerCase().replace(/\s+/g, '-');
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('cart-notification');
    const notificationText = document.getElementById('notification-text');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Load product data based on ID (simulated)
function loadProductData(productId) {
    // In a real application, you would fetch this data from a server
    // This is a simplified example with hardcoded data
    
    const products = {
        'don-julio-reposado': {
            name: 'Don Julio Reposado',
            category: 'Tequila',
            price: '1200.00',
            originalPrice: '1500.00',
            description: 'Don Julio Reposado is a premium tequila that has been aged for eight months in American white-oak barrels. This aging process gives it a smooth, sophisticated taste with hints of caramel and vanilla, balanced with the natural sweetness of the blue agave plant. Perfect for sipping neat or in premium cocktails.',
            details: [
                'Aged: 8 months in American white-oak barrels',
                'Alcohol Content: 40% ABV',
                'Volume: 750ml',
                'Origin: Jalisco, Mexico'
            ]
        },
        'patrón-silver': {
            name: 'Patrón Silver',
            category: 'Tequila',
            price: '950.00',
            originalPrice: '1100.00',
            description: 'Patrón Silver is crafted from 100% Weber Blue Agave and is perfect for cocktails. It has a fresh, crisp taste with notes of citrus and a smooth finish.',
            details: [
                'Aged: Unaged (Blanco)',
                'Alcohol Content: 40% ABV',
                'Volume: 750ml',
                'Origin: Jalisco, Mexico'
            ]
        },
        // Add more products as needed
    };
    
    const product = products[productId];
    
    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-price').textContent = `GHC ${product.price}`;
        document.getElementById('product-original-price').textContent = `GHC ${product.originalPrice}`;
        document.getElementById('product-description').textContent = product.description;
        
        // Set product details
        const details = product.details;
        for (let i = 0; i < details.length; i++) {
            const detailElement = document.getElementById(`product-detail-${i+1}`);
            if (detailElement) {
                detailElement.textContent = details[i];
            }
        }
        
        // Update page title
        document.title = `${product.name} - 8Chills`;
    }
}

// Add event listener for quantity input to prevent invalid values
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }
});