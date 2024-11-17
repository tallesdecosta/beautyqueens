<?php
// Database connection settings
$host = 'localhost';
$dbname = 'your_database';
$user = 'your_username';
$password = 'your_password';

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Handle file upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image'];
        $imagePath = 'uploads/' . basename($image['name']);

        // Move the file to the uploads directory
        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            // Insert the image path into the database
            $stmt = $pdo->prepare("INSERT INTO images (path) VALUES (:path)");
            $stmt->bindParam(':path', $imagePath);

            if ($stmt->execute()) {
                echo "Image uploaded successfully!";
            } else {
                echo "Failed to insert image into database.";
            }
        } else {
            echo "Failed to upload image.";
        }
    } else {
        echo "No image uploaded or an error occurred.";
    }
}
?>
