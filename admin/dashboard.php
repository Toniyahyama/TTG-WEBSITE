<?php
// admin/dashboard.php
include_once '../backend/auth_check.php'; // Check login status
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - UMKM Tanjung Sari</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/dashboard.css">
</head>

<body class="bg-gray-100 font-sans">
    <div class="dashboard-container">
        <div class="sidebar">
            <h2 class="sidebar-title">Admin Panel</h2>
            <nav class="sidebar-nav">
                <ul>
                    <li>
                        <a href="dashboard.php">Dashboard</a>
                    </li>
                    <li>
                        <a href="umkm-list.php">Manajemen UMKM</a>
                    </li>
                    <li>
                        <a href="../backend/logout.php" class="logout-btn">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="main-content">
            <header class="header">
                <h1 class="header-title">Dashboard</h1>
                <div class="header-welcome">Selamat datang, <?php echo htmlspecialchars($_SESSION['username']); ?>!
                </div>
            </header>

            <main class="content-area">
                <div class="stats-grid">
                    <div class="stats-card">
                        <h3 class="stats-card-title">Total UMKM</h3>
                        <p class="stats-card-value blue" id="totalUmkm">0</p>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Kategori Kuliner</h3>
                        <p class="stats-card-value green" id="umkmKuliner">0</p>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Kategori Jasa</h3>
                        <p class="stats-card-value purple" id="umkmJasa">0</p>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Toko Kelontong & Peralatan</h3>
                        <p class="stats-card-value yellow" id="umkmTokoKelontong">0</p>
                    </div>
                    <div class="stats-card">
                        <h3 class="stats-card-title">Kategori Lainnya</h3>
                        <p class="stats-card-value red" id="umkmLainnya">0</p>
                    </div>
                </div>

                <div class="info-section">
                    <h3 class="info-section-title">Informasi Singkat</h3>
                    <p class="info-section-text">
                        Selamat datang di Dashboard Admin Marketplace UMKM Kelurahan Tanjung Sari.
                        Di sini Anda dapat mengelola data UMKM, menambah, mengedit, dan menghapus informasi UMKM.
                        Gunakan menu di samping untuk navigasi.
                    </p>
                </div>
            </main>
        </div>
    </div>

    <script src="assets/js/dashboard.js"></script>
    <script src="assets/js/script.js"></script>
</body>

</html>