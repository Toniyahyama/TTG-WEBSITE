<?php
header('Content-Type: application/json');
require_once 'koneksi.php'; // pastikan file koneksi ini benar

try {
    // Query RW unik dari tabel UMKM (asumsinya RW tersimpan dalam format '01', '02', dst.)
    $query = "SELECT DISTINCT LPAD(rw, 2, '0') AS rw FROM umkm ORDER BY rw ASC";
    $result = mysqli_query($conn, $query);

    $rwList = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rwList[] = $row['rw'];
    }

    echo json_encode($rwList);
} catch (Exception $e) {
    echo json_encode([]);
}
?>
