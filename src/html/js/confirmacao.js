document.addEventListener('DOMContentLoaded', function () {
    const inputCodigo = document.querySelector('input');
    const botaoConfirmar = document.querySelector('.ativado');
    const botaoReenviar = document.querySelector('.secundario');
    const mensagemErro = document.querySelector('.error-message');

    const codigoCorreto = "123456";

    requerirCodigo();

    botaoConfirmar.addEventListener('click', function (e) {
        e.preventDefault();
        enviarCodigo();

        /*if (codigoInserido === codigoCorreto) {
            window.location.href = 'verificacao.html';
        } else {
            inputCodigo.classList.add('error');
            mensagemErro.style.display = 'block';
        } */
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

async function requerirCodigo() 
{

    response = await fetch('http://localhost:80/mail/mail.php/code', {

        method: "GET"

    }).then((res) => {

        return res.json();

    });

    console.log(response);

};

async function enviarCodigo() {

    body = {
        code: `${document.getElementById('codigo').value}`
    }

    response = await fetch('http://localhost:80/mail/mail.php/code', {

        method: "POST",
        body: JSON.stringify(body),
        credentials: 'include'

    }).then((res) => {

        return res.json();

    });
}