
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

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



async function addToCart() {

    body = {

      id: urlParams.get('id')

    }

    response = await fetch("/php/sacola.php?action=inserirSacola", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body)
    });

    console.log(await response.json())
}
