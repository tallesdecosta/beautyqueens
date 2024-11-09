document.addEventListener('DOMContentLoaded', () => {
    // Your code here
   
    const sideMenuButton = document.querySelector('.side_bar');
    sideMenuButton.addEventListener('click', openMenu);

    const closeMenuButton = document.querySelector('.close_menu');
    closeMenuButton.addEventListener('click', closeMenu);
});

function openMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.add("active");
}

function closeMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.remove("active");
}

function openSearch() {
    const searchMenu = document.getElementById("searchMenu");
    searchMenu.classList.add("active");
}

function closeSearch() {
    const searchMenu = document.getElementById("searchMenu");
    searchMenu.classList.remove("active");

}


async function logout() {
    
    try {

        const response = await fetch('../php/auth/auth.php/logout', {

            method: 'GET',
            credentials: "include"

        })

        if (response.status === 204) {

            window.location.href = 'login.html'

        }

    } catch (error) {

        console.error('Erro de logout: ', error);

    }

}


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

        console.log(results[i])

        resultWrapper = document.createElement('div');
        imgWrapper = document.createElement('div');
        img = document.createElement('img');
        img.src = 'a.png'
        imgWrapper.appendChild(img)

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
        document.getElementById('search-result').appendChild(resultWrapper);

    }


}