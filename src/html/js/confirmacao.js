document.addEventListener('DOMContentLoaded', function () {
    const inputCodigo = document.querySelector('input');
    const botaoConfirmar = document.querySelector('.ativado');
    const botaoReenviar = document.querySelector('.secundario');
    const mensagemErro = document.querySelector('.error-message');


    onloadRequerirCodigo();

    botaoConfirmar.addEventListener('click', async function (e) {
        e.preventDefault();
        conf = await enviarCodigo();
        
        if (conf == true) {

            window.location.href = 'verificacao.html';

        } else {

            inputCodigo.classList.add('error');
            mensagemErro.style.display = 'block';
        } 
    });

    botaoReenviar.addEventListener('click', async function (e) {
        e.preventDefault();
        await onclickRequerirCodigo();
        alert('Código reenviado. Verifique sua caixa de e-mail.');
    });

    inputCodigo.addEventListener('input', function () {
        if (inputCodigo.classList.contains('error')) {
            inputCodigo.classList.remove('error');
            mensagemErro.style.display = 'none';
        }
    });
});

async function onloadRequerirCodigo() 
{
    const queryString = new URLSearchParams(window.location.search);
    
    body = {
        email: `${queryString.get('email')}`
    }
    response = await fetch('../php/mail/mail.php/code/requerir', {

        method: "POST",
        credentials: 'include',
        body: JSON.stringify(body),
        referrerPolicy: "unsafe-url" 

    }).then((res) => {

        return res.json();

    });

};

async function onclickRequerirCodigo() {

    const queryString = new URLSearchParams(window.location.search);
    
    body = {
        email: `${queryString.get('email')}`
    }

    response = await fetch('../php/mail/mail.php/code', {

        method: "PUT",
        credentials: 'include',
        body: JSON.stringify(body)

    }).then((res) => {

        return res.json();

    });

}

async function enviarCodigo() {

    body = {
        code: `${document.getElementById('codigo').value}`
    }

    response = await fetch('../php/mail/mail.php/code/confirmar', {

        method: "POST",
        body: JSON.stringify(body),
        credentials: 'include'

    }).then((res) => {

        return res.json();

    });
    
    return response['confirmação'];
}
