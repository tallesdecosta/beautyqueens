document.getElementById('search').addEventListener('input', async () => {

    response = await fetch('../php/search/search.php?' + new URLSearchParams({
        termo: document.getElementById('search').value
    }), {

        method: 'GET'

    });

    res = await response.json()

    const searchResults = document.getElementById("search-result");

    while (searchResults.firstChild) {

    searchResults.removeChild(searchResults.lastChild);

  }

    if(res.length > 0) {

        showSearchResults(res)

    }

})


function showSearchResults(results) {

    for (i in results) {

        resultWrapper = document.createElement('div');
        imgWrapper = document.createElement('div');
        img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${results[i].arquivo}`;
        imgWrapper.appendChild(img);

        textWrapper = document.createElement('div');
        nomeProduto = document.createElement('h2');
        nomeMarca = document.createElement('p');

        nomeProduto.textContent = results[i].nome;
        nomeMarca.textContent = results[i].nome_fantasia;

        textWrapper.appendChild(nomeProduto);
        textWrapper.appendChild(nomeMarca);
        resultWrapper.appendChild(imgWrapper);

        resultWrapper.appendChild(textWrapper);
        resultWrapper.classList.add('result-wrapper');
        resultWrapper.addEventListener('click', () => {
            window.location.href = `produto.html?id=${results[i].produto_id}`
        })
        document.getElementById('search-result').appendChild(resultWrapper);

    }


}