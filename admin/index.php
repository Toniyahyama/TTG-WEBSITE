<?php
// admin/index.php
session_start();
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php'); // Redirect to dashboard if already logged in
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
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form id="loginForm" action="../backend/login.php" method="POST">
            <noscript>
                <p class="text-center mt-4 text-sm text-red-500">JavaScript is required to login. Please enable JavaScript in your browser.</p>
            </noscript>
            <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                <input type="text" id="username" name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
                <p class="text-right text-sm">
                    <a href="#" class="text-blue-500 hover:text-blue-800">Lupa Password?</a>
                </p>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Login
                </button>
            </div>
            <p id="loginMessage" class="text-center mt-4 text-sm text-red-500"></p>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('loginMessage');

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            try {
                const response = await fetch('../backend/login.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    loginMessage.textContent = data.message;
                    loginMessage.className = 'text-center mt-4 text-sm text-green-500';
                    window.location.href = 'dashboard.php'; // Redirect on success
                } else {
                    loginMessage.textContent = data.message;
                    loginMessage.className = 'text-center mt-4 text-sm text-red-500';
                }
            } catch (error) {
                console.error('Error:', error);
                loginMessage.textContent = 'An error occurred. Please try again.';
                loginMessage.className = 'text-center mt-4 text-sm text-red-500';
            }
        });
    </script>
    <script src="assets/script.js"></script>
</body>
</html>