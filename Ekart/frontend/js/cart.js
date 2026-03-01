const API_URL = 'http://localhost:8080';
let token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

// Load cart
async function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        document.getElementById('cartItems').innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('cartTotal').innerHTML = '';
        return;
    }

    try {
        const products = await Promise.all(
            cart.map(item => 
                fetch(`${API_URL}/api/products/${item.productId}`, { headers })
                    .then(r => r.json())
                    .then(p => ({ ...p, quantity: item.quantity }))
            )
        );
        displayCart(products);
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

function displayCart(products) {
    const cartItems = document.getElementById('cartItems');
    let total = 0;

    cartItems.innerHTML = products.map(p => {
        const subtotal = p.price * p.quantity;
        total += subtotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${p.name}</h3>
                    <p>Price: $${p.price}</p>
                    <p>Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${p.id}, -1)">-</button>
                        <span>${p.quantity}</span>
                        <button onclick="updateQuantity(${p.id}, 1)">+</button>
                    </div>
                    <button class="btn-remove" onclick="removeItem(${p.id})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('cartTotal').innerHTML = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.productId === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.productId !== productId);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(i => i.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.getElementById('clearCartBtn').addEventListener('click', () => {
    if (confirm('Clear entire cart?')) {
        localStorage.removeItem('cart');
        loadCart();
    }
});

loadCart();
