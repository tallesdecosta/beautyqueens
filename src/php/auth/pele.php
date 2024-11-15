<?php

include 'criar-bd.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $dados = json_decode(file_get_contents('php://input'), true);
    
    $tonalidade_pele = $dados['tonalidade'];
    $cicatrizes = $dados['cicatriz'];
    
    /*
    $aspectos_pele = $_POST['aspectosPele'];
    $alergias = $_POST['alergias'];
    */

    $errors = [];

    if (empty($tonalidade_pele)) {
        $errors[] = "A tonalidade da pele é obrigatória.";
    }

    if (empty($cicatrizes)) {
        $errors[] = "Informe se possui cicatrizes.";
    }

    /*
    if (empty($aspectos_pele)) {
        $errors[] = "Informe os aspectos da pele.";
    }

    if (empty($alergias)) {
        $errors[] = "Informe se possui alergias.";
    }
    */
    if (empty($errors)) {

        if ($cicatrizes == 'sim') {
            $_SESSION['cicatriz'] = 1;
        } else {
            $_SESSION['cicatriz'] = 0;
        }
        $_SESSION['tonalidade'] = $tonalidade_pele;


        




        $conn = conectarBanco();
        create_tables($conn);

        $sqlPessoa = "INSERT INTO pessoa(
            imagem_id, telefone, senha, email, nome_exib, end_estado, end_municipio, 
            end_tipo, end_logradouro, end_numero, end_complemento
        ) 
        VALUES (
            1, '".$_SESSION['telefone']."', '".$_SESSION['senha']."', '".$_SESSION['email']."', 
            '".$_SESSION['nome']."', '".$_SESSION['estado']."', '".$_SESSION['municipio']."', 
            '".$_SESSION['tipo_logradouro']."', '".$_SESSION['nome_logradouro']."', '".$_SESSION['numero']."', ''
        );";

    
    
        if ($conn->query($sqlPessoa) === TRUE) {
        // Get the last inserted ID
        $last_id = $conn->insert_id;
    
        // Prepare the next INSERT statements using the last ID
        $sqlPessoaFisica = "INSERT INTO pessoa_fisica (
                cpf, pessoa_id, nome, data_nasc, genero, eh_admin
            )
            VALUES (
                '".$_SESSION['cpf']."', $last_id, '".$_SESSION['nome']."', '".$_SESSION['nasc']."', '".$_SESSION['genero']."', 0 
            );";
    
        $sqlPele = "INSERT INTO pele(pessoa_id, cicatriz, tonalidade) 
            VALUES (
                $last_id, '".$_SESSION['cicatriz']."', '".$_SESSION['tonalidade']."'
            );";
    
        // Execute the second and third INSERT statements
        if ($conn->query($sqlPessoaFisica) === TRUE && $conn->query($sqlPele) === TRUE) {
            session_write_close();
            echo "Records inserted successfully.";
            exit();
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "Error: " . $conn->error;
    }

        

        
        

    } else {

        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }

    }

    session_destroy();
}
?>
