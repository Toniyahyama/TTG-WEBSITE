<?php
// backend/login.php
session_start();
include_once 'db.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Sanitize input (basic)
    $username = htmlspecialchars($username);

    // Prepare statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT ID_user, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['user_id'] = $user['ID_user'];
            $_SESSION['username'] = $user['username'];
            $response['success'] = true;
            $response['message'] = 'Login successful!';
        } else {
            $response['message'] = 'Invalid username or password.';
        }
    } else {
        $response['message'] = 'Invalid username or password.';
    }

    $stmt->close();
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($response);

// Example for adding an admin user (run this once, then comment out)
/*
$admin_username = 'admin';
$admin_password = password_hash('password123', PASSWORD_BCRYPT); // Hash the password
$stmt_insert = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt_insert->bind_param("ss", $admin_username, $admin_password);
if ($stmt_insert->execute()) {
    echo "Admin user 'admin' created with password 'password123'<br>";
} else {
    echo "Error creating admin user: " . $stmt_insert->error . "<br>";
}
$stmt_insert->close();
*/
?>