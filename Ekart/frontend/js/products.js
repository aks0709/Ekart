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

// Load products
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`, { headers });
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <p>${p.description || ''}</p>
            <p>Stock: ${p.stock}</p>
            <div class="product-actions">
                <button class="btn-cart" onclick="addToCart(${p.id})">Add to Cart</button>
                <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Modal
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close');
const addProductBtn = document.getElementById('addProductBtn');

addProductBtn.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Save product
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const product = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        stock: parseInt(document.getElementById('productStock').value)
    };

    try {
        const url = id ? `${API_URL}/api/products/${id}` : `${API_URL}/api/products`;
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(product)
        });

        if (response.ok) {
            modal.style.display = 'none';
            loadProducts();
        }
    } catch (error) {
        alert('Error saving product');
    }
});

// Edit product
async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, { headers });
        const product = await response.json();
        
        document.getElementById('modalTitle').textContent = 'Edit Product';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productStock').value = product.stock;
        modal.style.display = 'block';
    } catch (error) {
        alert('Error loading product');
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    
    try {
        await fetch(`${API_URL}/api/products/${id}`, {
            method: 'DELETE',
            headers
        });
        loadProducts();
    } catch (error) {
        alert('Error deleting product');
    }
}

// Add to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.productId === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
}

loadProducts();
