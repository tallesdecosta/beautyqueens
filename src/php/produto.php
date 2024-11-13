<?php
// Configuração da conexão com o banco de dados
include "auth.php";
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "bq_database";

// Criar conexão

$conn = conectarBanco();
create_tables($conn);
// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Obter o ID do produto da URL
$product_id = $_GET['id'];

// Consultar as informações do produto
$sql = "SELECT * FROM produto JOIN imagem ON imagem.imagem_id = produto.imagem_id WHERE produto_id = $product_id";
$result = $conn->query($sql);

$data = [];
        

while ($row = $result->fetch_assoc()) {
            
    if ($row['arquivo'] !== null) {

        $row['arquivo'] = base64_encode($row['arquivo']);
    }

    $data[] = $row;
}
        

if ($result->num_rows > 0) {


    // Preparar os dados do produto em formato JSON
    $product_data = json_encode($data);

    // Cabeçalhos para enviar o JSON
    header('Content-Type: application/json');
    echo $product_data;
} else {
    echo json_encode(["status" => "produto não encontrado"]);
}

$conn->close();
?>