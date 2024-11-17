<?php

session_start();


include 'auth/criar-bd.php';
$conn = conectarBanco();
if ($_GET['action'] === 'inserirSacola') {
    inserirSacola();
}

if ($_GET['action'] === 'read') {
    read();
}

header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "seu_banco_de_dados";



if ($conn->connect_error) {
    die(json_encode(["status" => "Erro de conexão: " . $conn->connect_error]));
}

function deleteItem($id) {
    global $conn;
    $sql = "DELETE FROM sacola WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}

function alterarQuantidade($id, $delta) {
    global $conn;
    $sql = "UPDATE sacola SET quantidade = GREATEST(quantidade + ?, 0) WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $delta, $id);
    $stmt->execute();
    $stmt->close();
}

function limparSacola() {
    global $conn;
    create_tables($conn);
    $sql = "DELETE FROM sacola WHERE pessoa_id = '".$_SESSION['id']."';";
    $conn->query($sql);
}

function inserirSacola() {

    $data = json_decode(file_get_contents('php://input'), true);

    $conn = conectarBanco();
    create_tables($conn);

    $sql = "INSERT INTO sacola(pessoa_id, produto_id) VALUES('".$_SESSION['id']."', '".$data['id']."');";

    $conn->query($sql);


}

function read() {
    $conn = conectarBanco();
    create_tables($conn);
    $sql = "
    SELECT 
        sacola.produto_id, 
        produto.nome,
        pessoa_juridica.nome_fantasia, 
        COUNT(sacola.produto_id) AS quantidade
    FROM 
        sacola
    JOIN 
        produto ON sacola.produto_id = produto.produto_id
    JOIN
        pessoa_juridica ON produto.pessoa_id = pessoa_juridica.pessoa_id
    GROUP BY 
        sacola.produto_id, produto.nome, pessoa_juridica.nome_fantasia";

    $result = $conn->query($sql);

    $itens = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $itens[] = $row;
        }
        echo json_encode(["status" => "Itens encontrados", "itens" => $itens]);
        exit();
    } else {
        echo json_encode(["status" => "A sacola está vazia"]);
    }

}

if ($_GET['action'] === 'clear') {
    limparSacola();
    echo json_encode(['status' => 'Sacola limpa com sucesso']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($_GET['action'] === 'deleteItem' && isset($data['id'])) {

        deleteItem($data['id']);
        echo json_encode(['status' => 'Item removido com sucesso']);

    } elseif ($_GET['action'] === 'increment' && isset($data['id'])) {
        alterarQuantidade($data['id'], 1);
        echo json_encode(['status' => 'Quantidade incrementada com sucesso']);
    } elseif ($_GET['action'] === 'decrement' && isset($data['id'])) {
        alterarQuantidade($data['id'], -1);
        echo json_encode(['status' => 'Quantidade decrementada com sucesso']);
    } elseif ($_GET['action'] === 'clear') {
        limparSacola();
        echo json_encode(['status' => 'Sacola limpa com sucesso']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'read') {
    read();
}

$conn->close();
?>
