document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    let confirmarButton = document.getElementById("btnConfirmar");
    const cancelarButton = document.getElementById("btnCancelar");

    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const estadoInput = document.getElementById('estado');
    const cidadeInput = document.getElementById('cidade');

    const cpfError = document.getElementById("cpfError");
    const contatoError = document.getElementById("contatoError");
    const emailError = document.getElementById("emailError");
    const senhaError = document.getElementById("senhaError");

    let usuarioId = null;

    function validateCPF(cpf) {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    }

    function validatePhone(phone) {
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return regex.test(phone);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateSenha(senha) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(senha);
    }

    function validateForm() {
        let isValid = true;

        if (cpfInput.value.trim() === "") {
            cpfError.style.display = "block";
            cpfError.textContent = "O CPF é obrigatório.";
            cpfInput.classList.add('error-border');
            isValid = false;
        } else if (!validateCPF(cpfInput.value)) {
            cpfError.style.display = "block";
            cpfError.textContent = "CPF inválido.";
            cpfInput.classList.add('error-border');
            isValid = false;
        } else {
            cpfError.style.display = "none";
            cpfInput.classList.remove('error-border');
        }

        if (telefoneInput.value.trim() === "") {
            contatoError.style.display = "block";
            contatoError.textContent = "O contato é obrigatório.";
            telefoneInput.classList.add('error-border');
            isValid = false;
        } else if (!validatePhone(telefoneInput.value)) {
            contatoError.style.display = "block";
            contatoError.textContent = "Contato inválido.";
            telefoneInput.classList.add('error-border');
            isValid = false;
        } else {
            contatoError.style.display = "none";
            telefoneInput.classList.remove('error-border');
        }

        if (emailInput.value.trim() === "") {
            emailError.style.display = "block";
            emailError.textContent = "O e-mail é obrigatório.";
            emailInput.classList.add('error-border');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.style.display = "block";
            emailError.textContent = "E-mail inválido.";
            emailInput.classList.add('error-border');
            isValid = false;
        } else {
            emailError.style.display = "none";
            emailInput.classList.remove('error-border');
        }

        if (senhaInput.value.trim() === "") {
            senhaError.style.display = "block";
            senhaError.textContent = "A senha é obrigatória.";
            senhaInput.classList.add('error-border');
            isValid = false;
        } else if (!validateSenha(senhaInput.value)) {
            senhaError.style.display = "block";
            senhaError.textContent = "A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.";
            senhaInput.classList.add('error-border');
            isValid = false;
        } else {
            senhaError.style.display = "none";
            senhaInput.classList.remove('error-border');
        }

        const camposObrigatorios = ['nome', 'estado', 'cidade'];
        camposObrigatorios.forEach(campoId => {
            const campo = document.getElementById(campoId);
            const campoError = document.getElementById(campoId + 'Error');
            if (campo && campo.value.trim() === "") {
                campoError.style.display = "block";
                campoError.textContent = `${campoId.charAt(0).toUpperCase() + campoId.slice(1)} é obrigatório.`;
                campo.classList.add('error-border');
                isValid = false;
            } else {
                campoError.style.display = "none";
                campo.classList.remove('error-border');
            }
        });

        return isValid;
    }

    function checkFormCompletion() {
        const camposObrigatorios = [nomeInput, cpfInput, telefoneInput, emailInput, senhaInput, estadoInput, cidadeInput];
        const isComplete = camposObrigatorios.every(input => input.value.trim() !== "");

        if (isComplete) {
            if (!document.getElementById("btn-acessar")) {
                const novoBotao = document.createElement('button');
                novoBotao.id = 'btn-acessar';
                novoBotao.classList.add('ativado');
                novoBotao.textContent = 'CONFIRMAR';
                novoBotao.type = 'submit';
                confirmarButton.replaceWith(novoBotao);
                confirmarButton = novoBotao;

                // Reatribuir o evento de clique ao novo botão
                confirmarButton.addEventListener("click", () => {
                    window.location.href = "cadastro-pele.html";
                });
            }
        } else {
            if (!document.getElementById("btnConfirmar")) {
                const novoBotao = document.createElement('button');
                novoBotao.id = 'btnConfirmar';
                novoBotao.classList.add('btn', 'desativado');
                novoBotao.textContent = 'Confirmar';
                novoBotao.disabled = true;
                confirmarButton.replaceWith(novoBotao);
                confirmarButton = novoBotao;
            }
        }
    }

    form.addEventListener("input", checkFormCompletion);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const dados = {
            nome: nomeInput.value,
            cpf: cpfInput.value,
            telefone: telefoneInput.value,
            email: emailInput.value,
            senha: senhaInput.value,
            estado: estadoInput.value,
            cidade: cidadeInput.value
        };

        const url = usuarioId ? '/atualizar_usuario.php' : 'localhost:80/auth/auth.php/register';
        const method = usuarioId ? 'PUT' : 'POST';

        if (usuarioId) {
            dados.id = usuarioId;
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                if (data.sucesso) {
                    alert(data.sucesso);
                    form.reset();
                    usuarioId = null;
                    window.location.href = "cadastro-pele.html";
                } else {
                    alert(data.erro);
                }
            })
            .catch(error => console.error('Erro:', error));
    });

    cancelarButton.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    confirmarButton.addEventListener("click", () => {
        window.location.href = "cadastro-pele.html";
    });
});
