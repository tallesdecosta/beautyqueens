<?php

function conectarBanco() {
    $host = 'localhost';
    $dbname = 'bq_database';
    $username = 'root';
    $password = '1234';

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo json_encode(["erro" => "Erro de conexão com o banco de dados: " . mysqli_connect_error()]);
        return null;
    }
    
    return $conn;
}

function create_tables($conn) {

    $sql = "
CREATE DATABASE IF NOT EXISTS bq_database;
        USE bq_database;

    CREATE TABLE IF NOT EXISTS imagem  (
    
    imagem_id SERIAL PRIMARY KEY,
    arquivo BLOB NOT NULL,
    alt_text TINYTEXT NOT NULL
    
);

CREATE TABLE IF NOT EXISTS pessoa (
    
    pessoa_id SERIAL PRIMARY KEY,
    imagem_id BIGINT UNSIGNED NOT NULL,
    telefone CHAR(14) NOT NULL,
    senha CHAR(60) NOT NULL, 
    email VARCHAR(220) NOT NULL,
    nome_exib VARCHAR(60) NOT NULL,
    end_estado VARCHAR(20) NOT NULL,
    end_municipio VARCHAR(30) NOT NULL,
    end_tipo VARCHAR(20) NOT NULL,
    end_logradouro VARCHAR(40) NOT NULL,
    end_complemento VARCHAR(20) NOT NULL,
    end_numero CHAR(10) NOT NULL,
    FOREIGN KEY (imagem_id) REFERENCES imagem(imagem_id)
    
);

CREATE TABLE IF NOT EXISTS pessoa_juridica (

    cnpj CHAR(14) UNIQUE NOT NULL,
    pessoa_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    nome_fantasia VARCHAR(60) NOT NULL UNIQUE,
    data_abertura DATE NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    situ_cnpj BOOL NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoa(pessoa_id)
    
);

CREATE TABLE IF NOT EXISTS produto (

    produto_id SERIAL PRIMARY KEY,
    pessoa_id BIGINT UNSIGNED NOT NULL,
    imagem_id BIGINT UNSIGNED NOT NULL,
    nome VARCHAR(80) NOT NULL,
    composicao TEXT NOT NULL,
    contraindicacao  TEXT NOT NULL,
    posologia TEXT NOT NULL,
    descricao TEXT NOT NULL,
    disponibilidade BOOL NOT NULL,
    eh_vegano BOOL NOT NULL,
    volume INT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    clickrate BIGINT NOT NULL,
    FOREIGN KEY (imagem_id) REFERENCES imagem(imagem_id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_juridica(pessoa_id)

);

CREATE TABLE IF NOT EXISTS post (

    post_id SERIAL PRIMARY KEY,
    imagem_id BIGINT UNSIGNED NOT NULL,
    pessoa_id BIGINT UNSIGNED NOT NULL,
    titulo VARCHAR(80) NOT NULL,
    likes BIGINT NOT NULL,
    texto TEXT NOT NULL,
    FOREIGN KEY (imagem_id) REFERENCES imagem(imagem_id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_juridica(pessoa_id)

);

CREATE TABLE IF NOT EXISTS pessoa_fisica (

    cpf CHAR(11) UNIQUE NOT NULL,
    pessoa_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    nome VARCHAR(260) NOT NULL,
    data_nasc DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    eh_admin BOOL NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoa(pessoa_id)
    
);

CREATE TABLE IF NOT EXISTS dica_britney (

    pessoa_id BIGINT UNSIGNED NOT NULL,
    texto TEXT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_fisica(pessoa_id)

);

CREATE TABLE IF NOT EXISTS cronograma (

    cronograma_id SERIAL PRIMARY KEY,
    pessoa_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_fisica(pessoa_id)

);

CREATE TABLE IF NOT EXISTS produto_cronograma (

    cronograma_id BIGINT UNSIGNED NOT NULL,
    produto_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (cronograma_id) REFERENCES cronograma(cronograma_id),
    FOREIGN KEY (produto_id) REFERENCES produto(produto_id)

);

CREATE TABLE IF NOT EXISTS preferencia (

    preferencia_id SERIAL PRIMARY KEY,
    tipo TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS condicao (

    condicao_id SERIAL PRIMARY KEY,
    tipo TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS preferencia_pessoa (

    preferencia_id BIGINT UNSIGNED NOT NULL,
    pessoa_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (preferencia_id) REFERENCES preferencia(preferencia_id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_fisica(pessoa_id)

);

CREATE TABLE IF NOT EXISTS condicao_pessoa (

    condicao_id BIGINT UNSIGNED NOT NULL,
    pessoa_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (condicao_id) REFERENCES condicao(condicao_id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_fisica(pessoa_id)

);

CREATE TABLE IF NOT EXISTS pele (
  
    pessoa_id BIGINT UNSIGNED NOT NULL,
    tonalidade VARCHAR(15) NOT NULL,
    cicatriz BOOL NOT NULL,
    tipo VARCHAR(15) NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoa_fisica(pessoa_id)
  
);

CREATE TABLE IF NOT EXISTS alergia (

    alergia_id SERIAL PRIMARY KEY,
    tipo TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS aspecto (

    aspecto_id SERIAL PRIMARY KEY,
    tipo TEXT NOT NULL

);


CREATE TABLE IF NOT EXISTS aspecto_pele (

  aspecto_id BIGINT UNSIGNED NOT NULL, 
  pessoa_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (pessoa_id) REFERENCES pele(pessoa_id),
  FOREIGN KEY (aspecto_id) REFERENCES aspecto(aspecto_id)

);

CREATE TABLE IF NOT EXISTS alergia_pele (

  alergia_id BIGINT UNSIGNED NOT NULL, 
  pessoa_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (pessoa_id) REFERENCES pele(pessoa_id),
  FOREIGN KEY (alergia_id) REFERENCES alergia(alergia_id)

);
";


    if ($conn->multi_query($sql)) {
        do {
            // Check if there's a result set for the current query
            if ($result = $conn->store_result()) {
                // Free result if present
                $result->free();
            }
            // Check for the next result (moving to the next query)
        } while ($conn->more_results() && $conn->next_result());
        return true;
    } else {
        return false;
    }

}

?>