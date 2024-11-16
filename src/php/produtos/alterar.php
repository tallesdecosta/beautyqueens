<?php
include '../auth/criar-bd.php';
session_start();

    switch ($_SERVER['REQUEST_URI']) {

        case '/php/produtos/alterar.php':
            
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                
                $dados = json_decode(file_get_contents('php://input'), true);
    
                $conn = conectarBanco();
                
                if (create_tables($conn) == true) 
                {

                   
                    $sql = "UPDATE produto SET nome = ?, categoria = ?, composicao = ?, contraindicacao = ?, descricao = ?, disponibilidade = ?, posologia = ?, eh_vegano = ?, volume = ? WHERE produto_id = ?;";

                    $st = $conn -> prepare($sql);
                    $st -> bind_param('sssssisiii', $dados['nome'], $dados['cat'], $dados['comp'], $dados['contraindic'], $dados['desc'], $dados['disp'], $dados['poso'], $dados['veg'], $dados['vol'], $dados['id']);
                    $st -> execute();
                    
                            
                            
                } else 
                {

                    echo json_encode(['error' => 'erro interno do servidor']);

                }



            } else {

                echo json_encode(['erro' => 'método não autorizado nessa endpoint.']);

            }

            break;
        
        default:
            # code...
            break;
    }


?>