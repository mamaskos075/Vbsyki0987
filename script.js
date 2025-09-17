// Fungsionalitas Preloader BARU
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

        loaderIcon.className = '';
        loaderIcon.classList.add('loader-icon');
        
        loaderIcon.classList.add(...step.icon.split(' '));
        loaderIcon.classList.add(step.size);
        
        loaderText.textContent = step.text;

        currentStep = (currentStep + 1) % loaderSteps.length;

        if (currentStep === 0) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 2000);
        } else {
            setTimeout(changeLoader, 2000);
        }
    }

    if (preloader) {
        changeLoader();
    }
});

// Fungsionalitas Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }
});

// Fungsionalitas Floating Chat
document.addEventListener('DOMContentLoaded', () => {
    const chatLink = document.querySelector('.floating-chat');
    const chatText = document.querySelector('.chat-text');
    const chatIcon = document.querySelector('.chat-icon');
    
    window.showFloatingChat = () => {
        chatLink.style.display = 'flex';
        setTimeout(() => {
            chatLink.classList.add('show-chat');
            
            chatText.classList.add('show');
            chatIcon.classList.remove('animate-pulse');
            
            setTimeout(() => {
                chatText.classList.remove('show');
                chatIcon.classList.add('animate-pulse');
            }, 5000);
        }, 300);
    };

    chatLink.addEventListener('mouseenter', () => {
        chatText.classList.add('show');
        chatIcon.classList.remove('animate-pulse');
    });

    chatLink.addEventListener('mouseleave', () => {
        chatText.classList.remove('show');
        chatIcon.classList.add('animate-pulse');
    });
});

// Fungsionalitas Banner Slideshow
let bannerIndex = 0;
const bannerSlideshow = document.getElementById('banner-slideshow');
const bannerSlides = document.querySelectorAll('.banner-slide');
const bannerTotalSlides = bannerSlides.length;

