document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Cria um objeto FormData para armazenar os dados do formulário
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);
    formData.append('imageUpload', document.getElementById('imageUpload').files[0]);

    // Envia a requisição para o PHP usando fetch
    fetch('/php/post.php?action=inserir', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message); // Exibe mensagem de sucesso
            document.getElementById('newsForm').reset(); // Limpa o formulário
        } else {
            alert(data.message); // Exibe mensagem de erro
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar publicar a notícia.');
    });
});

function goBack() {
    // Função para voltar à página anterior
    window.history.back();
}

async function loadNews() {
    try {
        const response = await fetch('/php/get_posts.php'); // Endereço do arquivo PHP que retorna os posts
        const posts = await response.json();

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar os posts

        posts.forEach(post => {
            // Cria o elemento HTML para exibir o post
            const postElement = document.createElement('div');
            postElement.classList.add('card');
            postElement.style.height = '148px';
            postElement.style.width = '157px';

            postElement.innerHTML = `
                <img src="${post.imagem}" alt="${post.titulo}" class="card-image">
                <p class="card-text">${post.titulo}</p>
                <p class="card-text">${post.texto.substring(0, 50)}...</p> <!-- Limita o texto a 50 caracteres -->
            `;
            newsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Carrega os posts ao carregar a página
document.addEventListener('DOMContentLoaded', loadNews);
