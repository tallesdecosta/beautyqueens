
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
nome = document.getElementById('nome')
desc = document.getElementById('desc')
disp = document.getElementById('disp')
vol = document.getElementById('vol')
veg = document.getElementById('veg')
async function product(params) {
    
    resp = await fetch(`../php/produto.php?`+ new URLSearchParams({id:productId}), {
        method:"GET"
    }).then( (response) =>{ return response.json()})

    console.log(resp)

    
    nome.value = resp[0].nome
    desc.value = resp[0].descricao
    disp.value = resp[0].disponibilidade
    vol.value = resp[0].volume
    veg.value = resp[0].eh_vegano
}

