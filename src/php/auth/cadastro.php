<?php
session_start();

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $dados = json_decode(file_get_contents('php://input'), true);

    if (empty($dados['nome']) || !preg_match("/^[a-zA-Z\s]{3,}/", $dados['nome'])) {
        $errors[] = "Nome inválido.";
    }

    if (empty($dados['genero']) || !in_array($dados['genero'], ["masculino", "feminino", "Outro"])) {
        $errors[] = "Gênero inválido.";
    }

    if (empty($dados['cpf']) || !preg_match("/^\d{3}\.\d{3}\.\d{3}-\d{2}$/", $dados['cpf'])) {
        $errors[] = "CPF inválido.";
    }

    if (empty($dados['telefone']) || !preg_match("/^(?:\(?[1-9]{2}\)?)?\s?9\d{4}-?\d{4}$/", $dados['telefone'])) {
        $errors[] = "Telefone inválido.";
    }

    if (empty($dados['email']) || !filter_var($dados['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email inválido.";
    }

    if (empty($dados['senha']) || strlen($dados['senha']) < 6) {
        $errors[] = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (empty($dados['estado']) || !preg_match("/^[a-zA-Z\s]+$/", $dados['estado'])) {
        $errors[] = "Estado inválido.";
    }

    if (empty($dados['cidade']) || !preg_match("/^[a-zA-Z\s]+$/", $dados['cidade'])) {
        $errors[] = "Cidade inválida.";
    }

    if (empty($dados['municipio']) || !preg_match("/^[a-zA-Z\s]+$/", $dados['municipio'])) {
        $errors[] = "Município inválido.";
    }

    if (empty($dados['tipoLogradouro'])) {
        $errors[] = "Tipo de logradouro é obrigatório.";
    }

    if (empty($dados['nomeLogradouro'])) {
        $errors[] = "Nome do logradouro é obrigatório.";
    }

    if (empty($dados['numeroLogradouro']) || !is_numeric($dados['numeroLogradouro'])) {
        $errors[] = "Número do endereço inválido.";
    }

    if (!empty($errors)) {

        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }

    } else {

        $_SESSION['nome'] = $dados['nome'];
        $_SESSION['nasc'] = $dados['nasc'];
        $_SESSION['genero'] = $dados['genero'];
        $_SESSION['cpf'] = $dados['cpf'];
        $_SESSION['telefone'] = $dados['telefone'];
        $_SESSION['email'] = $dados['email'];
        $_SESSION['senha'] = password_hash($dados['senha'], PASSWORD_DEFAULT); 
        $_SESSION['estado'] = $dados['estado'];
        $_SESSION['cidade'] = $dados['cidade'];
        $_SESSION['municipio'] = $dados['municipio'];
        $_SESSION['tipo_logradouro'] = $dados['tipoLogradouro'];
        $_SESSION['nome_logradouro'] = $dados['nomeLogradouro'];
        $_SESSION['numero'] = $dados['numeroLogradouro'];

        if(isset($dados['complemento'])) {

            $_SESSION['complemento'] = $dados['complemento'];

        }
        
        echo json_encode(['success' => true]);

    }
}
?>


