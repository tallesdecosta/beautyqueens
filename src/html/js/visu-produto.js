
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
nome = document.getElementById('nome');
desc = document.getElementById('desc');
disp = document.getElementById('disp');
vol = document.getElementById('vol');
veg = document.getElementById('veg');
poso = document.getElementById('poso');
alt = document.getElementById('alt');
cat = document.getElementById('cat');
contraindic = document.getElementById('contraindic');
comp = document.getElementById('comp');

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
    poso.value = resp[0].posologia
    alt.value = resp[0].alt_text
    cat.value = resp[0].categoria
    contraindic.value = resp[0].contraindicacao
    comp.value = resp[0].composicao
}


async function deleteProduct() {
    
    body = {
        id: productId
    }

    response = await fetch('/php/produtos/delete.php', {

        method: "POST",
        credentials: "include",
        body: JSON.stringify(body)

    });

    console.log(await response.json())

}

async function altProduct() {

    body = {

        nome: document.getElementById('nome').value,
        desc: document.getElementById('desc').value,
        disp: document.getElementById('disp').value,
        vol: document.getElementById('vol').value,
        veg: document.getElementById('veg').value,
        poso: document.getElementById('poso').value,
        alt: document.getElementById('alt').value,
        cat: document.getElementById('cat').value,
        contraindic: document.getElementById('contraindic').value,
        comp: document.getElementById('comp').value,
        id: productId

    }

    response = await fetch('/php/produtos/alterar.php', {

        method: "POST",
        credentials: "include",
        body: JSON.stringify(body)

    });

    console.log(await response.json())

    
}