/**
 * UMKM List Management JavaScript
 * Handles fetching, displaying, and deleting UMKM data
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeUmkmList();
});

/**
 * Initialize UMKM list functionality
 */
function initializeUmkmList() {
    fetchUmkmData();

    // You can add more initialization code here if needed
    console.log('UMKM List initialized');
}

/**
 * Fetch UMKM data from backend
 */
async function fetchUmkmData() {
    const umkmTableBody = document.getElementById('umkmTableBody');
    const noUmkmMessage = document.getElementById('noUmkmMessage');

    try {
        // Show loading state
        showLoadingState();

        const response = await fetch('../backend/get_umkm.php');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Clear existing data
        umkmTableBody.innerHTML = '';

        if (data.success && data.data.length > 0) {
            hideNoDataMessage();
            renderUmkmData(data.data);
        } else {
            showNoDataMessage();
        }

    } catch (error) {
        console.error('Error fetching UMKM data:', error);
        showErrorState();
    }
}

/**
 * Render UMKM data into table
 * @param {Array} umkmData - Array of UMKM objects
 */
function renderUmkmData(umkmData) {
    const umkmTableBody = document.getElementById('umkmTableBody');

    umkmData.forEach(umkm => {
        const row = createUmkmTableRow(umkm);
        umkmTableBody.appendChild(row);
    });
}

/**
 * Create a table row for UMKM data
 * @param {Object} umkm - UMKM object
 * @returns {HTMLElement} - Table row element
 */
function createUmkmTableRow(umkm) {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-200 hover:bg-gray-100';

    row.innerHTML = `
        <td class="py-3 px-6 text-left">${escapeHtml(umkm.nama_umkm)}</td>
        <td class="py-3 px-6 text-left">${escapeHtml(umkm.kategori_umkm)}</td>
        <td class="py-3 px-6 text-left">${escapeHtml(umkm.rw)}</td>
        <td class="py-3 px-6 text-left">${escapeHtml(umkm.deskripsi.substring(0, 50))}...</td>
        <td class="py-3 px-6 text-left">${escapeHtml(umkm.no_telp)}</td>
        <td class="py-3 px-6 text-left">
            ${umkm.foto ? `<img src="../uploads/umkm/${escapeHtml(umkm.foto)}" alt="${escapeHtml(umkm.nama_umkm)}" class="umkm-image">` : '<span class="text-gray-400">N/A</span>'}
        </td>
        <td class="py-3 px-6 text-center action-buttons">
            <div class="flex flex-col items-center gap-2">
                <a href="umkm-edit.php?id=${umkm.id_umkm}" class="action-btn-edit text-white font-bold py-1 px-3 rounded text-xs w-20 mb-1">Edit</a>
                <button onclick="deleteUmkm(${umkm.id_umkm})" class="action-btn-delete text-white font-bold py-1 px-3 rounded text-xs w-20">Hapus</button>
            </div>
        </td>
    `;

    return row;
}

/**
 * Delete UMKM with confirmation
 * @param {number} id - UMKM ID to delete
 */
async function deleteUmkm(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus UMKM ini?')) {
        return;
    }

    const formData = new FormData();
    formData.append('id_umkm', id);

    try {
        const response = await fetch('../backend/delete_umkm.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            showSuccessMessage(data.message);
            fetchUmkmData(); // Refresh the list
        } else {
            showErrorMessage('Gagal menghapus UMKM: ' + data.message);
        }

    } catch (error) {
        console.error('Error deleting UMKM:', error);
        showErrorMessage('Terjadi kesalahan saat menghapus UMKM.');
    }
}

/**
 * Show loading state
 */
function showLoadingState() {
    const umkmTableBody = document.getElementById('umkmTableBody');
    umkmTableBody.innerHTML = `
        <tr>
            <td colspan="8" class="py-8 px-6 text-center">
                <div class="loading">Memuat data...</div>
            </td>
        </tr>
    `;
}

/**
 * Show error state
 */
function showErrorState() {
    const umkmTableBody = document.getElementById('umkmTableBody');
    umkmTableBody.innerHTML = `
        <tr>
            <td colspan="8" class="py-3 px-6 text-center text-red-500">
                Gagal memuat data UMKM. Silakan coba lagi.
            </td>
        </tr>
    `;
}

/**
 * Show no data message
 */
function showNoDataMessage() {
    const noUmkmMessage = document.getElementById('noUmkmMessage');
    noUmkmMessage.classList.remove('hidden');
}

/**
 * Hide no data message
 */
function hideNoDataMessage() {
    const noUmkmMessage = document.getElementById('noUmkmMessage');
    noUmkmMessage.classList.add('hidden');
}

/**
 * Show success message
 * @param {string} message - Success message to display
 */
function showSuccessMessage(message) {
    alert(message); // You can replace this with a better notification system
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    alert(message); // You can replace this with a better notification system
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    if (text == null) return '';

    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Refresh UMKM data
 * Can be called from other parts of the application
 */
function refreshUmkmData() {
    fetchUmkmData();
}

// Export functions for use in other modules if needed
window.UmkmList = {
    refresh: refreshUmkmData,
    delete: deleteUmkm
};