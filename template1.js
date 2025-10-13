document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk Hamburger dan Dropdown yang sudah ada
    const moreBtn = document.querySelector('.more-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    moreBtn.addEventListener('click', () => {
        moreBtn.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });

    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            moreBtn.classList.remove('active');
            dropdownMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!moreBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            moreBtn.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
    });

    // --- Logika Baru untuk Pengalaman Magang ---
    
    // Data dummy untuk setiap pengalaman
    const pengalamanData = [
        {
            title: "Pengalaman Magang di Agrotech Farm",
            company: "PT. Agrotech Farm Indo",
            duration: "Juni - Agustus 2024",
            division: "Divisi Riset dan Pengembangan",
            achievements: "Merancang sistem irigasi hemat air berbasis IoT, meningkatkan efisiensi 25%.",
            description: "Selama magang ini, saya terlibat dalam pengembangan prototipe sistem irigasi pintar. Saya belajar tentang sensor tanah, pemrograman mikrokontroler, dan analisis data pertanian. Proyek ini memberikan pemahaman mendalam tentang integrasi teknologi dalam sektor pertanian."
        },
        {
            title: "Asisten Peneliti di Balai Penelitian Pertanian",
            company: "Balai Penelitian Pertanian (BPP)",
            duration: "Januari - April 2024",
            division: "Divisi Ilmu Tanah",
            achievements: "Melakukan analisis sampel tanah, mengidentifikasi kekurangan nutrisi pada 5 jenis tanaman, dan menyusun laporan rekomendasi pupuk.",
            description: "Sebagai asisten peneliti, saya bertanggung jawab atas pengujian laboratorium dan analisis data lapangan. Pengalaman ini mengasah kemampuan saya dalam metodologi penelitian, penggunaan alat-alat ilmiah, dan penulisan laporan teknis yang akurat."
        }
    ];

    const detailButtons = document.querySelectorAll('.detail-btn');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalCompany = document.getElementById('modal-company');
    const modalDuration = document.getElementById('modal-duration');
    const modalDivision = document.getElementById('modal-division');
    const modalAchievements = document.getElementById('modal-achievements');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-btn');

    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const slide = e.target.closest('.carousel-slide');
            const index = slide.getAttribute('data-index');
            const data = pengalamanData[index];

            // Isi pop-up dengan data yang relevan
            modalImage.src = slide.querySelector('img').src;
            modalTitle.textContent = data.title;
            modalCompany.textContent = data.company;
            modalDuration.textContent = data.duration;
            modalDivision.textContent = data.division;
            modalAchievements.textContent = data.achievements;
            modalDescription.textContent = data.description;
            
            modal.style.display = 'block';
        });
    });

    // Menutup pop-up saat tombol close diklik
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Menutup pop-up saat klik di luar area konten
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- Logika Baru untuk Dropdown Proyek ---
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const parentDropdown = e.target.closest('.project-dropdown');
            
            // Tutup semua dropdown lain
            dropdownToggles.forEach(otherToggle => {
                const otherParent = otherToggle.closest('.project-dropdown');
                if (otherParent !== parentDropdown) {
                    otherParent.classList.remove('active');
                }
            });

            // Toggle dropdown yang diklik
            parentDropdown.classList.toggle('active');
        });
    });
});



