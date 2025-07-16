document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../backend/get_umkm.php');
        const data = await response.json();

        if (data.success) {
            const umkms = data.data;
            document.getElementById('totalUmkm').textContent = umkms.length;

            const counts = {
                'Kuliner': 0,
                'Jasa': 0,
                'Toko Kelontong & Peralatan': 0,
                'Lainnya': 0
            };

            umkms.forEach(umkm => {
                if (counts.hasOwnProperty(umkm.kategori_umkm)) {
                    counts[umkm.kategori_umkm]++;
                } else {
                    counts['Lainnya']++;
                }
            });

            document.getElementById('umkmKuliner').textContent = counts['Kuliner'];
            document.getElementById('umkmJasa').textContent = counts['Jasa'];
            document.getElementById('umkmTokoKelontong').textContent = counts['Toko Kelontong & Peralatan'];
            document.getElementById('umkmLainnya').textContent = counts['Lainnya'];
        } else {
            console.error('Failed to fetch UMKM data:', data.message);
        }
    } catch (error) {
        console.error('Error fetching UMKM data:', error);
    }
});