function slideBanner() {
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

// Fungsionalitas Promo Slideshow
let promoSlideIndex = 0;
const promoSlides = document.getElementsByClassName("mySlides");

function showPromoSlides() {
    for (let i = 0; i < promoSlides.length; i++) {
        promoSlides[i].style.display = "none";
    }
    promoSlideIndex++;
    if (promoSlideIndex > promoSlides.length) {
        promoSlideIndex = 1;
    }
    if (promoSlides.length > 0) {
        promoSlides[promoSlideIndex - 1].style.display = "block";
    }
    setTimeout(showPromoSlides, 4000);
}
if (promoSlides.length > 0) {
    showPromoSlides();
}

// Fungsionalitas Panduan/Guide
document.addEventListener('DOMContentLoaded', () => {
    const guideOverlay = document.getElementById('guide-overlay');
    const guidePerson = document.getElementById('guide-person');
    const guideBubble = document.getElementById('guide-bubble');
    const guideTextElement = document.getElementById('guide-text');
    const guideNextButton = document.getElementById('guide-next');
    const guideSkipButton = document.getElementById('guide-skip');
    const guideArrow = document.getElementById('guide-arrow');

    const guideSteps = [
        { text: "Hallo kak, kenalin aku maskos.. yang akan memandu kaka berkenalan dengan fitur layanan maskos", target: null },
        { text: "Disini kaka bisa memilih layanan dengan mudah sesuai yang kami tampilkan", target: '.app-services' },
        { text: "Untuk memesan layanan kaka cukup pilih tombol layanan yang tersedia, kemudian kaka akan di arahkan ke whatsApp maskos untuk reservasi layanan", target: null },
        { text: "tidak perlu khawatir, kami menyedikan pembayaran online yang memudahkan kaka dalam bertransaksi", target: null },
        { text: "Keamanan dan kenyamanan bertransaksi adalah misi utama kami", target: '.floating-chat' },
        { text: "Selamat menikmati layanan kami" }
    ];

    let currentStep = 0;

    function createBubbleAnimation() {
        const existingBubbles = document.querySelectorAll('.bubble-animation');
        existingBubbles.forEach(bubble => bubble.remove());

        const personRect = guidePerson.getBoundingClientRect();
        const bubbleRect = guideBubble.getBoundingClientRect();

        const startX = personRect.left + (personRect.width / 2);
        const startY = personRect.top + (personRect.height / 2);

        const endX = bubbleRect.left + (bubbleRect.width / 2);
        const endY = bubbleRect.top + (bubbleRect.height / 2);

        const distanceX = endX - startX;
        const distanceY = endY - startY;

        const totalBubbles = 3;
        for (let i = 0; i < totalBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble-animation');
            
            bubble.style.left = `${personRect.left + (personRect.width / 2)}px`;
            bubble.style.top = `${personRect.top + (personRect.height / 2)}px`;

            bubble.style.animation = `popAndMove 1.5s ease-out infinite`;
            bubble.style.animationDelay = `${i * 0.3}s`;

            const styleSheet = document.styleSheets[0];
            const keyframesName = `popAndMove-${Date.now()}-${i}`;
            const keyframes = `@keyframes ${keyframesName} {
                0% { transform: translate(0, 0) scale(0.2); opacity: 0; }
                50% { transform: translate(${distanceX * 0.5}px, ${distanceY * 0.5}px) scale(1); opacity: 1; }
                100% { transform: translate(${distanceX}px, ${distanceY}px) scale(0.5); opacity: 0; }
            }`;
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
            bubble.style.animationName = keyframesName;

            document.body.appendChild(bubble);
        }
    }

    function showGuideStep(step) {
        if (step >= guideSteps.length) {
            hideGuide();
            return;
        }

        const current = guideSteps[step];
        guideTextElement.textContent = current.text;

        const targetElement = current.target ? document.querySelector(current.target) : null;
        
        guideArrow.style.display = targetElement ? 'block' : 'none';

        if (targetElement) {
            const bubbleRect = guideBubble.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            
            const arrowX = targetRect.left + (targetRect.width / 2) - bubbleRect.left;
            const arrowY = targetRect.top + (targetRect.height / 2) - bubbleRect.top;

            const angle = Math.atan2(arrowY - (bubbleRect.height / 2), arrowX - (bubbleRect.width / 2)) * (180 / Math.PI);

            guideArrow.style.top = `${bubbleRect.height / 2}px`;
            guideArrow.style.left = `${bubbleRect.width / 2}px`;
            guideArrow.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            guideArrow.style.borderColor = `transparent transparent transparent var(--secondary-color)`;
            
        }

        if (step === guideSteps.length - 1) {
            guideNextButton.textContent = 'Selesai';
        } else {
            guideNextButton.textContent = 'Lanjut';
        }

        guideOverlay.style.display = 'block';
        guidePerson.style.display = 'block';
        guideBubble.style.display = 'block';
        setTimeout(() => {
            guideOverlay.style.opacity = '1';
            guidePerson.style.opacity = '1';
            guideBubble.style.opacity = '1';
            createBubbleAnimation();
        }, 10);
    }

    function startGuide() {
        showGuideStep(0);
    }
    
    function hideGuide() {
        guideOverlay.style.opacity = '0';
        guidePerson.style.opacity = '0';
        guideBubble.style.opacity = '0';
        
        const bubbles = document.querySelectorAll('.bubble-animation');
        bubbles.forEach(bubble => bubble.remove());

        setTimeout(() => {
            guideOverlay.style.display = 'none';
            guidePerson.style.display = 'none';
            guideBubble.style.display = 'none';

            window.showFloatingChat();
            showDiscountLabel();
        }, 300);
    }

    function showDiscountLabel() {
        const discountLabel = document.querySelector('.discount-label');
        if (discountLabel) {
            discountLabel.classList.add('show');
        }
    }

    guideNextButton.addEventListener('click', () => {
        currentStep++;
        showGuideStep(currentStep);
    });

    guideSkipButton.addEventListener('click', hideGuide);

    setTimeout(startGuide, 3000);
});

// Fungsionalitas FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            question.classList.toggle('active');
            answer.classList.toggle('show');
        });
    });
});

