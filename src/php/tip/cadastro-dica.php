<?php
header("Content-Type: application/json");

include '../auth/criar-bd.php';

try {
    $conn = conectarBanco();
} catch (Exception $e) {
    echo json_encode(["error" => "Erro ao conectar ao banco: " . $e->getMessage()]);
    exit();
}

$tonalidade = $_POST['tonalidade'] ?? null;
$cicatriz = $_POST['cicatriz'] ?? null;
$tip = $_POST['tip'] ?? null;

if (!$tonalidade || $cicatriz === null || !$tip) {
    echo json_encode(["error" => "Todos os campos são obrigatórios."]);
    exit();
}

try {
    $stmt = $conn->prepare("INSERT INTO tips (tonalidade, cicatriz, tip) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $tonalidade, $cicatriz, $tip);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Dica enviada com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro ao salvar a dica."]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erro: " . $e->getMessage()]);
}

$conn->close();
?>
