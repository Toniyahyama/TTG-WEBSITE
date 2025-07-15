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
    <link rel="stylesheet" href="assets/style.css">
</head>
<body class="bg-gray-100 font-sans">
    <div class="flex h-screen bg-gray-200">
        <div class="w-64 bg-gray-800 text-white p-4">
            <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul>
                    <li class="mb-2">
                        <a href="dashboard.php" class="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li class="mb-2">
                        <a href="umkm-list.php" class="block py-2 px-4 rounded hover:bg-gray-700 active:bg-gray-700">Manajemen UMKM</a>
                    </li>
                    <li class="mb-2">
                        <a href="../backend/logout.php" class="block py-2 px-4 rounded hover:bg-red-600 text-red-300">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="flex justify-between items-center bg-white p-4 shadow-md">
                <h1 class="text-2xl font-semibold text-gray-800">Manajemen UMKM</h1>
                <a href="umkm-create.php" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tambah UMKM Baru</a>
            </header>

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold text-gray-700 mb-4">Daftar UMKM</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-300 rounded-lg" id="umkmTable">
                            <thead>
                                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th class="py-3 px-6 text-left">ID</th>
                                    <th class="py-3 px-6 text-left">Nama UMKM</th>
                                    <th class="py-3 px-6 text-left">Kategori</th>
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

    <script>
        document.addEventListener('DOMContentLoaded', fetchUmkmData);

        async function fetchUmkmData() {
            try {
                const response = await fetch('../backend/get_umkm.php');
                const data = await response.json();
                const umkmTableBody = document.getElementById('umkmTableBody');
                const noUmkmMessage = document.getElementById('noUmkmMessage');
                umkmTableBody.innerHTML = ''; // Clear existing data

                if (data.success && data.data.length > 0) {
                    noUmkmMessage.classList.add('hidden');
                    data.data.forEach(umkm => {
                        const row = `
                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td class="py-3 px-6 text-left whitespace-nowrap">${umkm.id_umkm}</td>
                                <td class="py-3 px-6 text-left">${umkm.nama_umkm}</td>
                                <td class="py-3 px-6 text-left">${umkm.kategori_umkm}</td>
                                <td class="py-3 px-6 text-left">${umkm.deskripsi.substring(0, 50)}...</td>
                                <td class="py-3 px-6 text-left">${umkm.no_telp}</td>
                                <td class="py-3 px-6 text-left">
                                    ${umkm.foto ? `<img src="../uploads/umkm/${umkm.foto}" alt="${umkm.nama_umkm}" class="w-12 h-12 object-cover rounded">` : 'N/A'}
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <a href="umkm-edit.php?id=${umkm.id_umkm}" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-xs">Edit</a>
                                    <button onclick="deleteUmkm(${umkm.id_umkm})" class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs">Hapus</button>
                                </td>
                            </tr>
                        `;
                        umkmTableBody.innerHTML += row;
                    });
                } else {
                    noUmkmMessage.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error fetching UMKM data:', error);
                const umkmTableBody = document.getElementById('umkmTableBody');
                umkmTableBody.innerHTML = `<tr><td colspan="7" class="py-3 px-6 text-center text-red-500">Gagal memuat data UMKM.</td></tr>`;
            }
        }

        async function deleteUmkm(id) {
            if (confirm('Apakah Anda yakin ingin menghapus UMKM ini?')) {
                const formData = new FormData();
                formData.append('id_umkm', id);

                try {
                    const response = await fetch('../backend/delete_umkm.php', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    if (data.success) {
                        alert(data.message);
                        fetchUmkmData(); // Refresh the list
                    } else {
                        alert('Gagal menghapus UMKM: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error deleting UMKM:', error);
                    alert('Terjadi kesalahan saat menghapus UMKM.');
                }
            }
        }
    </script>
    <script src="assets/script.js"></script>
</body>
</html>