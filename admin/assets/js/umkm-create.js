// assets/umkm-create.js
// JavaScript for umkm-create.php

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createUmkmForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Phone number formatting
    const phoneInput = document.getElementById('no_telp');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, ''); // Remove non-digits
            
            // Auto-add 62 if starts with 0
            if (value.startsWith('0')) {
                value = '62' + value.substring(1);
            }
            
            // Ensure it starts with 62
            if (!value.startsWith('62') && value.length > 0) {
                value = '62' + value;
            }
            
            this.value = value;
        });
    }
    
    // File input preview
    const fileInput = document.getElementById('foto');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Check file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showMessage('Ukuran file terlalu besar. Maksimal 5MB.', 'error');
                    this.value = '';
                    return;
                }
                
                // Check file type
                if (!file.type.startsWith('image/')) {
                    showMessage('File harus berupa gambar.', 'error');
                    this.value = '';
                    return;
                }
                
                // Show preview (optional)
                createImagePreview(file);
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        const formData = new FormData(form);
        
        // Set loading state
        setLoadingState(true);
        clearMessage();
        
        try {
            const response = await fetch('../backend/create_umkm.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(data.message, 'success');
                form.reset();
                removeImagePreview();
                
                // Redirect after delay
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
            setLoadingState(false);
        }
    });
    
    // Form validation
    function validateForm() {
        const requiredFields = ['nama_umkm', 'kategori_umkm'];
        let isValid = true;
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        // Phone number validation
        const phoneValue = phoneInput.value.trim();
        if (phoneValue && !isValidPhoneNumber(phoneValue)) {
            phoneInput.classList.add('border-red-500');
            showMessage('Format nomor WhatsApp tidak valid.', 'error');
            isValid = false;
        } else {
            phoneInput.classList.remove('border-red-500');
        }
        
        return isValid;
    }
    
    // Phone number validation
    function isValidPhoneNumber(phone) {
        // Indonesian phone number validation (starts with 62)
        const phoneRegex = /^62\d{8,13}$/;
        return phoneRegex.test(phone);
    }
    
    // Loading state management
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading', 'opacity-50');
            submitBtn.innerHTML = '<span class="opacity-0">Tambah UMKM</span>';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading', 'opacity-50');
            submitBtn.innerHTML = 'Tambah UMKM';
        }
    }
    
    // Message display
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `message ${type}`;
        
        // Auto-hide error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                clearMessage();
            }, 5000);
        }
    }
    
    function clearMessage() {
        formMessage.textContent = '';
        formMessage.className = 'text-center mt-4 text-sm';
    }
    
    // Image preview functionality
    function createImagePreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Remove existing preview
            removeImagePreview();
            
            // Create preview element
            const preview = document.createElement('div');
            preview.id = 'imagePreview';
            preview.className = 'mt-2 p-2 border rounded';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="max-w-full h-32 object-cover rounded">
                <button type="button" onclick="removeImagePreview()" class="mt-2 text-red-500 text-sm hover:text-red-700">Hapus Preview</button>
            `;
            
            // Insert after file input
            fileInput.parentNode.insertBefore(preview, fileInput.nextSibling);
        };
        reader.readAsDataURL(file);
    }
    
    // Make removeImagePreview globally accessible
    window.removeImagePreview = function() {
        const preview = document.getElementById('imagePreview');
        if (preview) {
            preview.remove();
        }
    };
    
    // Auto-resize textarea
    const textarea = document.getElementById('deskripsi');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Form reset enhancement
    form.addEventListener('reset', function() {
        // Clear all validation styles
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('border-red-500');
        });
        
        // Clear message
        clearMessage();
        
        // Remove image preview
        removeImagePreview();
    });
});