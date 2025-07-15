<?php
// admin/umkm-edit.php
include_once '../backend/auth_check.php'; // Check login status
include_once '../backend/db.php'; // Database connection

$umkm = null;
if (isset($_GET['id'])) {
    $id_umkm = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM umkm WHERE id_umkm = ?");
    $stmt->bind_param("i", $id_umkm);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $umkm = $result->fetch_assoc();
    }
    $stmt->close();
}
$conn->close();

if (!$umkm) {
    // Redirect or show error if UMKM not found
    header('Location: umkm-list.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit UMKM - Admin</title>
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
                <h1 class="text-2xl font-semibold text-gray-800">Edit UMKM</h1>
            </header>

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <div class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                    <form id="editUmkmForm" enctype="multipart/form-data">
                        <input type="hidden" name="id_umkm" value="<?php echo htmlspecialchars($umkm['id_umkm']); ?>">
                        <input type="hidden" name="current_foto" value="<?php echo htmlspecialchars($umkm['foto']); ?>">

                        <div class="mb-4">
                            <label for="nama_umkm" class="block text-gray-700 text-sm font-bold mb-2">Nama UMKM:</label>
                            <input type="text" id="nama_umkm" name="nama_umkm" value="<?php echo htmlspecialchars($umkm['nama_umkm']); ?>" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                        </div>
                        <div class="mb-4">
                            <label for="kategori_umkm" class="block text-gray-700 text-sm font-bold mb-2">Kategori:</label>
                            <select id="kategori_umkm" name="kategori_umkm" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                                <option value="">Pilih Kategori</option>
                                <option value="Kuliner" <?php echo ($umkm['kategori_umkm'] == 'Kuliner') ? 'selected' : ''; ?>>Kuliner</option>
                                <option value="Jasa" <?php echo ($umkm['kategori_umkm'] == 'Jasa') ? 'selected' : ''; ?>>Jasa</option>
                                <option value="Toko Kelontong & Peralatan" <?php echo ($umkm['kategori_umkm'] == 'Toko Kelontong & Peralatan') ? 'selected' : ''; ?>>Toko Kelontong & Peralatan</option>
                                <option value="Lainnya" <?php echo ($umkm['kategori_umkm'] == 'Lainnya') ? 'selected' : ''; ?>>Lainnya</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="deskripsi" class="block text-gray-700 text-sm font-bold mb-2">Deskripsi Singkat:</label>
                            <textarea id="deskripsi" name="deskripsi" rows="3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"><?php echo htmlspecialchars($umkm['deskripsi']); ?></textarea>
                        </div>
                        <div class="mb-4">
                            <label for="alamat" class="block text-gray-700 text-sm font-bold mb-2">Alamat:</label>
                            <input type="text" id="alamat" name="alamat" value="<?php echo htmlspecialchars($umkm['alamat']); ?>" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-4">
                            <label for="no_telp" class="block text-gray-700 text-sm font-bold mb-2">Nomor WhatsApp:</label>
                            <input type="text" id="no_telp" name="no_telp" value="<?php echo htmlspecialchars($umkm['no_telp']); ?>" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Contoh: 6281234567890">
                            <p class="text-xs text-gray-500 mt-1">Gunakan format internasional tanpa '+': 628...</p>
                        </div>
                        <div class="mb-4">
                            <label for="nama_pemilik" class="block text-gray-700 text-sm font-bold mb-2">Nama Pemilik:</label>
                            <input type="text" id="nama_pemilik" name="nama_pemilik" value="<?php echo htmlspecialchars($umkm['nama_pemilik']); ?>" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-6">
                            <label for="foto" class="block text-gray-700 text-sm font-bold mb-2">Ganti Foto (Opsional):</label>
                            <?php if ($umkm['foto']): ?>
                                <p class="text-sm text-gray-600 mb-2">Foto saat ini:</p>
                                <img src="../uploads/umkm/<?php echo htmlspecialchars($umkm['foto']); ?>" alt="Current UMKM Photo" class="w-32 h-32 object-cover rounded mb-2">
                            <?php endif; ?>
                            <input type="file" id="foto" name="foto" accept="image/*" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <p class="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah foto.</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Update UMKM
                            </button>
                            <a href="umkm-list.php" class="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800">Batal</a>
                        </div>
                        <p id="formMessage" class="text-center mt-4 text-sm"></p>
                    </form>
                </div>
            </main>
        </div>
    </div>

    <script>
        document.getElementById('editUmkmForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formMessage = document.getElementById('formMessage');

            try {
                const response = await fetch('../backend/update_umkm.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    formMessage.textContent = data.message;
                    formMessage.className = 'text-center mt-4 text-sm text-green-500';
                    // Optionally redirect to list after a short delay
                    setTimeout(() => {
                        window.location.href = 'umkm-list.php';
                    }, 1500);
                } else {
                    formMessage.textContent = data.message;
                    formMessage.className = 'text-center mt-4 text-sm text-red-500';
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'An error occurred. Please try again.';
                formMessage.className = 'text-center mt-4 text-sm text-red-500';
            }
        });
    </script>
    <script src="assets/script.js"></script>
</body>
</html>