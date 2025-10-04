// =========================================================
// 1. FUNGSIONALITAS PRELOADER
// =========================================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderIcon = document.getElementById('loader-icon');
    const loaderText = document.getElementById('loader-text');

    const loaderSteps = [
        { icon: 'far fa-smile-wink', text: 'Maskos...', size: 'icon-small' },
        { icon: 'fas fa-th', text: 'Mewujudkan Layanan Lengkap...', size: 'icon-medium' },
        { icon: 'fas fa-search', text: 'Mudah Diakses...', size: 'icon-large' }
    ];

    let currentStep = 0;

    function changeLoader() {
        const step = loaderSteps[currentStep];

        // Pastikan elemen ditemukan
        if (!loaderIcon || !loaderText) return;

        loaderIcon.className = '';
        loaderIcon.classList.add('loader-icon');
        
        loaderIcon.classList.add(...step.icon.split(' '));
        loaderIcon.classList.add(step.size);
        
        loaderText.textContent = step.text;

        currentStep = (currentStep + 1) % loaderSteps.length;

        if (currentStep === 0) {
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 2000);
        } else {
            setTimeout(changeLoader, 2000);
        }
    }

    if (preloader) {
        changeLoader();
    }
});


document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // 2. FUNGSIONALITAS HAMBURGER MENU
    // =========================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }

    // =========================================================
    // 3. FUNGSIONALITAS FLOATING CHAT (Disederhanakan)
    // =========================================================
    // Logika animasi hover di CSS, JavaScript hanya memastikan elemen ada
    const chatLink = document.querySelector('.floating-chat');
    if (chatLink) {
        // Hapus logika JavaScript yang mencoba menampilkan/menyembunyikan teks
        // karena kini dihandle oleh CSS :hover dan media query.
        // Fungsi showFloatingChat dihapus karena guide sudah tidak ada.
    }


    // =========================================================
    // 4. FUNGSIONALITAS KLAIM VOUCHER & COPY
    // =========================================================
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const voucherCode = button.getAttribute('data-code');
            
            navigator.clipboard.writeText(voucherCode).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Disalin!';
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin kode: ', err);
                alert('Gagal menyalin kode. Silakan salin manual.');
            });
        });
    });

    // =========================================================
    // 5. FUNGSIONALITAS POPUP GAMBAR PROMO
    // =========================================================
    const imagePopup = document.getElementById('image-popup');
    const closeBtn = document.querySelector('#image-popup .popup-close-btn');

    // Cek di localStorage apakah popup sudah pernah ditampilkan
    const hasPopupBeenShown = localStorage.getItem('maskos_image_popup_shown');

    if (imagePopup && !hasPopupBeenShown) {
        setTimeout(() => {
            imagePopup.style.display = 'block';
        }, 500);
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            if (imagePopup) imagePopup.style.display = 'none';
            localStorage.setItem('maskos_image_popup_shown', 'true');
        }
    }

    window.onclick = function(event) {
        if (event.target == imagePopup) {
            imagePopup.style.display = 'none';
            localStorage.setItem('maskos_image_popup_shown', 'true');
        }
    }
    
    const popupLink = document.getElementById('popup-link');
    if (popupLink) {
        popupLink.onclick = function() {
            localStorage.setItem('maskos_image_popup_shown', 'true');
            if (imagePopup) imagePopup.style.display = 'none';
        }
    }
    
    // =========================================================
    // 6. FUNGSIONALITAS ACCORDION (FAQ & Pembayaran)
    // =========================================================
    
    // Logika Accordion FAQ
    const faqQuestions = document.querySelectorAll('.faq-section .faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.fa-chevron-down');

            // Tutup semua yang terbuka kecuali yang diklik
            document.querySelectorAll('.faq-section .faq-answer').forEach(ans => {
                if (ans !== answer && ans.style.maxHeight) {
                    ans.style.maxHeight = null;
                    ans.previousElementSibling.querySelector('.fa-chevron-down').classList.remove('rotate');
                }
            });

            // Buka/Tutup yang diklik
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.remove('rotate');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.add('rotate');
            }
        });
    });

    // Logika Accordion Metode Pembayaran
    const accordionHeaders = document.querySelectorAll('.payment-methods-section .accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            // Tutup semua yang terbuka kecuali yang diklik
            document.querySelectorAll('.payment-methods-section .accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    otherItem.querySelector('.accordion-icon').classList.remove('rotate');
                }
            });

            // Buka/Tutup yang diklik
            item.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate');
            }
        });
    });

    // =========================================================
    // 7. FUNGSIONALITAS LAINNYA
    // =========================================================

    // Fungsionalitas Tombol Ambil Kesempatan (WhatsApp)
    const earnButtons = document.querySelectorAll('.earn-btn');
    earnButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const jobTitle = button.parentElement.querySelector('.freelancer-job').textContent;
            const targetPhoneNumber = '+6281234567890'; // Ganti dengan nomor WA tujuan
            const message = encodeURIComponent(`Halo, saya tertarik untuk mendaftar sebagai ${jobTitle}. Apakah ada lowongan yang tersedia?`);
            const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Fungsionalitas Tombol Klaim Hot Offer
    const claimButton = document.getElementById('claim-voucher-btn');
    if (claimButton) {
        claimButton.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPhoneNumber = '6281234567890'; // Ganti dengan nomor WA tujuan
            const message = encodeURIComponent("Saya mendapatkan voucher bikin web portofolio 50% s/d Rp 10.000 dari website Maskos.");
            const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

}); // END document.addEventListener('DOMContentLoaded', function() {

