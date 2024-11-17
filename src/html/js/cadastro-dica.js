document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tipForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const tonalidade = document.getElementById('tonalidade').value;
        const cicatriz = document.getElementById('cicatriz').value;
        const tip = document.getElementById('tip').value;

        messageDiv.textContent = '';
        messageDiv.className = 'hidden';

        try {
            const response = await fetch('../php/cadastro-dica.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    tonalidade,
                    cicatriz,
                    tip,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                messageDiv.textContent = result.message || 'Dica enviada com sucesso!';
                messageDiv.className = 'success';
                form.reset();
            } else {
                throw new Error(result.error || 'Erro ao enviar a dica.');
            }
        } catch (error) {
            messageDiv.textContent = error.message;
            messageDiv.className = 'error';
        }
    });
    document.getElementById('cancelButton').addEventListener('click', function() {
        window.location.href = '../home.html';
    });
});
