<?php
// Conexão com o banco de dados
$host = 'localhost';
$dbname = 'nome_do_banco';
$user = 'usuario';
$pass = 'senha';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}

// Verifica se a ação é 'inserir' e o método é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'inserir') {
    // Recebe os dados do formulário
    $titulo = $_POST['title'];
    $texto = $_POST['content'];

    // Verifica se foi enviado um arquivo de imagem
    if (isset($_FILES['imageUpload']) && $_FILES['imageUpload']['error'] === UPLOAD_ERR_OK) {
        $imageTempPath = $_FILES['imageUpload']['tmp_name'];
        $imageName = $_FILES['imageUpload']['name'];
        $uploadDir = 'uploads/';
        
        // Gera um caminho único para a imagem
        $imagePath = $uploadDir . uniqid() . '_' . $imageName;
        
        // Move a imagem para o diretório de upload
        if (move_uploaded_file($imageTempPath, $imagePath)) {
            try {
                // Insere o post no banco de dados
                $stmt = $pdo->prepare("INSERT INTO Post (titulo, texto, imagem) VALUES (:titulo, :texto, :imagem)");
                $stmt->bindParam(':titulo', $titulo);
                $stmt->bindParam(':texto', $texto);
                $stmt->bindParam(':imagem', $imagePath);
                $stmt->execute();

                echo json_encode(['status' => 'success', 'message' => 'Post inserido com sucesso!']);
            } catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao inserir post: ' . $e->getMessage()]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao fazer upload da imagem']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Imagem não enviada']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Ação inválida']);
}


// Consulta os posts do banco de dados
try {
    $stmt = $pdo->query("SELECT titulo, texto, imagem FROM Post ORDER BY id DESC LIMIT 5"); // Limita para os últimos 5 posts
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($posts); // Retorna os posts em formato JSON
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao buscar posts: ' . $e->getMessage()]);
}

// Função para atualizar um post
function atualizarPost($pdo, $id, $titulo, $conteudo) {
    $stmt = $pdo->prepare("UPDATE Post SET titulo = :titulo, texto = :texto WHERE post_id = :id");
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':texto', $conteudo);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    echo "Post atualizado com sucesso!";
}

// Função para deletar um post
function deletarPost($pdo, $id) {
    $stmt = $pdo->prepare("DELETE FROM Post WHERE post_id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    echo "Post deletado com sucesso!";
}

// Roteamento de ações
$action = $_GET['action'] ?? null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'inserir') {
    $titulo = $_POST['titulo'] ?? '';
    $conteudo = $_POST['conteudo'] ?? '';
    $imagem_id = $_POST['imagem_id'] ?? null;
    inserirPost($pdo, $titulo, $conteudo, $imagem_id);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'read') {
    $id = $_GET['id'] ?? null;
    buscarPosts($pdo, $id);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT' && $action === 'atualizar') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'] ?? null;
    $titulo = $_PUT['titulo'] ?? '';
    $conteudo = $_PUT['conteudo'] ?? '';
    if ($id) {
        atualizarPost($pdo, $id, $titulo, $conteudo);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $action === 'delete') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'] ?? null;
    if ($id) {
        deletarPost($pdo, $id);
    }
} else {
    echo "Ação inválida ou método HTTP não suportado.";
}
?>