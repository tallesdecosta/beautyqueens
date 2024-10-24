document.addEventListener("DOMContentLoaded", () => {
    const nomeInput = document.getElementById('nome');
    const nomeError = document.getElementById("nomeError");

    const regexNome = /^[a-zA-Z\s]+$/;

    function validateField(input, regex, errorElement, errorMessage) {
        const value = input.value.trim();
        const isValid = regex.test(value);
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.style.borderColor = '#B52A00';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#ccc';
        }
        return isValid;
    }

    nomeInput.addEventListener('input', () => {
        validateField(nomeInput, regexNome, nomeError, "Nome inválido. Apenas letras e espaços são permitidos.");
        checkAllFields();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById("cpfError");

    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    function validateField(input, regex, errorElement, errorMessage) {
        const value = input.value.trim();
        const isValid = regex.test(value);
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.style.borderColor = '#B52A00';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#ccc';
        }
        return isValid;
    }

    cpfInput.addEventListener('input', () => {
        validateField(cpfInput, regexCPF, cpfError, "CPF inválido. Deve seguir o formato xxx.xxx.xxx-xx.");
        checkAllFields();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const telefoneInput = document.getElementById('telefone');
    const contatoError = document.getElementById("contatoError");

    const regexTelefone = /^\(\d{2}\)\d{4,5}-\d{4}$/;

    function validateField(input, regex, errorElement, errorMessage) {
        const value = input.value.trim();
        const isValid = regex.test(value);
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.style.borderColor = '#B52A00';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#ccc';
        }
        return isValid;
    }

    telefoneInput.addEventListener('input', () => {
        validateField(telefoneInput, regexTelefone, contatoError, "Telefone inválido. Deve seguir o formato (xx)xxxxx-xxxx ou (xx)xxxx-xxxx.");
        checkAllFields();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById("emailError");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, regex, errorElement, errorMessage) {
        const value = input.value.trim();
        const isValid = regex.test(value);
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.style.borderColor = '#B52A00';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#ccc';
        }
        return isValid;
    }

    emailInput.addEventListener('input', () => {
        validateField(emailInput, regexEmail, emailError, "Email inválido.");
        checkAllFields();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const senhaInput = document.getElementById('senha');
    const senhaError = document.getElementById("senhaError");

    const regexSenha = /^.{8,}$/;

    function validateField(input, regex, errorElement, errorMessage) {
        const value = input.value.trim();
        const isValid = regex.test(value);
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.style.borderColor = '#B52A00';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#ccc';
        }
        return isValid;
    }

    senhaInput.addEventListener('input', () => {
        validateField(senhaInput, regexSenha, senhaError, "Senha inválida. Deve conter no mínimo 8 caracteres.");
        checkAllFields();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cidadeInput = document.getElementById('cidade');
    const cidadeError = document.getElementById("cidadeError");

    const regexCidade = /^[a-zA-Z\s]+$/;

    function validateField(input, regex, errorElement, errorMessage) {
        const value = input.value.trim();
        const isValid = regex.test(value);
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.style.borderColor = '#B52A00';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#ccc';
        }
        return isValid;
    }

    cidadeInput.addEventListener('input', () => {
        validateField(cidadeInput, regexCidade, cidadeError, "Cidade inválida. Apenas letras e espaços são permitidos.");
        checkAllFields();
    });
});

function checkAllFields() {
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const cidadeInput = document.getElementById('cidade');
    const confirmarButton = document.getElementById("btnConfirmar");

    const isValidNome = /^[a-zA-Z\s]+$/.test(nomeInput.value.trim());
    const isValidCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfInput.value.trim());
    const isValidTelefone = /^\(\d{2}\)\d{4,5}-\d{4}$/.test(telefoneInput.value.trim());
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const isValidSenha = /^.{8,}$/.test(senhaInput.value.trim());
    const isValidCidade = /^[a-zA-Z\s]+$/.test(cidadeInput.value.trim());

    const allValid = isValidNome && isValidCPF && isValidTelefone && isValidEmail && isValidSenha && isValidCidade;

    if (allValid) {
        confirmarButton.disabled = false;
        confirmarButton.classList.add('ativado');
        confirmarButton.classList.remove('desativado');
    } else {
        confirmarButton.disabled = true;
        confirmarButton.classList.remove('ativado');
        confirmarButton.classList.add('desativado');
    }
}

document.addEventListener("click", () => {
    const form = document.getElementById('cadastro-form');
    const confirmarButton = document.getElementById('btnConfirmar');
        if (confirmarButton.disabled === false) {
            window.location.href = `cadastro-pele.html`;
        }
});
