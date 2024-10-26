inputs = document.getElementsByTagName('input');

const nomeInput = document.getElementById('nome');
const nomeError = document.getElementById("nomeError");
const nomeRegex = /^[a-zA-Z\s]{3,}/;
const nomeFormat = '';
const nomeTemplate = '';
const nomeErrorMessage = 'Por favor, digite o seu nome no campo acima.'

const selectGen = document.getElementById('genero');

const cpfInput = document.getElementById('cpf');
const cpfError = document.getElementById("cpfError");
const cpfRegex = /^[0-9]{11}/;
const cpfFormat = /(\d{3})(\d{3})(\d{3})(\d{2})/;
const cpfTemplate = '$1.$2.$3-$4';
const cpfErrorMessage = 'Por favor, digite os dígitos do CPF no campo acima.'

const telefoneInput = document.getElementById('telefone');
const telefoneError = document.getElementById("contatoError");
const telefoneRegex = /^[1-9]{11}/;
const telefoneFormat = /(\d{2})(\d{5})(\d{4})/;
const telefoneTemplate = '($1)$2-$3';
const telefoneErrorMessage = 'Por favor, digite os dígitos do telefone no campo acima.'

const emailInput = document.getElementById('email');
const emailError = document.getElementById("emailError");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailFormat = '';
const emailTemplate = '';
const emailErrorMessage = 'Por favor, digite seu melhor e-mail acima.'

const senhaInput = document.getElementById('senha');
const senhaError = document.getElementById("senhaError");
const senhaRegex = /^.{8,}$/;
const senhaFormat = '';
const senhaTemplate = '';
const senhaErrorMessage = 'Por favor, digite uma senha de, no mínimo, 8 dígitos no campo acima.'

const selectEst = document.getElementById('estado');

const cidadeInput = document.getElementById('cidade');
const cidadeError = document.getElementById("cidadeError");
const cidadeRegex = /^[a-zA-Z\s]+$/;
const cidadeFormat = '';
const cidadeTemplate = '';
const cidadeErrorMessage = 'Por favor, digite a sua cidade corretamente no campo acima.'

const logradouroInput = document.getElementById('logradouro');
const logradouroError = document.getElementById("logradouroError");
const logradouroRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
const logradouroFormat = '';
const logradouroTemplate = '';
const logradouroErrorMessage = 'Por favor, digite o nome do seu logradouro corretamente acima.'

const selectLog = document.getElementById('tipo-logradouro');

const municipioInput = document.getElementById('municipio');
const municipioError = document.getElementById("municipioError");
const municipioRegex = /^[a-zA-Z\s]+$/;
const municipioFormat = '';
const municipioTemplate = '';
const municipioErrorMessage = 'Por favor, digite o seu município corretamente no campo acima.'

const numeroInput = document.getElementById('numero');
const numeroError = document.getElementById("numeroError");
const numeroRegex = /^[0-9]+$/;
const numeroFormat = '';
const numeroTemplate = '';
const numeroErrorMessage = 'Por favor, digite o número do seu logradouro corretamente acima.'

const confirmarButton = document.getElementById("btnConfirmar");

function validateField(type, input, regex, errorElement, errorMessage, formatRegex='', formatTemplate='') {


    const value = input.value.trim();
    isValid = regex.test(value);

    if (!isValid) {

        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        input.style.borderColor = '#B52A00';
        input.classList.remove('img-input-success');
        input.classList.add('img-input-error');
        input.style.marginBottom = '4px';

        if (type === 'cpf' || type === 'telefone') {

            a = input.value;
            a = a.replace(/\D/g, '');
            input.value = a;
            
        }
        

    } else {

        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.style.borderColor = '#61AA71';
        input.style.marginBottom = '15px';
        input.classList.remove('img-input-error');
        input.classList.add('img-input-success');

        if (formatRegex != '' && formatTemplate) {
            val = input.value;
            val = val.replace(formatRegex, formatTemplate);
            input.value = val;
        }
        
        return isValid;

    }

    
}

function checkAllFields() {

    const isValidNome = /^[a-zA-Z\s]+$/.test(nomeInput.value.trim());
    const isValidCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfInput.value.trim());
    const isValidTelefone = /^\(\d{2}\)\d{5}-\d{4}$/.test(telefoneInput.value.trim());
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const isValidSenha = /^.{8,}$/.test(senhaInput.value.trim());
    const isValidCidade = /^[a-zA-Z\s]+$/.test(cidadeInput.value.trim());

    allValid = isValidNome && isValidCPF && isValidTelefone && isValidEmail && isValidSenha && isValidCidade;

    if(selectLog.validity.valueMissing === true || selectGen.validity.valueMissing === true || selectEst.validity.valueMissing === true) {

        allValid = false;

    }

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

confirmarButton.addEventListener("click", () => {

    if (confirmarButton.disabled === false) {

        window.location.href = `cadastro-pele.html?email=${emailInput.value}`;

    }

});

for (i of inputs) {

    i.addEventListener('input', (i) => {
        if (i.srcElement.id != 'complemento') {
            input = i.srcElement;
        validateField(input.id, input, eval(`${input.id}Regex`), eval(`${input.id}Error`), eval(`${input.id}ErrorMessage`), eval(`${input.id}Format`), eval(`${input.id}Template`));
        checkAllFields();
        }
        
        
    })
    
}

selectLog.addEventListener('change', () => {

    checkAllFields();

});

selectGen.addEventListener('change', () => {

    checkAllFields();

});

selectEst.addEventListener('change', () => {

    checkAllFields();

});
    

function capitalize(s)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}