// Fungsionalitas Klaim Voucher
document.addEventListener('DOMContentLoaded', () => {
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
            });
        });
    });
});

// Fungsionalitas Hot Offer (BARU)
document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const claimButton = document.getElementById('claim-voucher-btn');
    const targetPhoneNumber = '+62887834224096';

    function startCountdown() {
        let endTime = localStorage.getItem('countdownEndTime');
        const now = new Date().getTime();

        if (!endTime || now > endTime) {
            endTime = now + (24 * 60 * 60 * 1000);
            localStorage.setItem('countdownEndTime', endTime);
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.textContent = "00:00:00";
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const formatNumber = (num) => num < 10 ? '0' + num : num;

            countdownElement.textContent = 
                `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
        }, 1000);
    }

    if (countdownElement) {
        startCountdown();
    }
    
    if (claimButton) {
        claimButton.addEventListener('click', (event) => {
            event.preventDefault();
            const message = encodeURIComponent("Saya mendapatkan voucher bikin web portofolio 50% s/d Rp 10.000 dari website Maskos.");
            const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Fungsionalitas Pop-up dan WhatsApp BARU
document.addEventListener('DOMContentLoaded', () => {
    const moreInfoLinks = document.querySelectorAll('.more-info-link');
    const earnButtons = document.querySelectorAll('.earn-btn');
    const modal = document.getElementById('modal-syarat');
    const closeBtn = document.querySelector('.close-btn');

    // Menampilkan modal saat link Selengkapnya diklik
    moreInfoLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            modal.style.display = 'flex';
        });
    });

    // Menutup modal saat tombol 'x' diklik
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Menutup modal saat mengklik di luar area modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Otomatisasi Slideshow Voucher
const voucherContainer = document.querySelector('.voucher-slideshow-container');
const voucherWrapper = document.querySelector('.voucher-card-wrapper');
let scrollAmount = 0;
const scrollSpeed = 2000; // Geser setiap 4 detik

// Fungsi untuk menggeser ke kartu berikutnya
function autoSlideVouchers() {
    // Ambil lebar setiap kartu voucher
    const cardWidth = voucherWrapper.firstElementChild.offsetWidth + 24; // Lebar kartu + gap (1.5rem = 24px)
    
    // Geser ke kanan sebanyak satu kartu
    scrollAmount += cardWidth;

    // Jika sudah di akhir, kembali ke awal
    if (scrollAmount >= voucherWrapper.scrollWidth - voucherContainer.clientWidth) {
        scrollAmount = 0;
    }

    // Terapkan pergeseran dengan animasi halus
    voucherContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Mulai pergeseran otomatis
setInterval(autoSlideVouchers, scrollSpeed);

     // Tambahkan kode ini ke file script.js yang sudah ada

// Fungsi untuk mengaktifkan dropdown di bagian FAQ dan Metode Pembayaran
function setupAccordion(accordionClass) {
    const accordionHeaders = document.querySelectorAll(accordionClass + ' .accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle kelas 'active' pada header yang diklik
            header.classList.toggle('active');

            // Temukan konten yang terkait
            const content = header.nextElementSibling;
            
            // Toggle kelas 'show' pada konten
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                content.classList.add('show');
            }
        });
    });
}

// Panggil fungsi untuk setiap bagian accordion
setupAccordion('.payment-accordion');
setupAccordion('.faq-container'); // Pastikan ini juga dipanggil untuk FAQ jika belum

    
    // Fungsionalitas tombol Ambil Kesempatan (WhatsApp)
    earnButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const jobTitle = button.parentElement.querySelector('.freelancer-job').textContent;
            const targetPhoneNumber = '+62887834224096';
            const message = encodeURIComponent(`Halo, saya tertarik untuk mendaftar sebagai ${jobTitle}. Apakah ada lowongan yang tersedia?`);
            const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});
