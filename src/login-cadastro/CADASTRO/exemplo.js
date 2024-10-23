fetch('http://seuservidor.com/cadastrar_usuario.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome: 'João Silva',
        genero: 'Masculino',
        cpf: '123.456.789-10',
        contato: '(11) 99999-9999',
        email: 'joao@example.com',
        senha: 'SenhaSegura123!',
        estado: 'São Paulo',
        cidade: 'São Paulo',
        municipio: 'São Paulo',
        logradouro: 'Rua Exemplo',
        numero: '123',
        complemento: 'Apto 12'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
