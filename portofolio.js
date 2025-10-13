// --- Data Template ---
const templates = [
    // 4 Katalog Awal (Index 0, 1, 2, 3)
    { id: 1, name: 'Website Portofolio Pertanian', desc: 'Desain portofolio tema pertanian terbaru dan informatif. Cocok untuk kamu yang memiliki minat dan karya di bidang pertanian, desain minimalis serta interaktif.', price: 49000, originalPrice: 150000, image: 'images/template_2.png', demoUrl: 'template1.html' },
    { id: 2, name: 'Website Portofolio Perikanan', desc: 'Desain portofolio tema perikanan, cocok untuk kamu yang memiliki karya dan pengalaman dibidang perikanan.', price: 49.000, originalPrice: 150.000, image: 'images/template_3.png', demoUrl: 'template2.html' },
    { id: 3, name: 'Website Portofolio Agribisnis', desc: 'Template desain portofolio tema agribisnis pertanian, cocok untuk kamu yang memiliki karya dibidang agribisnis.', price: 49.000, originalPrice: 150.000, image: 'images/template_4.png', demoUrl: 'template3.html' },
    { id: 4, name: 'Website Portofolio Kreatif', desc: 'Desain portofolio desain kreatif, dapat kamu sesuaikan dengan karya yang kamu miliki dibidang kreatifitas digital.', price: 49.000, originalPrice: 150.000, image: 'images/template_5.png', demoUrl: 'template4.html' },
    
    // 3 Katalog Baru (Index 4, 5, 6)
    { id: 5, name: 'Website Portofolio Marketing', desc: ' Desain portofolio yang dapat kamu sesuaikan untuk memuat kreatifitasmu dibidang marketing.', price: 49.000, originalPrice: 150.000, image: 'images/template_6.png', demoUrl: 'template5.html' },
    { id: 6, name: 'Website Portofolio Administrasi', desc: 'Tampilkan keahlian mu dalam bidang administrasi dan bangun personal branding terbaik bersama desain Administrasi.', price: 49.000, originalPrice: 150.000, image: 'images/template_7.png', demoUrl: 'template9.html' },
    { id: 7, name: 'Website Portofolio Fotografi', desc: 'Tunjukkan karya foto terbaikmu untuk menambah nilai prsonal branding mu bersama template photography .', price: 49.000, originalPrice: 150.00, image: 'images/template_8.png', demoUrl: 'template10.html' },
];

// --- Data Ulasan Pembeli ---
const reviewsData = [
    { name: 'user0419.', template: 'pertanian', review: 'Desainnya menarik. portofolio saya jadi lebih rapi👍👍👍', rating: 5, photo: 'images/ulasan1_portofolio.png' },
    { name: 'user1552.', template: 'pertanian agribisnis', review: 'websitenya bagusss bangettt😭 portofolioku jadi lebih bagusss yg ngoding juga cepet. kereennn🤗', rating: 5, photo: 'images/ulasan2_portofolio.png' },
    { name: 'Kania Mahasiswi Unpas.', template: 'Desain Kreatif', review: 'Sangat minimalis dan fokus. Persis seperti yang saya butuhkan untuk menampilkan karya karya saya.', rating: 4, photo: 'images/ulasan3_portofolio.png' },
    { name: 'user27410.', template: 'pertanian', review: 'Tampilan profesional dan berwibawa.', rating: 5, photo: 'images/ulasan4_portofolio.png' },
    { name: 'user6293.', template: 'pertanian', review: 'Animasi scrolling-nya smooth banget keren', rating: 5, photo: 'images/ulasan5_portofolio.png' },
];

// --- Variabel DOM dan State ---
let cart = []; 
let selectedPayment = ''; 
const WHATSAPP_ADMIN = '6287834224096';
const PAYMENT_OPTIONS = ['BCA', 'SeaBank', 'Shopeepay', 'QRIS'];

const productGrid = document.getElementById('templates');
const cartIcon = document.getElementById('cart-icon');
const toastContainer = document.getElementById('toast-container'); 
const cartPopup = document.createElement('div'); 

