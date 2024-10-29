<?php
session_start();
include 'conexao.php'; 

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['nome']) || !preg_match("/^[a-zA-Z\s]+$/", $_POST['nome'])) {
        $errors[] = "Nome inválido.";
    }

    if (empty($_POST['genero']) || !in_array($_POST['genero'], ["Masculino", "Feminino", "Outro"])) {
        $errors[] = "Gênero inválido.";
    }

    if (empty($_POST['cpf']) || !preg_match("/^\d{11}$/", $_POST['cpf'])) {
        $errors[] = "CPF inválido.";
    }

    if (empty($_POST['telefone']) || !preg_match("/^\d{10,11}$/", $_POST['telefone'])) {
        $errors[] = "Telefone inválido.";
    }

    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email inválido.";
    }

    if (empty($_POST['senha']) || strlen($_POST['senha']) < 6) {
        $errors[] = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (empty($_POST['estado']) || !preg_match("/^[a-zA-Z\s]+$/", $_POST['estado'])) {
        $errors[] = "Estado inválido.";
    }

    if (empty($_POST['cidade']) || !preg_match("/^[a-zA-Z\s]+$/", $_POST['cidade'])) {
        $errors[] = "Cidade inválida.";
    }

    if (empty($_POST['municipio']) || !preg_match("/^[a-zA-Z\s]+$/", $_POST['municipio'])) {
        $errors[] = "Município inválido.";
    }

    if (empty($_POST['tipo-logradouro'])) {
        $errors[] = "Tipo de logradouro é obrigatório.";
    }

    if (empty($_POST['nome-logradouro'])) {
        $errors[] = "Nome do logradouro é obrigatório.";
    }

    if (empty($_POST['numero']) || !is_numeric($_POST['numero'])) {
        $errors[] = "Número do endereço inválido.";
    }

    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    } else {
        $_SESSION['nome'] = $_POST['nome'];
        $_SESSION['genero'] = $_POST['genero'];
        $_SESSION['cpf'] = $_POST['cpf'];
        $_SESSION['telefone'] = $_POST['telefone'];
        $_SESSION['email'] = $_POST['email'];
        $_SESSION['senha'] = password_hash($_POST['senha'], PASSWORD_DEFAULT); 
        $_SESSION['estado'] = $_POST['estado'];
        $_SESSION['cidade'] = $_POST['cidade'];
        $_SESSION['municipio'] = $_POST['municipio'];
        $_SESSION['tipo_logradouro'] = $_POST['tipo-logradouro'];
        $_SESSION['nome_logradouro'] = $_POST['nome-logradouro'];
        $_SESSION['numero'] = $_POST['numero'];
        $_SESSION['complemento'] = $_POST['complemento'];

        header('Location: pele.php'); 
        exit();
    }
}
?>


