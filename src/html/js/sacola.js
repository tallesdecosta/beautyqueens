document.addEventListener('DOMContentLoaded', () => {
    carregarItensDaSacola();

    document.querySelector('.clear-link').addEventListener('click', limparSacola);
    document.querySelector('.finalizar-button').addEventListener('click', finalizarCompra);
    document.querySelector('.back-button').addEventListener('click', voltarParaPesquisa);
});

function carregarItensDaSacola() {
    fetch('sacola.php?action=read')
        .then(response => response.json())
        .then(data => {
            if (data.status === "A sacola está vazia") {
                document.getElementById('sacola-itens').innerHTML = '<p>Sua sacola está vazia.</p>';
                atualizarTotal(0);
            } else if (data.status === "Itens encontrados") {
                renderizarItensDaSacola(data.itens);
            }
        })
        .catch(error => mostrarMensagem('Erro ao carregar itens da sacola.', 'erro'));
}

function renderizarItensDaSacola(itens) {
    const sacolaContainer = document.getElementById('sacola-itens');
    sacolaContainer.innerHTML = '';

    itens.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.setAttribute('data-id', item.id);

        const itemImage = document.createElement('img');
        itemImage.src = item.imagem;
        itemImage.alt = item.nome;
        itemElement.appendChild(itemImage);

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        const itemName = document.createElement('h4');
        itemName.textContent = item.nome;
        itemInfo.appendChild(itemName);

        const itemBrand = document.createElement('p');
        itemBrand.textContent = item.marca || 'Principia';
        itemInfo.appendChild(itemBrand);

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;
        itemInfo.appendChild(itemPrice);

        const itemQuantity = document.createElement('div');
        itemQuantity.classList.add('item-quantity');

        const decrementButton = document.createElement('button');
        decrementButton.classList.add('quantity-button', 'decrement');
        decrementButton.textContent = '-';
        decrementButton.addEventListener('click', () => alterarQuantidade(item.id, -1));
        itemQuantity.appendChild(decrementButton);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = item.quantidade;
        quantityInput.readOnly = true;
        itemQuantity.appendChild(quantityInput);

        const incrementButton = document.createElement('button');
        incrementButton.classList.add('quantity-button', 'increment');
        incrementButton.textContent = '+';
        incrementButton.addEventListener('click', () => alterarQuantidade(item.id, 1));
        itemQuantity.appendChild(incrementButton);

        itemInfo.appendChild(itemQuantity);
        itemElement.appendChild(itemInfo);

        sacolaContainer.appendChild(itemElement);
    });

    atualizarTotal(calcularTotal(itens));
}

function alterarQuantidade(id, delta) {
    const action = delta === 1 ? 'increment' : 'decrement';
    fetch(`sacola.php?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status.includes("sucesso")) {
                carregarItensDaSacola();
            } else {
                mostrarMensagem(data.status, 'erro');
            }
        })
        .catch(error => mostrarMensagem('Erro ao alterar quantidade.', 'erro'));
}

function limparSacola() {
    fetch('sacola.php?action=clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "Sacola limpa com sucesso") {
                carregarItensDaSacola();
                mostrarMensagem('Sacola limpa com sucesso!', 'sucesso');
            } else {
                mostrarMensagem(data.status, 'erro');
            }
        })
        .catch(error => mostrarMensagem('Erro ao limpar a sacola.', 'erro'));
}

function atualizarTotal(total) {
    document.getElementById('total-value').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function calcularTotal(itens) {
    return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

function finalizarCompra() {
    window.location.href = 'https://www.sephora.com.br';
}

function mostrarMensagem(mensagem, tipo) {
    const mensagemElemento = document.createElement('div');
    mensagemElemento.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';
    mensagemElemento.textContent = mensagem;
    document.body.appendChild(mensagemElemento);
    setTimeout(() => mensagemElemento.remove(), 3000);
}

function voltarParaPesquisa() {
    window.location.href = 'pesquisa.html';
}