// ------------------------------------
// Helper Function
// ------------------------------------
function formatRupiah(number) {
    const fixedNumber = number.toFixed(2);
    return 'Rp ' + fixedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ------------------------------------
// Fungsionalitas Notifikasi Toast (1.5 detik)
// ------------------------------------
function showToast(message, type = 'success', duration = 1500) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`; 
    let icon = type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
    let iconColor = type === 'error' ? 'var(--accent-color)' : 'var(--accent-color)';
    
    toast.innerHTML = `<i class="${icon}" style="margin-right: 8px; color: ${iconColor};"></i> ${message}`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10); 

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 200); 
    }, duration); 
}

// ------------------------------------
// Fungsionalitas Keranjang Pop-up
// ------------------------------------

function updateQuantity(id, action) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        if (action === 'increase') {
            cart[itemIndex].quantity++;
        } else if (action === 'decrease') {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity < 1) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartIcon();
        renderCartItems();
    }
}

function removeItem(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartIcon();
        renderCartItems();
    }
}

function sendToWhatsapp() {
    if (cart.length === 0) {
        // Notifikasi Toast: Keranjang Kosong
        showToast('Keranjang Anda kosong! Silakan tambahkan template.', 'error', 3000);
        return;
    }
    if (!selectedPayment) {
        // Notifikasi Toast: Metode Pembayaran Belum Dipilih
        showToast('Mohon pilih metode pembayaran terlebih dahulu.', 'error', 3000);
        return;
    }

    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Format pesan WhatsApp
    let message = `*PESANAN TEMPLATE BARU*\n`;
    message += `==================================\n`;
    message += `Halo Admin, saya ingin memesan template berikut:\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   - Qty: ${item.quantity}\n`;
        message += `   - Harga: ${formatRupiah(item.price)}/unit\n`;
        message += `   - Subtotal: ${formatRupiah(item.price * item.quantity)}\n`;
    });
    
    message += `\n==================================\n`;
    message += `*TOTAL KESELURUHAN*: ${formatRupiah(totalPrice)}\n`;
    message += `*METODE PEMBAYARAN*: ${selectedPayment}\n`;
    message += `\nMohon info detail pembayaran dan langkah selanjutnya. Terima kasih.`;

    // Encode URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodedMessage}`;
    
    // Buka link WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
    cartPopup.classList.remove('active'); // Sembunyikan pop-up
}

function renderCartItems() {
    const cartItemsContainer = cartPopup.querySelector('.cart-items');
    const cartTotalElement = cartPopup.querySelector('#cart-total');
    const paymentButton = cartPopup.querySelector('.payment-dropdown-btn');
    const checkoutButton = cartPopup.querySelector('.checkout-btn'); 
    const paymentOptionsContainer = cartPopup.querySelector('.payment-options');

    if (!cartItemsContainer || !cartTotalElement || !paymentButton || !checkoutButton || !paymentOptionsContainer) return;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    // Reset button text
    if (selectedPayment) {
         paymentButton.innerHTML = `${selectedPayment} <i class="fas fa-check"></i>`;
    } else {
         paymentButton.innerHTML = `Pilih Pembayaran <i class="fas fa-chevron-down"></i>`;
    }


    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang Anda kosong 🛒</p>';
        checkoutButton.disabled = true;
        paymentButton.disabled = true;
    } else {
        paymentButton.disabled = false;
        checkoutButton.disabled = false;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p class="item-name"><strong>${item.name}</strong></p>
                <div class="item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}" data-action="decrease"><i class="fas fa-minus"></i></button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}" data-action="increase"><i class="fas fa-plus"></i></button>
                </div>
                <p class="item-price">${formatRupiah(itemTotal)}</p>
                <button class="remove-btn" data-id="${item.id}"><i class="fas fa-times"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Event listener untuk tombol kontrol kuantitas
        cartItemsContainer.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                const action = e.currentTarget.dataset.action;
                updateQuantity(id, action);
            });
        });
        // Event listener untuk tombol hapus
        cartItemsContainer.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                removeItem(id);
            });
        });
    }

    cartTotalElement.textContent = formatRupiah(totalPrice);
}

