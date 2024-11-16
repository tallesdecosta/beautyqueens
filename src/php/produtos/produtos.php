<?php
include '.../auth/criar-bd';

    switch ($_SERVER['REQUEST_URI']) {

        case '/php/produtos/produtos.php/consulta-individual':
            
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {

                
                $termo = $_GET['termo'];
                $conn = conectarBanco();

                if (create_tables($conn) == true) 
                {

        
                      
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