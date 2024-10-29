<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tonalidade_pele = $_POST['tonalidadePele'];
    $cicatrizes = $_POST['cicatrizes'];
    $aspectos_pele = $_POST['aspectosPele'];
    $alergias = $_POST['alergias'];

    $errors = [];

    if (empty($tonalidade_pele)) {
        $errors[] = "A tonalidade da pele é obrigatória.";
    }

    if (empty($cicatrizes)) {
        $errors[] = "Informe se possui cicatrizes.";
    }

    if (empty($aspectos_pele)) {
        $errors[] = "Informe os aspectos da pele.";
    }

    if (empty($alergias)) {
        $errors[] = "Informe se possui alergias.";
    }

    if (empty($errors)) {
        $_SESSION['tonalidade_pele'] = $tonalidade_pele;
        $_SESSION['cicatrizes'] = $cicatrizes;
        $_SESSION['aspectos_pele'] = $aspectos_pele;
        $_SESSION['alergias'] = $alergias;

        header('Location: confirmacao.php'); 
        session_write_close();
        exit();
    } else {
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    }

    session_destroy();
}
?>
