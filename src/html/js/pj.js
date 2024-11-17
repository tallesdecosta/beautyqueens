// Função para criar um input de arquivo oculto
function createFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.id = 'logoInput';
    document.body.appendChild(input);
    return input;
}

// Função para manipular o preview da imagem
function handleImagePreview(file) {
    // Criar elemento de preview se não existir
    let previewContainer = document.getElementById('imagePreview');
    if (!previewContainer) {
        previewContainer = document.createElement('div');
        previewContainer.id = 'imagePreview';
        previewContainer.style.marginBottom = '20px';
        previewContainer.style.textAlign = 'center';
        const logoButton = document.querySelector('.logo-button');
        logoButton.parentNode.insertBefore(previewContainer, logoButton.nextSibling);
    }

    // Ler o arquivo e criar preview
    const reader = new FileReader();
    reader.onload = function(e) {
        previewContainer.innerHTML = `
            <div style="position: relative; display: inline-block;">
                <img src="${e.target.result}" 
                     style="max-width: 200px; 
                            max-height: 200px; 
                            border-radius: 8px; 
                            margin-top: 10px;
                            object-fit: cover;">
                <button type="button" 
                        id="removeImage" 
                        style="position: absolute;
                               top: 0;
                               right: 0;
                               background: #ff1493;
                               color: white;
                               border: none;
                               border-radius: 50%;
                               width: 24px;
                               height: 24px;
                               cursor: pointer;
                               margin: 5px;">
                    ×
                </button>
            </div>
        `;

        // Adicionar evento para remover a imagem
        document.getElementById('removeImage').addEventListener('click', function() {
            previewContainer.remove();
            fileInput.value = '';
        });
    };

    reader.readAsDataURL(file);
}

// Função para fazer upload da imagem
function uploadImage(file) {
    // Criar FormData para envio
    const formData = new FormData();
    formData.append('logo', file);

    // Simular envio para API
    console.log('Enviando arquivo:', file.name);
    
    // Aqui você adicionaria a chamada real para sua API
    // fetch('sua-url-api/upload', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => console.log('Sucesso:', data))
    // .catch(error => console.error('Erro:', error));
}

// Função para validar o arquivo
function validateFile(file) {
    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        alert('Por favor, selecione apenas arquivos de imagem (JPEG, PNG ou GIF)');
        return false;
    }

    // Validar tamanho do arquivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
        alert('O arquivo deve ter no máximo 5MB');
        return false;
    }

    return true;
}

// Criar input de arquivo
const fileInput = createFileInput();

// Adicionar evento de clique ao botão
document.querySelector('.logo-button').addEventListener('click', () => {
    fileInput.click();
});

// Adicionar evento de mudança ao input de arquivo
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
        handleImagePreview(file);
        uploadImage(file);
    }
});