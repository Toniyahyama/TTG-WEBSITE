<?php
// backend/auth_check.php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../admin/index.php'); // Redirect to login page
    exit();
}
