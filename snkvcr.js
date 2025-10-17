document.addEventListener('DOMContentLoaded', function() {
    const acceptButton = document.getElementById('accept-button');
    const confirmationMessage = document.getElementById('confirmation-message');

    acceptButton.addEventListener('click', function() {
        // Tampilkan pesan konfirmasi
        confirmationMessage.classList.remove('hidden');

        // Sembunyikan tombol setelah diklik (opsional)
        acceptButton.style.display = 'none';

        // Anda bisa menambahkan fungsi lain di sini,
        // seperti mengirim data ke server bahwa pengguna sudah setuju.
        console.log("Pengguna telah menyetujui Syarat dan Ketentuan.");
    });
});


