<?php
// api/delete-user.php
header('Content-Type: application/json');

// Habilitar CORS se necessário
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Verificar se é uma requisição DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Pegar dados da requisição
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['cnpj_cpf'])) {
    http_response_code(400);
    echo json_encode(['error' => 'CNPJ/CPF não fornecido']);
    exit;
}

try {
    // Conectar ao banco de dados
    $db = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");
    
    // Instanciar classe PessoaJuridica
    $pessoaJuridica = new PessoaJuridica($db);
    
    // Tentar deletar o usuário
    if ($pessoaJuridica->delete($data['cnpj_cpf'])) {
        http_response_code(200);
        echo json_encode(['message' => 'Usuário deletado com sucesso']);
    } else {
        throw new Exception('Erro ao deletar usuário');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}