function initCartPopup() {
    cartPopup.className = 'cart-popup';
    cartPopup.innerHTML = `
        <div class="cart-header">
            <h3><i class="fas fa-shopping-basket"></i> Rincian Pesanan</h3>
        </div>
        <div class="cart-items"></div>
        <div class="cart-summary">
            <p>Total Harga:</p>
            <span id="cart-total" class="total-price-display">Rp 0.00</span>
        </div>
        <div class="payment-dropdown-container">
            <button class="payment-dropdown-btn">Pilih Pembayaran <i class="fas fa-chevron-down"></i></button>
            <ul class="payment-options">
                ${PAYMENT_OPTIONS.map(p => `<li data-payment="${p}">${p}</li>`).join('')}
            </ul>
        </div>
        <button class="checkout-btn"> 
            <i class="fas fa-credit-card"></i> Lanjutkan Pembayaran
        </button>
    `;
    document.body.appendChild(cartPopup);

    // Event listener untuk tombol Checkout (sekarang memanggil sendToWhatsapp)
    cartPopup.querySelector('.checkout-btn').addEventListener('click', sendToWhatsapp);

    // Event listener untuk tombol dropdown pembayaran
    const paymentDropdownBtn = cartPopup.querySelector('.payment-dropdown-btn');
    const paymentOptions = cartPopup.querySelector('.payment-options');

    paymentDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        paymentOptions.classList.toggle('active');
    });

    // Event listener untuk memilih opsi pembayaran
    paymentOptions.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', (e) => {
            selectedPayment = e.currentTarget.dataset.payment;
            paymentDropdownBtn.innerHTML = `${selectedPayment} <i class="fas fa-check"></i>`;
            paymentOptions.classList.remove('active');
        });
    });

    // Mencegah pop-up menghilang ketika klik di dalam pop-up itu sendiri
    cartPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function toggleCartPopup(e) {
    e.preventDefault();
    e.stopPropagation(); 
    
    const paymentOptions = cartPopup.querySelector('.payment-options');
    if (paymentOptions) {
        paymentOptions.classList.remove('active');
    }

    cartPopup.classList.toggle('active');

    if (cartPopup.classList.contains('active')) {
        renderCartItems();
    }
}

