<?php
header("Content-Type: application/json");

include '../auth/criar-bd.php';

session_start();

if (!isset($_SESSION['tonalidade']) || !isset($_SESSION['cicatriz'])) {
    echo json_encode(['error' => 'User not authenticated.']);
    exit();
}

try {
    $conn = conectarBanco();
    create_tables($conn);
} catch (Exception $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT id, tip FROM tips";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $tips = [];
            while ($row = $result->fetch_assoc()) {
                $tips[] = $row;
            }
            echo json_encode(['tips' => $tips]);
        } else {
            echo json_encode(['error' => 'No tips found.']);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => "Error fetching tips: " . $e->getMessage()]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $tipId = $data['id'];

        try {
            $sql = "DELETE FROM tips WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $tipId);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "Failed to delete the tip."]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => "Error deleting tip: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid data."]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'], $data['tip'])) {
        $tipId = $data['id'];
        $newTip = $data['tip'];

        try {
            $sql = "UPDATE tips SET tip = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $newTip, $tipId);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "Failed to update the tip."]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => "Error updating tip: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Invalid data."]);
    }
}

$conn->close();
?>
