<?php
header('Content-Type: application/json');

// Koneksi ke database
$host = 'localhost';
$db   = 'tanjak';
$user = 'root'; // ganti jika kamu pakai user lain
$pass = '';     // ganti jika ada password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Gagal koneksi database: ' . $e->getMessage()
    ]);
    exit;
}

// Ambil ID dari parameter GET
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    echo json_encode([
        'success' => false,
        'message' => 'ID UMKM tidak valid.'
    ]);
    exit;
}

// Query untuk ambil data UMKM berdasarkan ID
$stmt = $pdo->prepare("SELECT * FROM umkm WHERE id_umkm = ?");
$stmt->execute([$id]);
$umkm = $stmt->fetch();

if ($umkm) {
    echo json_encode([
        'success' => true,
        'data' => $umkm
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Data UMKM tidak ditemukan.'
    ]);
}
