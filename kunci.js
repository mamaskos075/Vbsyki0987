// script.js
document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown-1');
    const totalHours = 72;
    const totalMilliseconds = totalHours * 60 * 60 * 1000;
    let endTime;

    // Periksa apakah waktu akhir sudah tersimpan di localStorage
    const storedEndTime = localStorage.getItem('countdownEndTime-1');

    if (storedEndTime && !isNaN(new Date(storedEndTime).getTime())) {
        // Gunakan waktu yang tersimpan jika valid
        endTime = new Date(storedEndTime).getTime();
    } else {
        // Jika tidak valid atau tidak ada, atur waktu baru
        endTime = new Date().getTime() + totalMilliseconds;
        localStorage.setItem('countdownEndTime-1', new Date(endTime).toISOString());
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            clearInterval(timerInterval);
            countdownElement.innerHTML = "Fitur sudah aktif!";
            return;
        }

        // Perhitungan untuk jam, menit, dan detik
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${hours} jam ${minutes} menit ${seconds} detik`;
    }

    // Perbarui hitungan mundur setiap 1 detik
    const timerInterval = setInterval(updateCountdown, 1000);
    
    // Jalankan sekali saat dimuat untuk menghindari jeda awal
    updateCountdown();
});
