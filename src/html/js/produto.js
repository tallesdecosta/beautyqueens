// Obtém o ID do produto da URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Faz a requisição AJAX para a página PHP

fetch(`../php/produto.php?`+ new URLSearchParams({id:productId}), {method:"GET"})
  .then(response => response.json())
  .then(data => {

    document.getElementById('product-name').textContent = data[0].nome;
    document.getElementById('product-description').textContent = data[0].descricao;
    document.getElementById('img').src = `data:image/jpeg;base64,${data[0].arquivo}`
    
  })
  .catch(error => {
    console.error('Erro ao carregar os dados do produto:', error);
  });

// Seleciona o botão "Adicionar à sacola" pelo ID
const addToCartButton = document.getElementById("add-to-cart-btn");

// Função para adicionar o item à sacola
function addToCart() {
    // Exibe uma mensagem de confirmação (pode ser um alert ou uma notificação na página)
    alert("Produto adicionado à sacola com sucesso!");

    // Aqui você pode adicionar a lógica para atualizar o número de itens na sacola,
    // salvar o item no localStorage ou atualizar o backend
}
