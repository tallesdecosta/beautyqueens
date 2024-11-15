<?php
    session_start();
    include '../auth/criar-bd.php';


    $conn = conectarBanco();

    if (create_tables($conn) == true) 
    {

        $sql = "SELECT * FROM produto WHERE pessoa_id = ?";

        $st = $conn -> prepare($sql);
        $st -> bind_param('i', $_SESSION['id']);
        $st -> execute();
        
        $result = $st -> get_result();

        $data = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($data);
        
    } else 
    {

        echo json_encode(['error' => 'erro interno do servidor']);

    }


    


?>