// UMKM Page JavaScript with Backend Integration

// Global variables
const rwList = ['Semua', '01', '02', '03', '04'];
let selectedRW = 'Semua';
let selectedCategory = 'Semua';
let searchQuery = '';
let allUmkms = []; // Store all UMKM data for client-side filtering
let searchTimeout;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupSearchBar();
  setupRWButtons();
  loadInitialData();
  highlightSelectedCategory(); // Initial highlight
});

/**
 * Setup search bar event listeners
 */
function setupSearchBar() {
  const searchInput = document.getElementById('searchInput');
  const clearButton = document.getElementById('clearSearch');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearButton.classList.toggle('hidden', query.length === 0);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = query;
      filterAndDisplayUmkms();
    }, 300);
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearButton.classList.add('hidden');
    filterAndDisplayUmkms();
    searchInput.focus();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchQuery = e.target.value.trim();
      filterAndDisplayUmkms();
    }
  });
}

/**
 * Load initial data from backend
 */
async function loadInitialData() {
  try {
    const response = await fetch('./backend/get_umkm.php'); // Fetch data from backend
    const data = await response.json();

    if (data.success) {
      allUmkms = data.data; // Store UMKM data globally
      filterAndDisplayUmkms(); // Display initial data based on default filters
    } else {
      console.error('Error loading UMKM data:', data.message);
      showNoData(data.message || "Data tidak ditemukan");
    }
  } catch (error) {
    console.error('Error loading UMKM data:', error);
    showNoData("Terjadi kesalahan saat memuat data.");
  }
}

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
  document.getElementById('selectedCategoryText').textContent = cat === 'Semua' ? 'Semua Kategori' : cat;
  filterAndDisplayUmkms();
  highlightSelectedCategory();
}

/**
 * Setup RW filter buttons
 */
function setupRWButtons() {
  const container = document.getElementById('rwContainer');
  container.innerHTML = '';

  rwList.forEach(rw => {
    const label = rw === 'Semua' ? 'All' : rw;
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'rw-btn px-4 py-2 text-sm rounded-full';
    btn.onclick = () => {
      selectedRW = rw;
      filterAndDisplayUmkms();
      highlightSelectedRW();
    };
    container.appendChild(btn);
  });

  highlightSelectedRW();
}

/**
 * Highlight selected RW button by toggling '.active' class
 */
function highlightSelectedRW() {
  document.querySelectorAll('.rw-btn').forEach(btn => {
    const rwValue = btn.textContent === 'All' ? 'Semua' : btn.textContent;
    btn.classList.toggle('active', selectedRW === rwValue);
  });
}

/**
 * Highlight selected category button by toggling '.active' class
 */
function highlightSelectedCategory() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    const catValue = btn.textContent === 'Semua Kategori' ? 'Semua' : btn.textContent;
    btn.classList.toggle('active', selectedCategory === catValue);
  });
}


/**
 * Filter and display UMKMs based on all active filters
 */
function filterAndDisplayUmkms() {
  let filteredUmkms = [...allUmkms];

  if (selectedRW !== 'Semua') {
    filteredUmkms = filteredUmkms.filter(umkm => umkm.rw === selectedRW);
  }

  if (selectedCategory !== 'Semua') {
    filteredUmkms = filteredUmkms.filter(umkm => umkm.kategori_umkm === selectedCategory);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredUmkms = filteredUmkms.filter(umkm =>
      umkm.nama_umkm.toLowerCase().includes(query) ||
      umkm.kategori_umkm.toLowerCase().includes(query) ||
      (umkm.deskripsi && umkm.deskripsi.toLowerCase().includes(query))
    );
  }

  displayUmkms(filteredUmkms);
  updateSearchResults(filteredUmkms.length);
}

/**
 * Update search results info
 * @param {number} count - Number of results found
 */
function updateSearchResults(count) {
  const resultsDiv = document.getElementById('searchResults');
  if (searchQuery) {
    resultsDiv.textContent = `Menampilkan ${count} hasil untuk "${searchQuery}"`;
    resultsDiv.classList.remove('hidden');
  } else {
    resultsDiv.classList.add('hidden');
    resultsDiv.textContent = '';
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
    noData.classList.remove('hidden');
    let message = "Tidak ada UMKM yang ditemukan.";
    if (searchQuery) {
      message = `Tidak ada UMKM yang cocok untuk pencarian "${searchQuery}".`;
    } else if (selectedCategory !== 'Semua' || selectedRW !== 'Semua') {
      message = "Tidak ada UMKM yang cocok dengan filter yang dipilih.";
    }
    noData.textContent = message;
    return;
  }

  noData.classList.add('hidden');
  umkms.forEach(umkm => {
    const card = createUmkmCard(umkm);
    container.appendChild(card);
  });
}

/**
 * Create UMKM card element with search highlighting
 * @param {Object} umkm - UMKM data object
 * @returns {HTMLElement} - Card element
 */
function createUmkmCard(umkm) {
  const card = document.createElement('div');
  card.className = 'umkm-card';
  card.onclick = () => window.location.href = `umkm-detail.html?id=${umkm.id_umkm}`;

  const img = umkm.foto ? `./uploads/umkm/${umkm.foto}` : 'assets/img/default_umkm.png';
  const description = umkm.deskripsi || 'Tidak ada deskripsi.';

  const highlightedName = highlightSearchTerm(umkm.nama_umkm, searchQuery);
  const highlightedCategory = highlightSearchTerm(umkm.kategori_umkm, searchQuery);
  const highlightedDescription = highlightSearchTerm(description, searchQuery);

  card.innerHTML = `
    <img src="${img}" alt="${umkm.nama_umkm}" />
    <div style="flex-grow: 1; display: flex; flex-direction: column;">
        <h3>${highlightedName}</h3>
        <p class="category">${highlightedCategory}</p>
        <p class="description">${highlightedDescription}</p>
        <a href="https://wa.me/${umkm.no_telp}" 
           target="_blank" 
           onclick="event.stopPropagation()" 
           class="whatsapp-btn mt-auto">
          Hubungi via WhatsApp
        </a>
    </div>
  `;
  return card;
}

/**
 * Highlight search terms in text
 * @param {string} text - Original text
 * @param {string} query - Search query
 * @returns {string} - Text with highlighted search terms
 */
function highlightSearchTerm(text, query) {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
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
  const dropdownBox = document.getElementById('categoryDropdownBox');
  const dropdownButton = event.target.closest('.btn-filter-toggle');

  if (!dropdownBox.classList.contains('hidden') && !dropdownButton) {
      dropdownBox.classList.add('hidden');
  }
});