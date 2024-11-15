pWrapper = document.getElementById('p-wrapper');

async function getProducts() {

    response = await fetch('/php/produtos/pj.php', {

        method: "GET",
        credentials: 'include'

    });

    listProducts(await response.json())

}


function listProducts(json) {

    for (i in json) {

        div = document.createElement('div');

        nome = document.createElement('p');

        nome.textContent = json[i].nome;

        div.appendChild(nome);

        div.addEventListener('click', () => {

            window.location.href = `visu-produto.html?id=${json[i].produto_id}`;

        })

        pWrapper.appendChild(div);


    }

}