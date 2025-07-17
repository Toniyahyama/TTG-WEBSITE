// JavaScript untuk Detail UMKM

// Fungsi untuk mendapatkan parameter dari URL
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Fungsi untuk menampilkan loading
function showLoading() {
  const container = document.getElementById('detailContainer');
  container.innerHTML = `
    <div class="loading">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse"></div>
      <p class="text-gray-500">Memuat data UMKM...</p>
    </div>
  `;
}

// Fungsi untuk menampilkan error
function showError(message) {
  const container = document.getElementById('detailContainer');
  container.innerHTML = `
    <div class="error-message">
      <p>${message}</p>
    </div>
  `;
}

// Fungsi untuk menampilkan detail UMKM
function displayUmkmDetail(umkm) {
  const container = document.getElementById('detailContainer');
  const imageUrl = umkm.foto ? `./uploads/umkm/${umkm.foto}` : 'assets/img/default_umkm.png';
  const whatsappLink = `https://wa.me/${umkm.no_telp}`;
  
  // Format nomor telepon untuk ditampilkan
  const formattedPhone = umkm.no_telp ? formatPhoneNumber(umkm.no_telp) : 'Tidak tersedia';
  
  container.innerHTML = `
    <div class="detail-container">
      <img src="${imageUrl}" 
           alt="${umkm.nama_umkm}" 
           class="umkm-image w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-green-300"
           onerror="this.src='assets/img/default_umkm.png'">
      
      <h2 class="text-2xl font-bold text-gray-800 mb-2">${umkm.nama_umkm}</h2>
      
      <div class="category-badge">
        ${umkm.kategori_umkm}
      </div>
      
      <div class="address-info">
        <strong>Alamat:</strong> ${umkm.alamat}
      </div>
      
      <div class="description">
        ${umkm.deskripsi || 'Tidak ada deskripsi tersedia.'}
      </div>
      
      <div class="mb-4">
        <strong>Telepon:</strong> ${formattedPhone}
      </div>
      
      <a href="${whatsappLink}" 
         target="_blank"
         class="whatsapp-button inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full">
        Hubungi via WhatsApp
      </a>
    </div>
  `;
}

// Fungsi untuk format nomor telepon
function formatPhoneNumber(phone) {
  if (!phone) return 'Tidak tersedia';
  
  // Hapus karakter non-digit
  const cleaned = phone.replace(/\D/g, '');
  
  // Format nomor telepon Indonesia
  if (cleaned.startsWith('62')) {
    return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 9)} ${cleaned.substring(9)}`;
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 8)} ${cleaned.substring(8)}`;
  }
  
  return phone;
}

// Fungsi untuk fetch data UMKM
async function fetchUmkmDetail(id) {
  try {
    showLoading();
    
    const response = await fetch(`./backend/get_umkm_detail.php?id=${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      displayUmkmDetail(data.data);
    } else {
      showError(data.message || 'UMKM tidak ditemukan.');
    }
    
  } catch (error) {
    console.error('Error fetching UMKM detail:', error);
    showError('Terjadi kesalahan saat mengambil data. Silakan coba lagi.');
  }
}

// Fungsi untuk inisialisasi halaman
function initializePage() {
  const id = getUrlParameter('id');
  
  if (!id) {
    showError('ID UMKM tidak ditemukan di URL.');
    return;
  }
  
  fetchUmkmDetail(id);
}

// Event listener untuk DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializePage);

// Event listener untuk handling back button
window.addEventListener('popstate', function(event) {
  // Handle browser back button if needed
  console.log('Back button pressed');
});

// Fungsi untuk refresh data
function refreshData() {
  const id = getUrlParameter('id');
  if (id) {
    fetchUmkmDetail(id);
  }
}

// Export fungsi untuk penggunaan global jika diperlukan
window.UmkmDetail = {
  refresh: refreshData,
  formatPhoneNumber: formatPhoneNumber
};