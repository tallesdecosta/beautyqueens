function iniciarProcessamento() {
    var botao = document.getElementById("btn-entrar");
    botao.innerHTML = '<span class="spinner"></span>';
    botao.disabled = true;
    setTimeout(function() {
        // Após 2 segundos, restaura o botão ao estado original
        botao.innerHTML = 'ENTRAR';
        botao.disabled = false;
    }, 2000);

    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const email = emailField.value;
    const password = passwordField.value;

    if (email === "usuario@exemplo.com" && password === "senha123") {
        alert("Login bem-sucedido!");
    } else {
        showToaster("Não conseguimos validar suas\n credenciais, tente novamente.");

        emailField.classList.add("error");
        passwordField.classList.add("error");
    }
}

function showToaster(message) {
    const toaster = document.getElementById("toaster");
    toaster.querySelector(".message").innerText = message;
    toaster.classList.add("show");

    setTimeout(() => {
        toaster.classList.remove("show");
        document.getElementById("email").classList.remove("error");
        document.getElementById("password").classList.remove("error");
    }, 3000);
}

function closeToaster() {
    document.getElementById("toaster").classList.remove("show");
    document.getElementById("email").classList.remove("error");
    document.getElementById("password").classList.remove("error");
}