// Login Page JavaScript - UMKM Tanjung Sari

/**
 * Login form handler
 */
class LoginHandler {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.loginMessage = document.getElementById('loginMessage');
        this.loginButton = document.querySelector('.login-button');
        
        this.init();
    }

    /**
     * Initialize the login handler
     */
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Add input validation
        this.setupInputValidation();
        
        // Add keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    /**
     * Setup input validation
     */
    setupInputValidation() {
        // Real-time validation
        this.usernameInput.addEventListener('input', () => {
            this.validateUsername();
        });

        this.passwordInput.addEventListener('input', () => {
            this.validatePassword();
        });

        // Clear message when user starts typing
        [this.usernameInput, this.passwordInput].forEach(input => {
            input.addEventListener('input', () => {
                this.clearMessage();
            });
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Enter key to submit form
            if (e.key === 'Enter' && (e.target === this.usernameInput || e.target === this.passwordInput)) {
                e.preventDefault();
                this.handleLogin(e);
            }
        });
    }

    /**
     * Validate username input
     */
    validateUsername() {
        const username = this.usernameInput.value.trim();
        
        if (username.length < 3) {
            this.usernameInput.classList.add('invalid');
            return false;
        }
        
        this.usernameInput.classList.remove('invalid');
        return true;
    }

    /**
     * Validate password input
     */
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (password.length < 6) {
            this.passwordInput.classList.add('invalid');
            return false;
        }
        
        this.passwordInput.classList.remove('invalid');
        return true;
    }

    /**
     * Handle login form submission
     */
    async handleLogin(e) {
        e.preventDefault();
        
        // Validate inputs
        const isUsernameValid = this.validateUsername();
        const isPasswordValid = this.validatePassword();
        
        if (!isUsernameValid || !isPasswordValid) {
            this.showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value;

        // Show loading state
        this.setLoadingState(true);

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('../backend/login.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.showMessage(data.message || 'Login successful!', 'success');
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.php';
                }, 1000);
            } else {
                this.showMessage(data.message || 'Login failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('An error occurred. Please check your connection and try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    /**
     * Show message to user
     */
    showMessage(message, type = 'error') {
        this.loginMessage.textContent = message;
        this.loginMessage.className = `login-message ${type}`;
        this.loginMessage.style.display = 'block';

        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.clearMessage();
            }, 3000);
        }
    }

    /**
     * Clear message
     */
    clearMessage() {
        this.loginMessage.textContent = '';
        this.loginMessage.className = 'login-message';
        this.loginMessage.style.display = 'none';
    }

    /**
     * Set loading state
     */
    setLoadingState(isLoading) {
        if (isLoading) {
            this.loginButton.classList.add('loading');
            this.loginButton.disabled = true;
            this.loginButton.textContent = 'Logging in...';
        } else {
            this.loginButton.classList.remove('loading');
            this.loginButton.disabled = false;
            this.loginButton.textContent = 'Login';
        }
    }
}

/**
 * Utility functions
 */
const LoginUtils = {
    /**
     * Check if user is already logged in
     */
    checkLoginStatus() {
        // This would typically check session or token
        // For now, we'll just check if we're on the login page
        return false;
    },

    /**
     * Sanitize input to prevent XSS
     */
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    /**
     * Show loading overlay
     */
    showLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Please wait...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    /**
     * Hide loading overlay
     */
    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.remove();
        }
    }
};

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize login handler
    new LoginHandler();
    
    // Focus on username field
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.focus();
    }
    
    // Check for saved username (optional)
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername && usernameInput) {
        usernameInput.value = savedUsername;
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.focus();
        }
    }
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Clear any sensitive data if page was hidden
        const passwordInput = document.getElementById('password');
        if (passwordInput && passwordInput.value) {
            // Optional: Clear password if page was hidden for security
            // passwordInput.value = '';
        }
    }
});

/**
 * Handle beforeunload event
 */
window.addEventListener('beforeunload', (e) => {
    // Optional: Remember username for convenience
    const usernameInput = document.getElementById('username');
    if (usernameInput && usernameInput.value.trim()) {
        localStorage.setItem('rememberedUsername', usernameInput.value.trim());
    }
});

/**
 * Export for use in other modules if needed
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LoginHandler, LoginUtils };
}