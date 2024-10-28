<?php


function conectarBanco() {
    $servername = "localhost";
    $username = "seu_usuario";
    $password = "sua_senha";
    $dbname = "seu_banco_de_dados";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Erro ao conectar ao banco de dados: " . $conn->connect_error);
    }
    return $conn;
}

switch ($_SERVER['REQUEST_URI']) {
    case '/php/auth.php/cadastrar-conta':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['nome_fantasia'], $data['username'], $data['email'], $data['senha'])) {
                http_response_code(400);
                echo json_encode(["message" => "Preencha todos os campos obrigatórios."]);
                exit;
            }

            $conn = conectarBanco();
            $senha_hash = password_hash($data['senha'], PASSWORD_DEFAULT);

            $sql = "INSERT INTO empresas (
                        nome_fantasia, username, data_abertura, situacao_cnpj, email, senha, 
                        estado, cidade, municipio, tipo_logradouro, complemento, numero
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            if ($stmt = $conn->prepare($sql)) {
                $stmt->bind_param(
                    "sssssssssssi",
                    $data['nome_fantasia'],
                    $data['username'],
                    $data['data_abertura'],
                    $data['situacao_cnpj'],
                    $data['email'],
                    $senha_hash,
                    $data['estado'],
                    $data['cidade'],
                    $data['municipio'],
                    $data['tipo_logradouro'],
                    $data['complemento'],
                    $data['numero']
                );

                if ($stmt->execute()) {
                    http_response_code(201);
                    echo json_encode(["message" => "Conta cadastrada com sucesso."]);
                } else {
                    http_response_code(500);
                    echo json_encode(["message" => "Erro ao tentar cadastrar. Tente novamente."]);
                }
                
                $stmt->close();
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Falha na preparação da consulta."]);
            }
            $conn->close();
        }
    break;
}
?>
