<?php
include_once 'db.php';

$response = ['success' => false, 'data' => [], 'message' => ''];

$kategori = $_GET['kategori'] ?? '';
$rw = $_GET['rw'] ?? '';

$where = [];
$params = [];
$types = '';

if ($kategori) {
    $where[] = 'kategori_umkm = ?';
    $params[] = $kategori;
    $types .= 's';
}
if ($rw) {
    $where[] = 'rw = ?';
    $params[] = $rw;
    $types .= 's';
}

$sql = "SELECT id_umkm, nama_umkm, kategori_umkm, rw, deskripsi, no_telp, foto FROM umkm";
if ($where) {
    $sql .= " WHERE " . implode(' AND ', $where);
}
$sql .= " ORDER BY created_at DESC";

$stmt = $conn->prepare($sql);

if ($where) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $response['data'][] = $row;
    }
    $response['success'] = true;
} else {
    $response['message'] = 'Error fetching UMKM data: ' . $conn->error;
}

$stmt->close();
$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>