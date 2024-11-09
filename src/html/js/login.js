async function iniciarProcessamento() {

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

    body = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }



    response = await fetch('../php/auth/auth.php/login', {

            method: "POST",
            credentials: "include",
            body: JSON.stringify(body)
    
    }).then((res) => {
    
            return res.json();
    
    }).catch(e => {
        return false;
    });



    if (response.auth === true) {

        window.location.href = 'home.html';
    
    } else {
    
        showToaster("Não conseguimos validar suas\n credenciais, tente novamente.");
    
        emailField.classList.add("error");
        passwordField.classList.add("error");
        }
    

    

   
}

function showToaster(message) {

    const toaster = document.getElementById("toaster");
    toaster.querySelector(".message").innerText = message;
    const linha = document.getElementById("linha");
    linha.classList.add('anim-linha')
    toaster.classList.add("show");

    setTimeout(() => {

        toaster.classList.remove("show");
        linha.classList.remove('anim-linha')
        document.getElementById("email").classList.remove("error");
        document.getElementById("password").classList.remove("error");

    }, 3000);
}

function closeToaster() {

    document.getElementById("toaster").classList.remove("show");
    document.getElementById("email").classList.remove("error");
    document.getElementById("password").classList.remove("error");

}