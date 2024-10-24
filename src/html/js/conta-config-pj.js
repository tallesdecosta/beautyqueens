// Função para validar o formulário
function validarFormulario() {
    // Obter os valores dos campos
    const nomeFantasia = document.getElementById('nome-fantasia').value.trim();
    const username = document.getElementById('username').value.trim();
    const dataAbertura = document.getElementById('data-abertura').value;
    const situacaoCnpj = document.getElementById('situacao-cnpj').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const municipio = document.getElementById('municipio').value.trim();
    const logradouro = document.getElementById('logradouro').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();

    // Função para exibir mensagem de erro
    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        inputElement.style.border = '1px solid red';
        alert(message);
    }

    // Função para limpar erro visual
    function clearError(inputId) {
        const inputElement = document.getElementById(inputId);
        inputElement.style.border = '1px solid #ccc';
    }

    // Validações dos campos
    let isValid = true;

    if (nomeFantasia === "") {
        showError('nome-fantasia', 'O Nome Fantasia é obrigatório.');
        isValid = false;
    } else {
        clearError('nome-fantasia');
    }

    if (username === "") {
        showError('username', 'O Username é obrigatório.');
        isValid = false;
    } else if (username.length < 3) {
        showError('username', 'O Username deve ter pelo menos 3 caracteres.');
        isValid = false;
    } else {
        clearError('username');
    }

    if (dataAbertura === "") {
        showError('data-abertura', 'A Data de Abertura é obrigatória.');
        isValid = false;
    } else {
        clearError('data-abertura');
    }

    if (situacaoCnpj === "") {
        showError('situacao-cnpj', 'A Situação do CNPJ é obrigatória.');
        isValid = false;
    } else {
        clearError('situacao-cnpj');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        showError('email', 'O E-mail é obrigatório.');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError('email', 'Por favor, insira um e-mail válido.');
        isValid = false;
    } else {
        clearError('email');
    }

    if (senha === "") {
        showError('senha', 'A Senha é obrigatória.');
        isValid = false;
    } else if (senha.length < 6) {
        showError('senha', 'A Senha deve ter pelo menos 6 caracteres.');
        isValid = false;
    } else {
        clearError('senha');
    }

    if (estado === "") {
        showError('estado', 'O Estado é obrigatório.');
        isValid = false;
    } else {
        clearError('estado');
    }

    if (cidade === "") {
        showError('cidade', 'A Cidade é obrigatória.');
        isValid = false;
    } else {
        clearError('cidade');
    }

    if (municipio === "") {
        showError('municipio', 'O Município é obrigatório.');
        isValid = false;
    } else {
        clearError('municipio');
    }

    if (logradouro === "") {
        showError('logradouro', 'O Tipo de Logradouro é obrigatório.');
        isValid = false;
    } else {
        clearError('logradouro');
    }

    if (numero === "" || isNaN(numero)) {
        showError('numero', 'O Número é obrigatório e deve ser numérico.');
        isValid = false;
    } else {
        clearError('numero');
    }

    // O campo Complemento é opcional, portanto não precisa de validação.

    return isValid;
}
// Função para alterar o tema com base na hora do dia
function aplicarTemaComBaseNaHora() {
    const currentHour = new Date().getHours();
    const buttons = document.querySelectorAll('.btn');
    const isNightTime = currentHour >= 18 || currentHour < 6; // 18h até 6h é considerado noite

    if (isNightTime) {
        // Aplicando o tema de noite (lavanda nos botões)
        buttons.forEach(button => {
            if (button.classList.contains('cancel')) {
                // Botão cancelar: fundo branco, borda e letras lavanda
                button.style.backgroundColor = '#fff'; // Fundo branco
                button.style.color = '#C8A2C8'; // Texto lavanda
                button.style.border = '2px solid #C8A2C8'; // Borda lavanda
            } else {
                // Outros botões (Salvar, Alterar Logo) com cor lavanda
                button.style.backgroundColor = '#C8A2C8'; // Fundo lavanda
                button.style.color = '#fff'; // Texto branco
            }
        });
    } else {
        // Aplicando o tema de dia (rosa nos botões)
        buttons.forEach(button => {
            if (button.classList.contains('cancel')) {
                // Botão cancelar: fundo branco, borda e letras rosa
                button.style.backgroundColor = '#fff'; // Fundo branco
                button.style.color = '#F53AD6'; // Texto rosa
                button.style.border = '2px solid #F53AD6'; // Borda rosa
            } else {
                // Outros botões (Salvar, Alterar Logo) com cor rosa
                button.style.backgroundColor = '#F53AD6'; // Fundo rosa
                button.style.color = '#fff'; // Texto branco
            }
        });
    }
}
// Chamando a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    aplicarTemaComBaseNaHora();
});

document.getElementById('save-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Dados salvos com sucesso!");
});

document.getElementById('cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Você cancelou as alterações.");
});

