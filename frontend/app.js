function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token && !location.pathname.includes('login') && !location.pathname.includes('register')) {
        location.href = 'login.html';
    }
    if (token && (location.pathname.includes('login') || location.pathname.includes('register'))) {
        location.href = 'index.html';
    }
}

function isAdmin() {
    return localStorage.getItem('role') === 'ADMIN';
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('cart');
    location.href = 'login.html';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = count;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
