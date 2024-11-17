async function deleteUser() {
    try {
        // Primeiro confirma se o usuário realmente quer deletar a conta
        const confirmDelete = confirm("Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.");
        
        if (!confirmDelete) {
            return;
        }

        // Pegar o CNPJ/CPF do usuário da sessão ou localStorage
        const userDocument = localStorage.getItem('userDocument'); // ou session storage

        const response = await fetch('api/delete-user.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Adicione aqui qualquer header de autenticação necessário
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                cnpj_cpf: userDocument
            })
        });

        if (response.ok) {
            alert('Conta deletada com sucesso');
            // Limpa dados do localStorage
            localStorage.clear();
            // Redireciona para a página de login ou inicial
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar conta');
        }
    } catch (error) {
        alert('Erro ao deletar conta: ' + error.message);
        console.error('Erro:', error);
    }
}