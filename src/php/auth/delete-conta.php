<?php
    include 'criar-bd.php';
    switch ($_SERVER['REQUEST_URI']) {
        case '/php/auth/delete-conta.php':

            if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
                
                $info = json_decode(file_get_contents('php://input'), true);
                $tipo = $info['tipo'];
                $id = $info['id'];

                $conn = conectarBanco();
                create_tables($conn);

                if ($tipo === 'pf') {

                    $sql = "DELETE FROM pessoa WHERE pessoa_id = ?";

                }  elseif ($tipo === 'pj') {

                    $sql = "DELETE pessoa, pessoa_fisica FROM pessoa INNER JOIN pessoa_juridica WHERE pessoa.pessoa_id = pessoa_juridica.pessoa_id AND pessoa.pessoa_id = ?";

                }  else {

                    http_response_code(400);
                    echo json_encode(["menssage" => "Tipo invalido"]);

                    exit;
                }


                $stmt = $conn -> prepare ($sql);
                $stmt -> bind_param("i", $id);

                if ($stmt ->execute()) {

                    http_response_code(200);
                    echo json_encode(["menssage" => "Usuario excluido com sucesso!"]);

                } else {

                    http_response_code(404);
                    echo json_encode(["message" => "Usuario não encontrado!"]);

                }

                $stmt -> close();
                
            }

            
    }

?>