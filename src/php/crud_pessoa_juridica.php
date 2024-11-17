<?php
class PessoaJuridica {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create - Inserir nova pessoa jurídica
    public function create($data) {
        $query = "INSERT INTO PessoaJuridica (
            cnpj_cpf, 
            pessoa_id,
            titulo, 
            abertura,
            ultimo_sync,
            status,
            pessoa_nome,
            pessoa_tipo) 
        VALUES (
            :cnpj_cpf,
            :pessoa_id,
            :titulo,
            :abertura,
            NOW(),
            :status,
            :pessoa_nome,
            'J')"; // J para Jurídica

        try {
            $stmt = $this->conn->prepare($query);
            
            // Sanitize and bind data
            $stmt->bindParam(':cnpj_cpf', $data['cnpj_cpf']);
            $stmt->bindParam(':pessoa_id', $data['pessoa_id']);
            $stmt->bindParam(':titulo', $data['titulo']);
            $stmt->bindParam(':abertura', $data['abertura']);
            $stmt->bindParam(':status', $data['status']);
            $stmt->bindParam(':pessoa_nome', $data['pessoa_nome']);
            
            if($stmt->execute()) {
                return true;
            }
            return false;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    // Read - Buscar uma pessoa jurídica específica
    public function read($cnpj_cpf) {
        $query = "SELECT 
                    pj.*,
                    p.nome,
                    p.email,
                    p.telefone,
                    e.estado,
                    e.cidade,
                    e.municipio,
                    e.logradouro,
                    e.numero,
                    e.complemento
                FROM 
                    PessoaJuridica pj
                    LEFT JOIN Pessoa p ON p.pessoa_id = pj.pessoa_id
                    LEFT JOIN Endereco e ON e.pessoa_id = p.pessoa_id
                WHERE 
                    pj.cnpj_cpf = :cnpj_cpf";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':cnpj_cpf', $cnpj_cpf);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    // Update - Atualizar pessoa jurídica
    public function update($data) {
        $query = "UPDATE PessoaJuridica 
                SET 
                    titulo = :titulo,
                    status = :status,
                    ultimo_sync = NOW(),
                    pessoa_nome = :pessoa_nome
                WHERE 
                    cnpj_cpf = :cnpj_cpf";

        try {
            $stmt = $this->conn->prepare($query);
            
            // Bind data
            $stmt->bindParam(':cnpj_cpf', $data['cnpj_cpf']);
            $stmt->bindParam(':titulo', $data['titulo']);
            $stmt->bindParam(':status', $data['status']);
            $stmt->bindParam(':pessoa_nome', $data['pessoa_nome']);
            
            if($stmt->execute()) {
                // Update related tables
                $this->updatePessoaInfo($data);
                $this->updateEndereco($data);
                return true;
            }
            return false;
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    // Delete - Remover pessoa jurídica
    public function delete($cnpj_cpf) {
        // First, get the pessoa_id
        $query = "SELECT pessoa_id FROM PessoaJuridica WHERE cnpj_cpf = :cnpj_cpf";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':cnpj_cpf', $cnpj_cpf);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($result) {
            try {
                $this->conn->beginTransaction();
                
                // Delete from PessoaJuridica
                $query = "DELETE FROM PessoaJuridica WHERE cnpj_cpf = :cnpj_cpf";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':cnpj_cpf', $cnpj_cpf);
                $stmt->execute();
                
                // Delete from Endereco
                $query = "DELETE FROM Endereco WHERE pessoa_id = :pessoa_id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':pessoa_id', $result['pessoa_id']);
                $stmt->execute();
                
                // Delete from Pessoa
                $query = "DELETE FROM Pessoa WHERE pessoa_id = :pessoa_id";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':pessoa_id', $result['pessoa_id']);
                $stmt->execute();
                
                $this->conn->commit();
                return true;
            } catch(PDOException $e) {
                $this->conn->rollBack();
                echo "Error: " . $e->getMessage();
                return false;
            }
        }
        return false;
    }

    // Helper method to update Pessoa information
    private function updatePessoaInfo($data) {
        $query = "UPDATE Pessoa 
                SET 
                    nome = :nome,
                    email = :email,
                    telefone = :telefone
                WHERE 
                    pessoa_id = :pessoa_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':pessoa_id', $data['pessoa_id']);
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':telefone', $data['telefone']);
        
        return $stmt->execute();
    }

    // Helper method to update Endereco information
    private function updateEndereco($data) {
        $query = "UPDATE Endereco 
                SET 
                    estado = :estado,
                    cidade = :cidade,
                    municipio = :municipio,
                    logradouro = :logradouro,
                    numero = :numero,
                    complemento = :complemento
                WHERE 
                    pessoa_id = :pessoa_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':pessoa_id', $data['pessoa_id']);
        $stmt->bindParam(':estado', $data['estado']);
        $stmt->bindParam(':cidade', $data['cidade']);
        $stmt->bindParam(':municipio', $data['municipio']);
        $stmt->bindParam(':logradouro', $data['logradouro']);
        $stmt->bindParam(':numero', $data['numero']);
        $stmt->bindParam(':complemento', $data['complemento']);
        
        return $stmt->execute();
    }

    // List - Listar todas as pessoas jurídicas
    public function list($page = 1, $limit = 10) {
        $offset = ($page - 1) * $limit;
        
        $query = "SELECT 
                    pj.*,
                    p.nome,
                    p.email,
                    p.telefone,
                    e.estado,
                    e.cidade
                FROM 
                    PessoaJuridica pj
                    LEFT JOIN Pessoa p ON p.pessoa_id = pj.pessoa_id
                    LEFT JOIN Endereco e ON e.pessoa_id = p.pessoa_id
                LIMIT :limit OFFSET :offset";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}

// Example usage:
/*
// Database connection
$db = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");
$pessoaJuridica = new PessoaJuridica($db);

// Create
$data = [
    'cnpj_cpf' => '12345678901234',
    'pessoa_id' => null,
    'titulo' => 'Empresa XYZ',
    'abertura' => '2024-01-01',
    'status' => 'A',
    'pessoa_nome' => 'Empresa XYZ Ltda',
    'nome' => 'Empresa XYZ Ltda',
    'email' => 'contato@xyz.com',
    'telefone' => '1199999999',
    'estado' => 'SP',
    'cidade' => 'São Paulo',
    'municipio' => 'São Paulo',
    'logradouro' => 'Av. Paulista',
    'numero' => '1000',
    'complemento' => 'Sala 123'
];
$pessoaJuridica->create($data);

// Read
$empresa = $pessoaJuridica->read('12345678901234');

// Update
$data['titulo'] = 'Empresa XYZ Atualizada';
$pessoaJuridica->update($data);

// Delete
$pessoaJuridica->delete('12345678901234');

// List
$empresas = $pessoaJuridica->list(1, 10); // Page 1, 10 items per page
*/