// umkm-edit.js

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editUmkmForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize image preview
    initializeImagePreview();
});

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    showLoadingState(form, true);
    
    try {
        const response = await fetch('../backend/update_umkm.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage(data.message, 'success');
            
            // Redirect to list after a short delay
            setTimeout(() => {
                window.location.href = 'umkm-list.php';
            }, 1500);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
        showLoadingState(form, false);
    }
}

/**
 * Show message to user
 */
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `message ${type}`;
        
        // Clear message after 5 seconds for error messages
        if (type === 'error') {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'message';
            }, 5000);
        }
    }
}

/**
 * Show/hide loading state
 */
function showLoadingState(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Menyimpan...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Update UMKM';
        }
    }
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    const form = document.getElementById('editUmkmForm');
    
    if (!form) return;
    
    // Phone number validation
    const phoneInput = document.getElementById('no_telp');
    if (phoneInput) {
        phoneInput.addEventListener('input', validatePhoneNumber);
    }
    
    // Required field validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateRequiredField);
    });
}

/**
 * Validate phone number format
 */
function validatePhoneNumber(event) {
    const input = event.target;
    const value = input.value.trim();
    
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Check if it starts with 62 (Indonesia country code)
    if (cleanValue && !cleanValue.startsWith('62')) {
        input.setCustomValidity('Nomor WhatsApp harus menggunakan format internasional dimulai dengan 62');
    } else if (cleanValue && cleanValue.length < 10) {
        input.setCustomValidity('Nomor WhatsApp terlalu pendek');
    } else {
        input.setCustomValidity('');
    }
    
    // Update input value with cleaned value
    input.value = cleanValue;
}

/**
 * Validate required field
 */
function validateRequiredField(event) {
    const input = event.target;
    const value = input.value.trim();
    
    if (!value) {
        input.classList.add('border-red-500');
        showFieldError(input, 'Field ini wajib diisi');
    } else {
        input.classList.remove('border-red-500');
        hideFieldError(input);
    }
}

/**
 * Show field error
 */
function showFieldError(input, message) {
    hideFieldError(input); // Remove existing error first
    
    const errorElement = document.createElement('p');
    errorElement.className = 'text-red-500 text-xs mt-1';
    errorElement.textContent = message;
    errorElement.setAttribute('data-error-for', input.id);
    
    input.parentNode.appendChild(errorElement);
}

/**
 * Hide field error
 */
function hideFieldError(input) {
    const existingError = input.parentNode.querySelector(`[data-error-for="${input.id}"]`);
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Initialize image preview functionality
 */
function initializeImagePreview() {
    const fileInput = document.getElementById('foto');
    
    if (fileInput) {
        fileInput.addEventListener('change', handleImagePreview);
    }
}

/**
 * Handle image preview
 */
function handleImagePreview(event) {
    const file = event.target.files[0];
    const existingPreview = document.getElementById('imagePreview');
    
    // Remove existing preview
    if (existingPreview) {
        existingPreview.remove();
    }
    
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showMessage('File yang dipilih bukan gambar', 'error');
            event.target.value = '';
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('Ukuran file tidak boleh lebih dari 5MB', 'error');
            event.target.value = '';
            return;
        }
        
        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.id = 'imagePreview';
            preview.className = 'mt-2';
            preview.innerHTML = `
                <p class="text-sm text-gray-600 mb-2">Preview gambar baru:</p>
                <img src="${e.target.result}" alt="Preview" class="current-image">
            `;
            
            event.target.parentNode.appendChild(preview);
        };
        
        reader.readAsDataURL(file);
    }
}

/**
 * Utility function to format phone number display
 */
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.startsWith('62')) {
        return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 9)} ${cleaned.substring(9)}`;
    }
    
    return phoneNumber;
}

/**
 * Debounce function for input validation
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}