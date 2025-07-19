// assets/js/umkm-detail.js

document.addEventListener('DOMContentLoaded', () => {
    const umkmId = new URLSearchParams(window.location.search).get('id');

    if (!umkmId) {
        showError('ID UMKM tidak valid atau tidak ditemukan.');
        return;
    }

    fetchUmkmDetail(umkmId);
});

function showLoading() {
    const container = document.getElementById('detailContainer');
    container.innerHTML = `
        <div class="loading-state">
            <p>Memuat detail UMKM...</p>
        </div>
    `;
}

function showError(message) {
    const container = document.getElementById('detailContainer');
    container.innerHTML = `
        <div class="error-state">
            <p><strong>Terjadi Kesalahan:</strong> ${message}</p>
        </div>
    `;
}

async function fetchUmkmDetail(id) {
    showLoading();
    try {
        const response = await fetch(`./backend/get_umkm_detail.php?id=${id}`);
        if (!response.ok) {
            throw new Error(`Gagal mengambil data (HTTP ${response.status})`);
        }
        const result = await response.json();

        if (result.success && result.data) {
            displayUmkmDetail(result.data);
        } else {
            throw new Error(result.message || 'UMKM tidak ditemukan.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showError(error.message);
    }
}

function displayUmkmDetail(umkm) {
    const container = document.getElementById('detailContainer');
    const imageUrl = umkm.foto ? `./uploads/umkm/${umkm.foto}` : './assets/img/default_umkm.png';
    const whatsappLink = `https://wa.me/${umkm.no_telp.replace(/\D/g, '')}`;
    const formattedPhone = formatPhoneNumber(umkm.no_telp);

    container.innerHTML = `
        <div class="detail-grid">
            <aside class="detail-sidebar">
                <div class="umkm-image-wrapper">
                    <img src="${imageUrl}" alt="Foto ${umkm.nama_umkm}" class="umkm-image" onerror="this.src='./assets/img/default_umkm.png';">
                </div>
                <div class="contact-info">
                    <h3>Informasi Kontak</h3>
                    <div class="space-y-2 text-left">
                        <div class="contact-item">
                            <strong>Pemilik:</strong><br>${umkm.nama_pemilik || 'Tidak tersedia'}
                        </div>
                        <div class="contact-item">
                            <strong>Telepon:</strong><br>${formattedPhone}
                        </div>
                    </div>
                    <a href="${whatsappLink}" target="_blank" class="whatsapp-button">
                        Hubungi via WhatsApp
                    </a>
                </div>
            </aside>

            <article class="detail-content">
                <span class="category-badge">${umkm.kategori_umkm}</span>
                <h2>${umkm.nama_umkm}</h2>
                
                <section class="info-section">
                    <h3>Deskripsi</h3>
                    <p>${umkm.deskripsi || 'Tidak ada deskripsi untuk UMKM ini.'}</p>
                </section>
                
                <section class="info-section">
                    <h3>Alamat</h3>
                    <p>${umkm.alamat || 'Alamat tidak tersedia.'}, RW ${umkm.rw}</p>
                </section>
            </article>
        </div>
    `;
}

function formatPhoneNumber(phone) {
    if (!phone) return 'Tidak tersedia';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('62')) {
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
    }
    if (cleaned.startsWith('0')) {
        return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
    }
    return phone;
}