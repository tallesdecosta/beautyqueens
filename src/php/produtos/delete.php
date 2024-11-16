<?php
include '../auth/criar-bd.php';
session_start();

    switch ($_SERVER['REQUEST_URI']) {

        case '/php/produtos/delete.php':
            
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                
                $dados = json_decode(file_get_contents('php://input'), true);
    
                $conn = conectarBanco();
                
                if (create_tables($conn) == true) 
                {

                   
                    
                    // Step 1: Get the imagem_id using produto_id
                    $sqlGetImagemId = "SELECT imagem_id FROM produto WHERE produto_id = ?";
                    $stmtGetImagemId = $conn->prepare($sqlGetImagemId);
                    $stmtGetImagemId->bind_param('i', $dados['id']);
                    $stmtGetImagemId->execute();
                    $result = $stmtGetImagemId->get_result();
                    $row = $result->fetch_assoc();

                    if ($row) {
                        $imagem_id = $row['imagem_id'];

                        // Step 2: Delete from produto using produto_id (to satisfy the foreign key constraint)
                        $sqlDeleteProduto = "DELETE FROM produto WHERE produto_id = ?";
                        $stmtDeleteProduto = $conn->prepare($sqlDeleteProduto);
                        $stmtDeleteProduto->bind_param('i', $dados['id']);
                        $stmtDeleteProduto->execute();

                        // Step 3: Delete from imagem using imagem_id
                        $sqlDeleteImagem = "DELETE FROM imagem WHERE imagem_id = ?";
                        $stmtDeleteImagem = $conn->prepare($sqlDeleteImagem);
                        $stmtDeleteImagem->bind_param('i', $imagem_id);
                        $stmtDeleteImagem->execute();
                        echo 'success';
                    } else {
                        echo "No associated imagem found for the given produto_id.";
                    }
                            
                            
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