// ------------------------------------
// Fungsionalitas Produk & Katalog
// ------------------------------------
function renderTemplates() {
    productGrid.innerHTML = '';
    templates.forEach((template, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        let labelHTML = '';
        // Menambahkan label pada katalog
        if (index === 0) {
            labelHTML = '<div class="product-label label-terlaris">TERLARIS</div>';
        } else if (index === 1 || index === 5) { // Index 1 & 5 (Corporate Edge) akan diberi label Rekomendasi
            labelHTML = '<div class="product-label label-rekomendasi">REKOMENDASI</div>';
        }

        card.innerHTML = `
            ${labelHTML}
            <img src="${template.image}" alt="${template.name}">
            <h3>${template.name}</h3>
            
            <p class="product-desc">${template.desc}</p>

            <div class="price-details">
                <span class="original-price">${formatRupiah(template.originalPrice)}</span>
                <span class="current-price">${formatRupiah(template.price)}</span>
            </div>
            
            <div class="card-buttons">
                <a href="${template.demoUrl}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> Lihat Template Website
                </a>
                <button class="btn btn-secondary add-to-cart-btn" data-id="${template.id}" data-name="${template.name}">
                    <i class="fas fa-cart-plus"></i> Tambah
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const name = e.currentTarget.dataset.name;
            addToCart(id, name);
        });
    });
}

function addToCart(templateId, templateName) {
    const id = parseInt(templateId);
    const template = templates.find(t => t.id === id);
    if (template) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...template, quantity: 1 });
        }
        updateCartIcon();
        // Toast notifikasi sukses
        showToast(`Produk <strong>${templateName}</strong> berhasil ditambahkan ke keranjang!`);
        
        if (cartPopup.classList.contains('active')) {
            renderCartItems();
        }
    }
}

function updateCartIcon() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); 
    cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> Keranjang (${totalItems})`;
}


// ------------------------------------
// Fungsionalitas Ulasan Horizontal Spin & Promo Timer
// ------------------------------------
const SLIDE_SPEED = 0.5;
let slidePosition = 0;
let reviewCardsWidth = 0;
let isAnimating = false;
function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += (i < rating) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return stars;
}
function renderReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = ''; 
    const loopedReviews = [...reviewsData, ...reviewsData, ...reviewsData];
    loopedReviews.forEach((review) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <img src="${review.photo}" alt="${review.name}" class="reviewer-photo">
            <div class="review-content">
                <p class="review-template">Menggunakan template: <strong>${review.template}</strong></p>
                <p class="review-text">"${review.review}"</p>
                <div class="rating-stars">${getStars(review.rating)}</div>
            </div>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
    setTimeout(() => {
        if (reviewsContainer.children.length > 0) {
            reviewCardsWidth = reviewsContainer.scrollWidth / 3; 
            if (reviewCardsWidth > 0 && !isAnimating) {
                startReviewSpin();
                isAnimating = true;
            }
        }
    }, 100); 
}
function slideReviews() {
    const reviewsList = document.getElementById('reviews-container');
    slidePosition -= SLIDE_SPEED; 
    if (slidePosition <= -reviewCardsWidth) {
        slidePosition = 0;
    }
    reviewsList.style.transform = `translateX(${slidePosition}px)`;
    requestAnimationFrame(slideReviews);
}
function startReviewSpin() {
    requestAnimationFrame(slideReviews);
}

const PROMO_DURATION_MS = 24 * 60 * 60 * 1000;
const PROMO_END_KEY = 'promoEndTime';

function startCountdown() {
    let endTime = localStorage.getItem(PROMO_END_KEY);
    const now = new Date().getTime();

    if (!endTime || parseInt(endTime) < now) {
        endTime = now + PROMO_DURATION_MS;
        localStorage.setItem(PROMO_END_KEY, endTime);
    } else {
        endTime = parseInt(endTime);
    }
    
    const timerInterval = setInterval(function() {
        const distance = endTime - new Date().getTime();
        const hours = Math.floor((distance % PROMO_DURATION_MS) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const pad = (num) => String(num).padStart(2, '0');
        
        const hoursDisplay = document.getElementById('hours');
        const minutesDisplay = document.getElementById('minutes');
        const secondsDisplay = document.getElementById('seconds');
        
        if (hoursDisplay && minutesDisplay && secondsDisplay) {
            hoursDisplay.innerText = pad(hours);
            minutesDisplay.innerText = pad(minutes);
            secondsDisplay.innerText = pad(seconds);
        }
        
        if (distance < 0) {
            clearInterval(timerInterval);
            localStorage.removeItem(PROMO_END_KEY);
            const timerDiv = document.getElementById('countdown-timer');
            if (timerDiv) {
                timerDiv.innerHTML = "PROMO BERAKHIR!";
                timerDiv.style.color = '#e53935';
            }
        }
    }, 1000);
}


// ------------------------------------
// Inisialisasi Aplikasi
// ------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi komponen pop-up agar siap di DOM
    initCartPopup();
    
    renderTemplates();
    updateCartIcon(); 
    renderReviews();
    startCountdown();
    
    // Event listener utama untuk Pop-up Keranjang
    cartIcon.addEventListener('click', toggleCartPopup);

    // Event listener global untuk menyembunyikan pop-up ketika mengklik di luar area pop-up atau ikon
    window.addEventListener('click', (e) => {
        // Cek jika pop-up aktif DAN target klik BUKAN ikon keranjang
        if (cartPopup.classList.contains('active') && !cartIcon.contains(e.target)) {
            cartPopup.classList.remove('active');
        }
        // Juga tutup dropdown pembayaran jika diklik di luar dropdown
        const paymentOptions = cartPopup.querySelector('.payment-options');
        if (paymentOptions && paymentOptions.classList.contains('active') && !cartPopup.querySelector('.payment-dropdown-container').contains(e.target)) {
            paymentOptions.classList.remove('active');
        }
    });
});
