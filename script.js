// Data produk (array JavaScript)
const products = [
    { id: 1, name: 'Kemeja Putih Elegan', category: 'Kemeja Pria', price: 250000, image: 'https://images.pexels.com/photos/3214769/pexels-photo-3214769.jpeg' },
    { id: 2, name: 'Kemeja Hitam Klasik', category: 'Kemeja Pria', price: 270000, image: 'https://tse1.mm.bing.net/th/id/OIP.rvGjsu9GKj97ARk0rDQ6PgAAAA?pid=Api&P=0&h=180' },
    { id: 3, name: 'Dress Hitam Minimalis', category: 'Dress Wanita', price: 350000, image: 'https://dresslemuse.com/app/uploads/LeMuse-black-LUNA-linen-dress-2-4.jpg' },
    { id: 4, name: 'Dress Putih Chic', category: 'Dress Wanita', price: 380000, image: 'https://cf.shopee.co.id/file/967ae982e33e99f363c7d62fed4737d2' },
    { id: 5, name: 'Jaket Kulit Hitam', category: 'Jaket', price: 450000, image: 'https://moccaapedia.com/wp-content/uploads/2023/01/Jaket-Kulit.jpg' },
    { id: 6, name: 'Jaket Denim Stylish', category: 'Jaket', price: 420000, image: 'https://www.outfittrends.com/wp-content/uploads/2017/02/Denim-jacket-with-black-pants.jpeg' },
    { id: 7, name: 'Celana Chinos Hitam', category: 'Celana Stylish', price: 300000, image: 'https://www.emoline.id/wp-content/uploads/2022/04/chino-premium-hitam-1.jpg' },
    { id: 8, name: 'Celana Kulot Putih', category: 'Celana Stylish', price: 320000, image: 'https://down-id.img.susercontent.com/file/id-11134207-7ras8-m148jw9ajygy6f' }
];


let cart = [];

// Fungsi navigasi
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'products') {
        displayProducts(products);
    }
    if (sectionId === 'cart') {
        displayCart();
    }
}


// Tampilkan produk
function displayProducts(productList) {
    const productListEl = document.getElementById('product-list');
    productListEl.innerHTML = '';
    productList.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product';
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})" class="cart-btn">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="18" height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" stroke="white" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="cart-icon">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Tambah ke Keranjang
            </button>
        `;
        productListEl.appendChild(productEl);
    });
}
let cartCount = 0;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Update jumlah di ikon keranjang
    updateCartCount();

    // 🔔 Notifikasi melayang
    const notif = document.createElement("div");
    notif.className = "cart-notif";
    notif.innerHTML = `<span>🛍️ ${product.name} berhasil ditambahkan ke keranjang!</span>`;
    document.body.appendChild(notif);

    // Animasi muncul
    setTimeout(() => notif.classList.add("show"), 50);

    // Hilang otomatis setelah 3 detik
    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => notif.remove(), 300);
    }, 3000);

    // 🎯 Animasi ikon keranjang
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.classList.add("shake");
        setTimeout(() => cartIcon.classList.remove("shake"), 500);
    }
}



// Filter produk
function filterProducts(category) {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
}


// Update jumlah keranjang
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Tampilkan keranjang
function displayCart() {
    const cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Hapus</button>
        `;
        cartItemsEl.appendChild(itemEl);
    });
    document.getElementById('cart-total').textContent = `Total: Rp ${total.toLocaleString()}`;
}

// Hapus dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Checkout
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Pembayaran berhasil! Terima kasih telah berbelanja di LuxeLoom.');
    cart = [];
    updateCartCount();
    showSection('home');
});

// Fungsi untuk menampilkan keranjang
function displayCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartEmptyEl = document.getElementById('cart-empty');
    const checkoutBtn = document.getElementById('checkout-btn');
    cartItemsEl.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartEmptyEl.style.display = 'block';
        checkoutBtn.style.display = 'none';
    } else {
        cartEmptyEl.style.display = 'none';
        checkoutBtn.style.display = 'block';
        cart.forEach(item => {
            total += item.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">Hapus</button>
            `;
            cartItemsEl.appendChild(itemEl);
        });
    }
    document.getElementById('cart-total').textContent = `Total: Rp ${total.toLocaleString()}`;
}
function showCheckoutSummary() {
  const listEl = document.getElementById('checkout-summary-list');
  const totalEl = document.getElementById('checkout-total');
  listEl.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
    `;
    listEl.appendChild(li);
  });

  totalEl.textContent = `Total: Rp ${total.toLocaleString()}`;
}

// panggil fungsi ini setiap kali masuk ke halaman checkout
if (document.getElementById('checkout')) {
  document.getElementById('checkout-btn').addEventListener('click', showCheckoutSummary);
}

function showPaymentSuccess(event) {
  event.preventDefault(); // biar form tidak reload

  const popup = document.getElementById('paymentSuccess');
  popup.style.display = 'flex';

  // Tampilkan popup selama 2 detik
  setTimeout(() => {
    popup.style.display = 'none';
    clearCart(); // kosongkan keranjang
    showSection('products'); // kembali ke halaman produk
  }, 2000);
}

// 🔹 Fungsi untuk mengosongkan keranjang
function clearCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const cartEmptyEl = document.getElementById('cart-empty');

  // Kosongkan isi keranjang
  cartItemsEl.innerHTML = '';
  cartCountEl.textContent = '0';
  cartTotalEl.textContent = 'Total: Rp 0';

  // Tampilkan pesan keranjang kosong
  cartEmptyEl.style.display = 'block';

  // Kalau kamu pakai array cart di JS, kosongkan juga:
  if (typeof cart !== 'undefined') {
    cart.length = 0;
  }
}
// Inisialisasi
showSection('home');
