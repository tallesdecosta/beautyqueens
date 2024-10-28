function iniciarProcessamento() {
    var botao = document.getElementById("btn-entrar");

    // Muda o estado do botão para "Carregando..."
    botao.innerHTML = '<span class="spinner"></span> Carregando...';
    botao.disabled = true;

    // Simula o envio de um formulário com tempo de espera
    setTimeout(function() {
        // Após 2 segundos, restaura o botão ao estado original
        botao.innerHTML = 'ENTRAR';
        botao.disabled = false;
    }, 2000); // tempo de espera em milissegundos
}