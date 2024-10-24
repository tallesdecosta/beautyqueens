<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function conectarBanco() {
    $host = 'localhost';
    $dbname = 'nome_do_banco_de_dados';
    $username = 'usuario';
    $password = 'senha';

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo json_encode(["erro" => "Erro de conexão com o banco de dados: " . mysqli_connect_error()]);
        return null;
    }
    return $conn;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        isset($data['nome']) &&
        isset($data['genero']) &&
        isset($data['cpf']) &&
        isset($data['contato']) &&
        isset($data['email']) &&
        isset($data['senha']) &&
        isset($data['estado']) &&
        isset($data['cidade']) &&
        isset($data['municipio']) &&
        isset($data['logradouro']) &&
        isset($data['numero'])
    ) {
        $conn = conectarBanco();

        if ($conn) {
            $query = "INSERT INTO usuarios 
                (nome, genero, cpf, contato, email, senha, estado, cidade, municipio, logradouro, numero, complemento) 
                VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            if ($stmt = mysqli_prepare($conn, $query)) {
                $hashed_password = password_hash($data['senha'], PASSWORD_DEFAULT);
                mysqli_stmt_bind_param($stmt, "ssssssssssss", $data['nome'], $data['genero'], $data['cpf'], $data['contato'], $data['email'], $hashed_password, $data['estado'], $data['cidade'], $data['municipio'], $data['logradouro'], $data['numero'], $data['complemento']);

                if (mysqli_stmt_execute($stmt)) {
                    http_response_code(201);
                    echo json_encode(["sucesso" => "Usuário cadastrado com sucesso"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["erro" => "Erro ao cadastrar usuário"]);
                }

                mysqli_stmt_close($stmt);
            } else {
                http_response_code(500);
                echo json_encode(["erro" => "Erro ao preparar a consulta"]);
            }

            mysqli_close($conn);
        } else {
            http_response_code(500);
            echo json_encode(["erro" => "Erro na conexão com o banco de dados"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["erro" => "Dados incompletos"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["erro" => "Método não permitido"]);
}
