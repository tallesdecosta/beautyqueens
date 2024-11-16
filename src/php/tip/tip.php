<?php
header("Content-Type: application/json");

include 'criar-bd.php';

try {
    $conn = conectarBanco();
} catch (Exception $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

session_start();
$tonalidade = $_SESSION['tonalidade'] ?? null;
$cicatriz = $_SESSION['cicatriz'] ?? null;

if (!$tonalidade || $cicatriz === null) {
    echo json_encode(["error" => "Skin information not found in session."]);
    exit();
}

try {
    $sql = "SELECT tip FROM tips WHERE tonalidade = ? AND (cicatriz = ? OR cicatriz IS NULL) LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $tonalidade, $cicatriz);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["tip" => $row['tip']]);
    } else {
        echo json_encode(["message" => "Nenhuma dica encontrada."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Falha em achar uma dica: " . $e->getMessage()]);
}

$conn->close();
?>
