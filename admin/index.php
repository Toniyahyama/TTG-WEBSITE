<?php
// admin/loginpage.php
session_start();
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - UMKM Tanjung Sari</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/style.css">
    <link rel="stylesheet" href="assets/css/loginpage.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">Admin Login</h2>
            <form id="loginForm" action="../backend/login.php" method="POST">
                <noscript>
                    <p class="noscript-message">JavaScript is required to login. Please enable JavaScript in your browser.</p>
                </noscript>
                
                <div class="form-group">
                    <label for="username" class="form-label">Username:</label>
                    <input type="text" id="username" name="username" class="form-input" required>
                </div>
                
                <div class="form-group password-group">
                    <label for="password" class="form-label">Password:</label>
                    <input type="password" id="password" name="password" class="form-input password-input" required>
                    <p class="forgot-password">
                        <a href="#" onclick="alert('Hubungi instagram @tanjak_117 untuk mereset password :)'); return false;">Lupa Password?</a>
                    </p>
                </div>
                
                <div class="login-button-container">
                    <button type="submit" class="login-button">
                        Login
                    </button>
                </div>
                
                <div id="loginMessage" class="login-message" style="display: none;"></div>
            </form>
        </div>
    </div>

    <script src="assets/js/loginpage.js"></script>
    <script src="assets/script.js"></script>
</body>
</html>