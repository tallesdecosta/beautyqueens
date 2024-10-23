<?php
$host = 'localhost';
$dbname = 'seu_banco_de_dados';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Erro ao conectar com o banco de dados: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'GET' && !isset($_GET['id'])) {
    $sql = "SELECT * FROM usuarios";
    $result = $conn->query($sql);
    $usuarios = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
    }
    echo json_encode($usuarios);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();

    if ($usuario) {
        echo json_encode($usuario);
    } else {
        echo json_encode(['erro' => 'Usuário não encontrado']);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $data['nome'];
    $genero = $data['genero'];
    $cpf = $data['cpf'];
    $contato = $data['contato'];
    $email = $data['email'];
    $senha = password_hash($data['senha'], PASSWORD_DEFAULT);
    $estado = $data['estado'];
    $cidade = $data['cidade'];
    $municipio = $data['municipio'];
    $logradouro = $data['logradouro'];
    $numero = $data['numero'];
    $complemento = $data['complemento'];

    if (empty($nome) || empty($cpf) || empty($email) || empty($senha)) {
        echo json_encode(['erro' => 'Campos obrigatórios não foram preenchidos']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO usuarios (nome, genero, cpf, contato, email, senha, estado, cidade, municipio, logradouro, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('sssssssssss', $nome, $genero, $cpf, $contato, $email, $senha, $estado, $cidade, $municipio, $logradouro, $numero, $complemento);

    if ($stmt->execute()) {
        echo json_encode(['sucesso' => 'Usuário cadastrado com sucesso']);
    } else {
        echo json_encode(['erro' => 'Erro ao cadastrar usuário']);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $id = $data['id'];
    $nome = $data['nome'];
    $genero = $data['genero'];
    $cpf = $data['cpf'];
    $contato = $data['contato'];
    $email = $data['email'];
    $estado = $data['estado'];
    $cidade = $data['cidade'];
    $municipio = $data['municipio'];
    $logradouro = $data['logradouro'];
    $numero = $data['numero'];
    $complemento = $data['complemento'];

    $stmt = $conn->prepare("UPDATE usuarios SET nome=?, genero=?, cpf=?, contato=?, email=?, estado=?, cidade=?, municipio=?, logradouro=?, numero=?, complemento=? WHERE id=?");
    $stmt->bind_param('sssssssssssi', $nome, $genero, $cpf, $contato, $email, $estado, $cidade, $municipio, $logradouro, $numero, $complemento, $id);

    if ($stmt->execute()) {
        echo json_encode(['sucesso' => 'Usuário atualizado com sucesso']);
    } else {
        echo json_encode(['erro' => 'Erro ao atualizar usuário']);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = $data['id'];

    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id=?");
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode(['sucesso' => 'Usuário excluído com sucesso']);
    } else {
        echo json_encode(['erro' => 'Erro ao excluir usuário']);
    }
}

$conn->close();

