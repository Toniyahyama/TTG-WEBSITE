<?php
// backend/create_umkm.php
include_once 'db.php';
include_once 'auth_check.php'; // Ensure admin is logged in

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_umkm = $_POST['nama_umkm'] ?? '';
    $kategori_umkm = $_POST['kategori_umkm'] ?? '';
    $alamat = $_POST['alamat'] ?? '';
    $rw = $_POST['rw'] ?? '';
    $no_telp = $_POST['no_telp'] ?? '';
    $nama_pemilik = $_POST['nama_pemilik'] ?? '';
    $deskripsi = $_POST['deskripsi'] ?? '';
    $foto = null;

    // Handle file upload
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
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "HEIC" ) {
                $response['message'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            } else {
                if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
                    $foto = $new_file_name;
                } else {
                    $response['message'] = "Sorry, there was an error uploading your file.";
                }
            }
        } else {
            $response['message'] = "File is not an image.";
        }
    } else {
        // Use default image if no image uploaded
        $foto = 'default_umkm.png'; // Make sure you have a default_umkm.png in uploads/umkm/
    }

    if ($foto !== null || (isset($_FILES['foto']) && $_FILES['foto']['error'] !== UPLOAD_ERR_OK)) {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO umkm (nama_umkm, kategori_umkm, alamat, rw, no_telp, nama_pemilik, deskripsi, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $nama_umkm, $kategori_umkm, $alamat, $rw, $no_telp, $nama_pemilik, $deskripsi, $foto);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'UMKM added successfully!';
        } else {
            $response['message'] = 'Error adding UMKM: ' . $stmt->error;
        }
        $stmt->close();
    }
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>