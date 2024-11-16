<?php
include '../auth/criar-bd.php';
session_start();

    switch ($_SERVER['REQUEST_URI']) {

        case '/php/produtos/produtos.php':
            
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                
                $dados = json_decode(file_get_contents('php://input'), true);
    
                $conn = conectarBanco();
                
                if (create_tables($conn) == true) 
                {

                    $conn -> begin_transaction();
                    $arquivo = $dados['arquivo'];
                    $alt_text = $dados['alt'];
                    $pessoa_id = $_SESSION['id'];
                    $nome = $dados['nome'];
                    $composicao = $dados['comp'];
                    $contraindicacao = $dados['contraindic'];
                    $posologia = $dados['poso'];
                    $descricao = $dados['desc'];
                    $disponibilidade = $dados['disp'];
                    $eh_vegano = $dados['veg']; 
                    $volume = $dados['vol'];
                    $categoria = $dados['cat'];

                    
                        
                    $sql1 = "INSERT INTO imagem(arquivo, alt_text) VALUES (?, ?)";
                    $st1 = $conn->prepare($sql1);
                    $st1->bind_param('ss', $arquivo, $alt_text);


                    if (!$st1->execute()) {
                        throw new Exception("Error in imagem insert: " . $st1->error);
                      
                    }

                    $image_id = $conn->insert_id;

                    $sql2 = "INSERT INTO produto(pessoa_id, imagem_id, nome, composicao, contraindicacao, posologia, descricao, disponibilidade, eh_vegano, volume, categoria, clickrate)
                                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)";

                    $st2 = $conn->prepare($sql2);
                    $st2->bind_param('iissssssssi', $pessoa_id, $image_id, $nome, $composicao, $contraindicacao, $posologia, $descricao, $disponibilidade, $eh_vegano, $volume, $categoria);


                    if (!$st2->execute()) {
                        throw new Exception("Error in produto insert: " . $st2->error);
                        
                    }

                        
                    $conn->commit();
                    echo json_encode("Records inserted successfully.");
                    

                    $st1->close();
                    $st2->close();
                    $conn->close();
                            
                            
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