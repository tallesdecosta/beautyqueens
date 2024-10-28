<?php

    require ('criar-bd.php');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    
    switch ($_SERVER['REQUEST_URI']) {

        case '/php/auth/auth.php/login':
            
            if($_SERVER['REQUEST_METHOD'] == 'POST') {

                $info = json_decode(file_get_contents('php://input'), true);

                $email = $info['email'];
                $password_form = $info['password']; 
                
                $conn = conectarBanco();

                if (create_tables($conn) == true) 
                {

                    $st = $conn -> prepare("SELECT pessoa_id, senha FROM pessoa WHERE email = (?)");

                    $st -> bind_param("s", $email);
                    $st -> execute();
                    
                    $result = $st -> get_result();
                    
                    if ($result -> num_rows != 0) {
                        
                        $row = $result -> fetch_assoc();

                        if (password_verify($password_form, $row['senha']) === true) {

                            $_SESSION['id'] = $row['pessoa_id'];
                            echo json_encode(['auth' => true]);
                            

                        } else {

                            http_response_code(401);

                            echo json_encode(['auth' => false, 'motivo' => 'senha incorreta'], JSON_UNESCAPED_UNICODE);

                        }
                        
                    } else 
                    {

                        http_response_code(401);

                        echo json_encode(['auth' => false, 'motivo' => 'e-mail não encontrado na base de dados'], JSON_UNESCAPED_UNICODE);

                    }
                      
                } else 
                {

                    echo json_encode(['error' => 'internal server error']);

                }
                

                
            };

            break;

        case '/php/auth/auth.php/register':

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

            break;

        default:

            echo 'Esse endpoint não existe.';


    };

?>