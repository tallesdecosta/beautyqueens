<?php
header("Content-Type: application/json");

include 'criar-bd.php';

try {
    $conn = conectarBanco();
} catch (Exception $e) {
    echo json_encode(["error" => "Não conseguiu se conectar ao banco: " . $e->getMessage()]);
    exit();
}

session_start();
$pessoa_id = $_SESSION['pessoa_id'] ?? null;
if (!$pessoa_id) {
    echo json_encode(["error" => "User not logged in."]);
    exit();
}

try {
    $sql = "SELECT tonalidade, cicatriz FROM pele WHERE pessoa_id = ?";;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $pessoa_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $tonalidade = $row['tonalidade'];
        $cicatriz = $row['cicatriz'];

        $sqlTip = "SELECT tip FROM tips WHERE tonalidade = ? AND (cicatriz = ? OR cicatriz IS NULL) LIMIT 1";
        $stmtTip = $conn->prepare($sqlTip);
        $stmtTip->bind_param("si", $tonalidade, $cicatriz);
        $stmtTip->execute();
        $resultTip = $stmtTip->get_result();

        if ($rowTip = $resultTip->fetch_assoc()) {
            echo json_encode(["tip" => $rowTip['tip']]);
        } else {
            echo json_encode(["message" => "No tips found for your skin type."]);
        }
    } else {
        echo json_encode(["error" => "Skin data not found for user."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Falha em achar uma dica: " . $e->getMessage()]);
}

$conn->close();
?>
