document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');
    const overlayMenu = document.querySelector('.overlay-menu');
    const menuLinks = document.querySelectorAll('.overlay-menu a');

    // Pop-up elements (Pengalaman)
    const modalImage = document.getElementById("image-popup");
    const modalImg = document.getElementById("popup-image");
    const closePopupBtn = document.querySelector(".close-popup");
    const viewImageBtns = document.querySelectorAll(".view-image-btn");

    // Pop-up elements (Sertifikasi)
    const modalSertifikat = document.getElementById("sertifikat-popup");
    const closeSertifikatPopupBtn = document.querySelector(".close-sertifikat-popup");
    const detailBtns = document.querySelectorAll(".detail-btn");

    // Fungsi untuk membuka menu
    function openMenu() {
        overlayMenu.classList.add('is-active');
        hamburgerBtn.classList.add('is-active');
    }

    // Fungsi untuk menutup menu
    function closeMenu() {
        overlayMenu.classList.remove('is-active');
        hamburgerBtn.classList.remove('is-active');
    }

    // Event listener untuk tombol hamburger
    hamburgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Event listener untuk tombol "Lihat Gambar" (Pengalaman)
    viewImageBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            modalImage.style.display = "block";
            modalImg.src = event.target.dataset.imageSrc;
        });
    });

    // Event listener untuk tombol tutup pop-up gambar pengalaman
    closePopupBtn.addEventListener('click', () => {
        modalImage.style.display = "none";
    });

    // Event listener untuk tombol "Detail" (Sertifikasi)
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const data = JSON.parse(event.target.dataset.sertifikat);
            
            // Isi data ke pop-up
            document.getElementById('sertifikat-image-display').src = data.image;
            document.getElementById('lembaga-pelaksana').textContent = data.lembaga;
            document.getElementById('tahun-perolehan').textContent = data.tahun;
            document.getElementById('nomor-sertifikat').textContent = data.nomor;
            document.getElementById('hasil-diperoleh').textContent = data.hasil;

            modalSertifikat.style.display = "block";
        });
    });

    // Event listener untuk tombol tutup pop-up sertifikasi
    closeSertifikatPopupBtn.addEventListener('click', () => {
        modalSertifikat.style.display = "none";
    });

    // Menutup pop-up saat mengklik di luar
    window.addEventListener('click', (event) => {
        if (event.target == modalImage) {
            modalImage.style.display = "none";
        }
        if (event.target == modalSertifikat) {
            modalSertifikat.style.display = "none";
        }
    });
});
