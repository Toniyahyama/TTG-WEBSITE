// UMKM Page JavaScript

// Global variables
const rwList = ['Semua', '01', '02', '03', '04'];
let selectedRW = 'Semua';
let selectedCategory = 'Semua';

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupRWButtons();
  filterUmkms(true);
});

/**
 * Toggle category dropdown visibility
 */
function toggleCategoryDropdown() {
  const dropdown = document.getElementById('categoryDropdownBox');
  dropdown.classList.toggle('hidden');
}

/**
 * Set category filter and update display
 * @param {string} cat - Category name
 */
function setCategoryFilter(cat) {
  selectedCategory = cat;
  document.getElementById('categoryDropdownBox').classList.add('hidden');
  filterUmkms();
  highlightSelectedCategory();
}

/**
 * Setup RW filter buttons
 */
function setupRWButtons() {
  const container = document.getElementById('rwContainer');
  container.innerHTML = '';

  rwList.forEach(rw => {
    const label = rw === 'Semua' ? 'All' : parseInt(rw).toString();
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'rw-btn px-4 py-2 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100 font-medium';
    btn.onclick = () => {
      selectedRW = rw;
      filterUmkms();
      highlightSelectedRW();
    };
    container.appendChild(btn);
  });

  highlightSelectedRW();
}

/**
 * Highlight selected RW button
 */
function highlightSelectedRW() {
  document.querySelectorAll('.rw-btn').forEach(btn => {
    btn.style.backgroundColor = '';
    btn.style.color = '';

    if ((selectedRW === 'Semua' && btn.textContent === 'All') ||
      btn.textContent === parseInt(selectedRW).toString()) {
      btn.style.backgroundColor = '#606C38';
      btn.style.color = 'white';
    }
  });
}

/**
 * Highlight selected category button
 */
function highlightSelectedCategory() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.style.backgroundColor = '';
    btn.style.color = '';

    if (btn.textContent === selectedCategory ||
      (selectedCategory === 'Semua' && btn.textContent === 'Semua Kategori')) {
      btn.style.backgroundColor = '#606C38';
      btn.style.color = 'white';
    }
  });
}

/**
 * Filter UMKMs based on selected category and RW
 * @param {boolean} isInitial - Is this the initial load
 */
async function filterUmkms(isInitial = false) {
  const rw = selectedRW === 'Semua' ? '' : selectedRW;
  const kategori = selectedCategory === 'Semua' ? '' : selectedCategory;

  try {
    const url = new URL('./backend/get_umkm.php', window.location.href);
    if (kategori) url.searchParams.append('kategori', kategori);
    if (rw) url.searchParams.append('rw', rw);

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      displayUmkms(data.data);
    } else {
      showNoData(data.message || "Data tidak ditemukan");
    }
  } catch (error) {
    console.error('Error fetching UMKM data:', error);
    showNoData("Terjadi kesalahan saat memuat data.");
  }

  if (!isInitial) {
    highlightSelectedRW();
    highlightSelectedCategory();
  }
}

/**
 * Display UMKMs in the grid
 * @param {Array} umkms - Array of UMKM objects
 */
function displayUmkms(umkms) {
  const container = document.getElementById('umkmList');
  const noData = document.getElementById('noUmkmMessage');

  container.innerHTML = '';

  if (!umkms || umkms.length === 0) {
    return showNoData("Tidak ada UMKM yang ditemukan.");
  }

  noData.classList.add('hidden');

  umkms.forEach(umkm => {
    const card = createUmkmCard(umkm);
    container.appendChild(card);
  });
}

/**
 * Create UMKM card element
 * @param {Object} umkm - UMKM data object
 * @returns {HTMLElement} - Card element
 */
function createUmkmCard(umkm) {
  const card = document.createElement('div');
  card.className = 'umkm-card';
  card.onclick = () => window.location.href = `umkm-detail.html?id=${umkm.id_umkm}`;

  const img = umkm.foto ? `./uploads/umkm/${umkm.foto}` : 'assets/img/default_umkm.png';
  const description = umkm.deskripsi || 'Tidak ada deskripsi.';

  card.innerHTML = `
    <img src="${img}" alt="${umkm.nama_umkm}" />
    <h3>${umkm.nama_umkm}</h3>
    <p class="category">${umkm.kategori_umkm}</p>
    <p class="description">${description}</p>
    <a href="https://wa.me/${umkm.no_telp}" 
       target="_blank" 
       onclick="event.stopPropagation()" 
       class="whatsapp-btn">
      Hubungi via WhatsApp
    </a>
  `;

  return card;
}

/**
 * Show no data message
 * @param {string} message - Message to display
 */
function showNoData(message) {
  document.getElementById('umkmList').innerHTML = '';
  const noData = document.getElementById('noUmkmMessage');
  noData.textContent = message;
  noData.classList.remove('hidden');
}

/**
 * Close dropdown when clicking outside
 */
document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('categoryDropdownBox');
  const button = event.target.closest('button');

  if (!button || !button.onclick || !button.onclick.toString().includes('toggleCategoryDropdown')) {
    dropdown.classList.add('hidden');
  }
});