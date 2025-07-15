<?php
// backend/update_umkm.php
include_once 'db.php';
include_once 'auth_check.php'; // Ensure admin is logged in

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_umkm = $_POST['id_umkm'] ?? '';
    $nama_umkm = $_POST['nama_umkm'] ?? '';
    $kategori_umkm = $_POST['kategori_umkm'] ?? '';
    $alamat = $_POST['alamat'] ?? '';
    $rw = $_POST['rw'] ?? ''; // Tambahkan ini
    $no_telp = $_POST['no_telp'] ?? '';
    $nama_pemilik = $_POST['nama_pemilik'] ?? '';
    $deskripsi = $_POST['deskripsi'] ?? '';
    $current_foto = $_POST['current_foto'] ?? null;
    $foto = $current_foto;

    // Handle file upload (if new image is provided)
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $target_dir = "../uploads/umkm/";
        // Create directory if not exists
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $imageFileType = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));
        $new_file_name = uniqid('umkm_') . '.' . $imageFileType;
        $target_file = $target_dir . $new_file_name;

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["foto"]["tmp_name"]);
        if($check !== false) {
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                $response['message'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            } else {
                if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
                    // Delete old photo if it's not the default and a new one was uploaded
                    if ($current_foto && $current_foto != 'default_umkm.png' && file_exists($target_dir . $current_foto)) {
                        unlink($target_dir . $current_foto);
                    }
                    $foto = $new_file_name;
                } else {
                    $response['message'] = "Sorry, there was an error uploading your file.";
                }
            }
        } else {
            $response['message'] = "File is not an image.";
        }
    }

    if ($id_umkm) {
        // Prepare and bind
        $stmt = $conn->prepare("UPDATE umkm SET nama_umkm = ?, kategori_umkm = ?, alamat = ?, rw = ?, no_telp = ?, nama_pemilik = ?, deskripsi = ?, foto = ? WHERE id_umkm = ?");
        $stmt->bind_param("ssssssssi", $nama_umkm, $kategori_umkm, $alamat, $rw, $no_telp, $nama_pemilik, $deskripsi, $foto, $id_umkm);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'UMKM updated successfully!';
        } else {
            $response['message'] = 'Error updating UMKM: ' . $stmt->error;
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