async function sendProduct() {

    body = {

        nome: document.getElementById('nome').value,
        desc: document.getElementById('desc').value,
        poso: document.getElementById('poso').value,
        disp: document.getElementById('disp').value,
        veg: document.getElementById('veg').value,
        vol: document.getElementById('vol').value,
        cat: document.getElementById('cat').value,
        contraindic: document.getElementById('contraindic').value,
        comp: document.getElementById('comp').value,
        arquivo: document.getElementById('arquivo').value,
        alt: document.getElementById('alt').value

    }

    const response = await fetch('/php/produtos/produtos.php', {

        method: 'POST',
        credentials: "include",
        body: JSON.stringify(body)

    });

    console.log(await response.json())

}