// =========================================================
// 8. FUNGSIONALITAS BANNER SLIDESHOW
// =========================================================
let bannerIndex = 0;
const bannerSlideshow = document.getElementById('banner-slideshow');
const bannerSlides = document.querySelectorAll('.banner-slide');
const bannerTotalSlides = bannerSlides.length;

function slideBanner() {
    // Pastikan elemen ditemukan dan ada slide
    if (!bannerSlideshow || bannerTotalSlides === 0) return;

    bannerIndex++;
    if (bannerIndex >= bannerTotalSlides) {
        bannerIndex = 0;
    }
    const offset = -100 * bannerIndex;
    bannerSlideshow.style.transform = `translateX(${offset}%)`;
    setTimeout(slideBanner, 4000);
}

if (bannerSlides.length > 0) {
    slideBanner();
}

// =========================================================
// 9. FUNGSIONALITAS HOT OFFER COUNTDOWN (FIXED NaN)
// =========================================================

// Fungsi bantuan untuk memformat angka menjadi dua digit (misal: 5 menjadi 05)
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // 1. Ambil waktu target dari localStorage (jika ada)
    // Menggunakan kunci yang berbeda untuk menghindari konflik dengan logika lain
    let countDownTime = localStorage.getItem('maskos_countdown_target');
    let now = new Date().getTime();

    // 2. Jika waktu target belum ada atau sudah kedaluwarsa, set target baru (24 jam dari sekarang)
    if (!countDownTime || Number(countDownTime) < now) {
        // Tambahkan 24 jam (24 * 60 * 60 * 1000 milidetik) ke waktu sekarang
        countDownTime = now + (24 * 60 * 60 * 1000); 
        localStorage.setItem('maskos_countdown_target', countDownTime);
    }

    // 3. Konversi ke angka untuk perhitungan
    countDownTime = Number(countDownTime);

    // Update the count down every 1 second
    const x = setInterval(function() {

        const now = new Date().getTime();
        const distance = countDownTime - now;
            
        // Time calculations for hours, minutes and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in element
        if (countdownElement) {
            countdownElement.innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
        }
            
        // If the count down is finished, write some text and reset
        if (distance < 0) {
            clearInterval(x);
            // Hapus target lama, sehingga saat fungsi dipanggil lagi, ia akan membuat target baru.
            localStorage.removeItem('maskos_countdown_target');
            if (countdownElement) {
                countdownElement.innerHTML = "00:00:00";
                // Mulai ulang timer setelah 3 detik
                setTimeout(startCountdown, 3000); 
            }
        }
    }, 1000);
}

// Panggil fungsi countdown saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    startCountdown(); 
});


// =========================================================
// 10. FUNGSIONALITAS VOUCHER SLIDESHOW
// =========================================================
const voucherContainer = document.querySelector('.voucher-slideshow-container');
const voucherWrapper = document.querySelector('.voucher-card-wrapper');
let scrollAmount = 0;
const scrollSpeed = 4000; // Geser setiap 4 detik

function autoSlideVouchers() {
    if (!voucherWrapper || !voucherContainer || voucherWrapper.children.length === 0) return;
    
    // Ambil lebar setiap kartu voucher
    // Menggunakan offsetWidth kartu pertama ditambah nilai margin/gap yang diasumsikan 24px (1.5rem)
    const cardWidth = voucherWrapper.firstElementChild.offsetWidth + 24; 
    
    // Geser ke kanan sebanyak satu kartu
    scrollAmount += cardWidth;

    // Jika sudah di akhir, kembali ke awal
    if (scrollAmount >= voucherWrapper.scrollWidth - voucherContainer.clientWidth + cardWidth/2) {
        scrollAmount = 0;
    }

    // Terapkan pergeseran dengan animasi halus
    voucherContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Mulai pergeseran otomatis
if (voucherWrapper && voucherContainer) {
    setInterval(autoSlideVouchers, scrollSpeed);
}
