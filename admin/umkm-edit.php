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
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit UMKM - Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/umkm-edit.css">
</head>

<body class="bg-gray-100 font-sans">
    <div class="admin-layout">
        <!-- Sidebar -->
        <div class="sidebar">
            <h2 class="sidebar-title">Admin Panel</h2>
            <nav class="sidebar-nav">
                <ul>
                    <li>
                        <a href="dashboard.php">Dashboard</a>
                    </li>
                    <li>
                        <a href="umkm-list.php" class="active">Manajemen UMKM</a>
                    </li>
                    <li>
                        <a href="../backend/logout.php" class="logout">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Header -->
            <header class="header">
                <h1>Edit UMKM</h1>
            </header>

            <!-- Content Area -->
            <main class="content-area">
                <div class="form-container">
                    <form id="editUmkmForm" enctype="multipart/form-data">
                        <input type="hidden" name="id_umkm" value="<?php echo htmlspecialchars($umkm['id_umkm']); ?>">
                        <input type="hidden" name="current_foto" value="<?php echo htmlspecialchars($umkm['foto']); ?>">

                        <div class="form-field">
                            <label for="nama_umkm" class="form-label">Nama UMKM:</label>
                            <input type="text" 
                                   id="nama_umkm" 
                                   name="nama_umkm"
                                   value="<?php echo htmlspecialchars($umkm['nama_umkm']); ?>"
                                   class="form-input"
                                   required>
                        </div>

                        <div class="form-field">
                            <label for="kategori_umkm" class="form-label">Kategori:</label>
                            <select id="kategori_umkm" name="kategori_umkm" class="form-select" required>
                                <option value="">Pilih Kategori</option>
                                <option value="Kuliner" <?php echo ($umkm['kategori_umkm'] == 'Kuliner') ? 'selected' : ''; ?>>Kuliner</option>
                                <option value="Jasa" <?php echo ($umkm['kategori_umkm'] == 'Jasa') ? 'selected' : ''; ?>>Jasa</option>
                                <option value="Toko Kelontong & Peralatan" <?php echo ($umkm['kategori_umkm'] == 'Toko Kelontong & Peralatan') ? 'selected' : ''; ?>>Toko Kelontong & Peralatan</option>
                                <option value="Lainnya" <?php echo ($umkm['kategori_umkm'] == 'Lainnya') ? 'selected' : ''; ?>>Lainnya</option>
                            </select>
                        </div>

                        <div class="form-field">
                            <label for="deskripsi" class="form-label">Deskripsi Singkat:</label>
                            <textarea id="deskripsi" 
                                      name="deskripsi" 
                                      rows="3"
                                      class="form-textarea"><?php echo htmlspecialchars($umkm['deskripsi']); ?></textarea>
                        </div>

                        <div class="form-field">
                            <label for="alamat" class="form-label">Alamat:</label>
                            <input type="text" 
                                   id="alamat" 
                                   name="alamat"
                                   value="<?php echo htmlspecialchars($umkm['alamat']); ?>"
                                   class="form-input">
                        </div>

                        <div class="form-field">
                            <label for="rw" class="form-label">RW:</label>
                            <input type="text" 
                                   id="rw" 
                                   name="rw" 
                                   value="<?php echo htmlspecialchars($umkm['rw']); ?>"
                                   class="form-input">
                        </div>

                        <div class="form-field">
                            <label for="no_telp" class="form-label">Nomor WhatsApp:</label>
                            <input type="text" 
                                   id="no_telp" 
                                   name="no_telp"
                                   value="<?php echo htmlspecialchars($umkm['no_telp']); ?>"
                                   class="form-input"
                                   placeholder="Contoh: 6281234567890">
                            <p class="help-text">Gunakan format internasional tanpa '+': 628...</p>
                        </div>

                        <div class="form-field">
                            <label for="nama_pemilik" class="form-label">Nama Pemilik:</label>
                            <input type="text" 
                                   id="nama_pemilik" 
                                   name="nama_pemilik"
                                   value="<?php echo htmlspecialchars($umkm['nama_pemilik']); ?>"
                                   class="form-input">
                        </div>

                        <div class="form-field">
                            <label for="foto" class="form-label">Ganti Foto (Opsional):</label>
                            <?php if ($umkm['foto']): ?>
                                <p class="text-sm text-gray-600 mb-2">Foto saat ini:</p>
                                <img src="../uploads/umkm/<?php echo htmlspecialchars($umkm['foto']); ?>"
                                     alt="Current UMKM Photo" 
                                     class="current-image">
                            <?php endif; ?>
                            <input type="file" 
                                   id="foto" 
                                   name="foto" 
                                   accept="image/*"
                                   class="form-input">
                            <p class="help-text">Biarkan kosong jika tidak ingin mengubah foto. Maksimal 5MB.</p>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                Update UMKM
                            </button>
                            <a href="umkm-list.php" class="btn btn-secondary">Batal</a>
                        </div>

                        <p id="formMessage" class="message"></p>
                    </form>
                </div>
            </main>
        </div>
    </div>

    <script src="assets/js/umkm-edit.js"></script>
    <script src="assets/js/script.js"></script>
</body>

</html>