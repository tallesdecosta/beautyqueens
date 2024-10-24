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
                // Outros botões (Salvar, Alterar Foto) com cor lavanda
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
                // Outros botões (Salvar, Alterar Foto) com cor rosa
                button.style.backgroundColor = '#F53AD6'; // Fundo rosa
                button.style.color = '#fff'; // Texto branco
            }
        });
    }
}

// Função para validar o formulário
function validarFormulario() {
    let isValid = true;
    
    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validação do nome
    const nome = document.getElementById('nome');
    if (nome.value.trim() === "") {
        mostrarErro(nome, "O nome é obrigatório.");
        isValid = false;
    }

    // Validação do CPF (usando regex para formato e dígitos corretos)
    const cpf = document.getElementById('cpf');
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf.value)) {
        mostrarErro(cpf, "O CPF deve estar no formato 000.000.000-00.");
        isValid = false;
    }

    // Validação do e-mail
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        mostrarErro(email, "Digite um e-mail válido.");
        isValid = false;
    }

    // Validação do telefone (mínimo de 10 dígitos)
    const telefone = document.getElementById('telefone');
    const telefoneRegex = /^\d{10,11}$/;  // Aceita 10 ou 11 dígitos
    if (!telefoneRegex.test(telefone.value)) {
        mostrarErro(telefone, "O telefone deve ter 10 ou 11 dígitos.");
        isValid = false;
    }

    // Validação de senha (mínimo de 6 caracteres)
    const senha = document.getElementById('senha');
    if (senha.value.length < 6) {
        mostrarErro(senha, "A senha deve ter no mínimo 6 caracteres.");
        isValid = false;
    }
    // Validação da cidade (somente letras)
    const cidade = document.getElementById('cidade');
    const cidadeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!cidadeRegex.test(cidade.value)) {
        mostrarErro(cidade, "A cidade deve conter apenas letras.");
        isValid = false;
    }

    // Validação do município (somente letras)
    const municipio = document.getElementById('municipio');
    const municipioRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!municipioRegex.test(municipio.value)) {
        mostrarErro(municipio, "O município deve conter apenas letras.");
        isValid = false;
    }

    // Validação do tipo de logradouro (somente letras)
    const tipoLogradouro = document.getElementById('tipo-logradouro');
    const tipoLogradouroRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!tipoLogradouroRegex.test(tipoLogradouro.value)) {
        mostrarErro(tipoLogradouro, "O tipo de logradouro deve conter apenas letras.");
        isValid = false;
    }

    // Validação do número (somente números inteiros positivos)
    const numero = document.getElementById('numero');
    const numeroRegex = /^[1-9]\d*$/;
    if (!numeroRegex.test(numero.value)) {
        mostrarErro(numero, "O número deve ser um número inteiro positivo.");
        isValid = false;
    }

    // Validação do complemento (opcional, mas deve ser um texto curto se preenchido)
    const complemento = document.getElementById('complemento');
    if (complemento.value.trim() !== "" && complemento.value.length > 50) {
        mostrarErro(complemento, "O complemento não pode exceder 50 caracteres.");
        isValid = false;
    }

    return isValid;
}

// Função para exibir mensagens de erro
function mostrarErro(campo, mensagem) {
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('error-message');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.8em';
    errorMessage.innerText = mensagem;
    campo.parentElement.appendChild(errorMessage);
}

// Função para manipular a transição entre etapas do wizard
function showStep(step) {
    const steps = document.querySelectorAll('.step');
    const progressBarSteps = document.querySelectorAll('.step-wizard');
    const lines = document.querySelectorAll('.line');

    steps.forEach((stepElement, index) => {
        stepElement.style.display = index === step ? 'block' : 'none';
    });

    progressBarSteps.forEach((stepWizard, index) => {
        stepWizard.classList.toggle('ativo', index <= step);
    });

    lines.forEach((line, index) => {
        line.style.backgroundColor = index < step ? getComputedStyle(document.documentElement).getPropertyValue('--cor-primaria-dia') : '#CFD6DC';
    });
}

// Inicializa a barra de progresso e a etapa atual
let currentStep = 0;
showStep(currentStep);

// Função de avançar para a próxima etapa com validação
document.getElementById('next-btn').addEventListener('click', (e) => {
    e.preventDefault();  // Previne a submissão do formulário
    if (validarFormulario()) {  // Só avança para a próxima etapa se os dados forem válidos
        if (currentStep < document.querySelectorAll('.step').length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }
});

// Função de voltar para a etapa anterior
document.getElementById('back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

// Função de salvar dados da segunda etapa
document.getElementById('save-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (validarFormulario()) {  // Valida os campos antes de salvar
        alert("Dados salvos com sucesso!");
    }
});

// Função de cancelar as alterações
document.getElementById('cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Você cancelou as alterações.");
});

// Chamando a função de aplicar o tema ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    aplicarTemaComBaseNaHora();
    showStep(currentStep); // Exibe a primeira etapa quando a página carrega
});