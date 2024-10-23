document.addEventListener('DOMContentLoaded', function () {
    const inputCodigo = document.querySelector('input');
    const botaoConfirmar = document.querySelector('.ativado');
    const botaoReenviar = document.querySelector('.secundario');
    const mensagemErro = document.querySelector('.error-message');

    const codigoCorreto = "123456";

    botaoConfirmar.addEventListener('click', function (e) {
        e.preventDefault();
        const codigoInserido = inputCodigo.value;

        if (codigoInserido === codigoCorreto) {
            window.location.href = 'verificacao.html';
        } else {
            inputCodigo.classList.add('error');
            mensagemErro.style.display = 'block';
        }
    });

    botaoReenviar.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Código reenviado. Verifique sua caixa de e-mail.');
    });

    inputCodigo.addEventListener('input', function () {
        if (inputCodigo.classList.contains('error')) {
            inputCodigo.classList.remove('error');
            mensagemErro.style.display = 'none';
        }
    });
});
