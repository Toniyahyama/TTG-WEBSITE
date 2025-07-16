<?php
// backend/delete_umkm.php
include_once 'db.php';
include_once 'auth_check.php'; // Ensure admin is logged in

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_umkm = $_POST['id_umkm'] ?? '';

    if ($id_umkm) {
        // First, get the photo filename to delete it from the server
        $stmt_select = $conn->prepare("SELECT foto FROM umkm WHERE id_umkm = ?");
        $stmt_select->bind_param("i", $id_umkm);
        $stmt_select->execute();
        $result = $stmt_select->get_result();
        $umkm_data = $result->fetch_assoc();
        $stmt_select->close();

        if ($umkm_data && $umkm_data['foto'] && $umkm_data['foto'] != 'default.jpeg') {
            $target_dir = "../uploads/umkm/";
            $file_to_delete = $target_dir . $umkm_data['foto'];
            if (file_exists($file_to_delete)) {
                unlink($file_to_delete); // Delete the actual file
            }
        }

        // Now, delete the record from the database
        $stmt = $conn->prepare("DELETE FROM umkm WHERE id_umkm = ?");
        $stmt->bind_param("i", $id_umkm);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Berhasil menghapus UMKM.';
        } else {
            $response['message'] = 'Error deleting UMKM: ' . $stmt->error;
        }
        $stmt->close();
    } else {
        $response['message'] = 'UMKM ID is missing.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>