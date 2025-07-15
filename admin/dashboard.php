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
    <link rel="stylesheet" href="assets/style.css">
</head>
<body class="bg-gray-100 font-sans">
    <div class="flex h-screen bg-gray-200">
        <div class="w-64 bg-gray-800 text-white p-4">
            <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul>
                    <li class="mb-2">
                        <a href="dashboard.php" class="block py-2 px-4 rounded hover:bg-gray-700 active:bg-gray-700">Dashboard</a>
                    </li>
                    <li class="mb-2">
                        <a href="umkm-list.php" class="block py-2 px-4 rounded hover:bg-gray-700">Manajemen UMKM</a>
                    </li>
                    <li class="mb-2">
                       <a href="logout.php" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="flex justify-between items-center bg-white p-4 shadow-md">
                <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <div class="text-gray-600">Selamat datang, <?php echo htmlspecialchars($_SESSION['username']); ?>!</div>
            </header>

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Total UMKM</h3>
                        <p class="text-3xl font-bold text-blue-600" id="totalUmkm">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Kategori Kuliner</h3>
                        <p class="text-3xl font-bold text-green-600" id="umkmKuliner">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Kategori Jasa</h3>
                        <p class="text-3xl font-bold text-purple-600" id="umkmJasa">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Toko Kelontong & Peralatan</h3>
                        <p class="text-3xl font-bold text-yellow-600" id="umkmTokoKelontong">0</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Kategori Lainnya</h3>
                        <p class="text-3xl font-bold text-red-600" id="umkmLainnya">0</p>
                    </div>
                </div>

                <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-gray-700 mb-4">Informasi Singkat</h3>
                    <p class="text-gray-600">
                        Selamat datang di Dashboard Admin Marketplace UMKM Kelurahan Tanjung Sari.
                        Di sini Anda dapat mengelola data UMKM, menambah, mengedit, dan menghapus informasi UMKM.
                        Gunakan menu di samping untuk navigasi.
                    </p>
                </div>
            </main>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch('../backend/get_umkm.php');
                const data = await response.json();

                if (data.success) {
                    const umkms = data.data;
                    document.getElementById('totalUmkm').textContent = umkms.length;

                    const counts = {
                        'Kuliner': 0,
                        'Jasa': 0,
                        'Toko Kelontong & Peralatan': 0,
                        'Lainnya': 0
                    };

                    umkms.forEach(umkm => {
                        if (counts.hasOwnProperty(umkm.kategori_umkm)) {
                            counts[umkm.kategori_umkm]++;
                        } else {
                            counts['Lainnya']++; // Fallback for any unlisted categories
                        }
                    });

                    document.getElementById('umkmKuliner').textContent = counts['Kuliner'];
                    document.getElementById('umkmJasa').textContent = counts['Jasa'];
                    document.getElementById('umkmTokoKelontong').textContent = counts['Toko Kelontong & Peralatan'];
                    document.getElementById('umkmLainnya').textContent = counts['Lainnya'];

                } else {
                    console.error('Failed to fetch UMKM data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching UMKM data:', error);
            }
        });
    </script>
    <script src="assets/script.js"></script>
</body>
</html>