<?php
    switch ($_SERVER['REQUEST_URI']) {
        case '/php/auth.php/elete-conta':
            if($_server['REQUEST_METHOD'] == 'delete') {
                $info = json_decode(file_get_contents('php://input'), true);
                $tipo = $url[3];
                $id = $url[4];

                $conn = conectarBanco();

                if ($tipo === 'pessoa-fisica') {
                    $sql = "DELETE FROM usuarios WHERE id = ? AND tipo = 'pessoa Física'";
                }  elseif ($tipo === 'pesoa juridica') {
                    $sql = "DELETE FROM usuarios WHERE id = ? AND tipo = 'pessoa Juridica'";
                }  else {
                    http_response_code(400);
                    echo json_encode(["menssage" => "Tipo invalido"]);
                    exit;
                }


                $stmt = $con -> prepare ($sql);
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
            $conn->close();
    }

?>