<?php
// backend/get_umkm.php
include_once 'db.php';

$response = ['success' => false, 'data' => [], 'message' => ''];

$sql = "SELECT id_umkm, nama_umkm, kategori_umkm, deskripsi, no_telp, foto FROM umkm ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response['data'][] = $row;
        }
        $response['success'] = true;
    } else {
        $response['message'] = 'No UMKM data found.';
    }
} else {
    $response['message'] = 'Error fetching UMKM data: ' . $conn->error;
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>