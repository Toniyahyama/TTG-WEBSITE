<?php
// admin/umkm-list.php
include_once '../backend/auth_check.php'; // Check login status
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manajemen UMKM - Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/umkm-list.css">
</head>

<body class="bg-gray-100 font-sans">
    <div class="flex h-screen bg-gray-200">
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

        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="flex justify-between items-center bg-white p-4 shadow-md">
                <h1 class="text-2xl font-semibold text-gray-800">Manajemen UMKM</h1>
                <a href="umkm-create.php"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tambah UMKM Baru</a>
            </header>

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-gray-700 mb-4">Daftar UMKM</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-300 rounded-lg" id="umkmTable">
                            <thead>
                                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th class="py-3 px-6 text-left">Nama UMKM</th>
                                    <th class="py-3 px-6 text-left">Kategori</th>
                                    <th class="py-3 px-6 text-left">RW</th>
                                    <th class="py-3 px-6 text-left">Deskripsi Singkat</th>
                                    <th class="py-3 px-6 text-left">No. WA</th>
                                    <th class="py-3 px-6 text-left">Foto</th>
                                    <th class="py-3 px-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-600 text-sm font-light" id="umkmTableBody">
                            </tbody>
                        </table>
                        <p id="noUmkmMessage" class="text-center mt-4 text-gray-500 hidden">Tidak ada data UMKM.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="assets/js/script.js"></script>
    <script src="assets/js/umkm-list.js"></script>
</body>

</html>