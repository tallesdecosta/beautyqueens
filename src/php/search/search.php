<?php

    include '../auth/criar-bd.php';

    $conn = conectarBanco();

    
    if (create_tables($conn) == true) 
    {

        $st = $conn -> prepare("SELECT nome, nome_fantasia FROM produto JOIN pessoa_juridica ON produto.pessoa_id = pessoa_juridica.pessoa_id  WHERE nome LIKE CONCAT('%', ?, '%')");

        $st -> bind_param("s", $_GET['termo']);
        $st -> execute();
        
        $result = $st -> get_result();
        $data = [];

        while ($row = $result->fetch_assoc()) {
            $data[] = $row; 
        }
        $st->close();
        header('Content-Type: application/json');
        echo json_encode($data);
          
    } else 
    {

        echo json_encode(['error' => 'internal server error']);

    }
    

?>