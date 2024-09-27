const products = [
    { id: '1', name: 'Look on the Bright Side', price: 20.98 },
    { id: '2', name: 'The little book of Inner Peace', price: 25.98 },
    { id: '3', name: 'The Stoic Path to Wealth', price: 20.98 }
];

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
}

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('id');
            const storedProducts = JSON.parse(localStorage.getItem('products'));
            const product = storedProducts.find(p => p.id === productId);

            if (product) {
                addToCart(product);
            } else {
                alert('Product not found');
            }
        });
    });
});

function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    sessionStorage.setItem('cartCount', totalItems);

    updateCartCount();
    alert(`${product.name} has been added to the shopping cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = sessionStorage.getItem('cartCount') || 0;
    cartCount.textContent = totalItems;
}

window.onload = function () {
    updateCartCount();
};




