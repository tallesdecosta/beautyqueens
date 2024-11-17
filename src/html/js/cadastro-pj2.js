function createTag(text, container) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${text} <span class="tag-close">✕</span>`;
    
    tag.querySelector('.tag-close').addEventListener('click', function() {
        tag.remove();
        checkContainer(container);
    });
    
    return tag;
}

function checkContainer(container) {
    const containerId = container.id;
    const select = document.getElementById(`${containerId}Select`);
    const containerDiv = container.closest('.select-container');
    
    if (container.children.length === 0) {
        containerDiv.classList.remove('has-tags');
        select.classList.remove('hidden');
    } else {
        containerDiv.classList.add('has-tags');
        select.classList.add('hidden');
    }
}

// Inicializa os eventos de remoção de tags
document.querySelectorAll('.tag-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const container = this.closest('.tag-container');
        this.parentElement.remove();
        checkContainer(container);
    });
});

// Inicializa os eventos dos selects de aspectos e alergias
['skinAspects', 'allergies'].forEach(field => {
    const select = document.getElementById(`${field}Select`);
    const container = document.getElementById(field);

    select.addEventListener('change', function() {
        if (this.value) {
            const tag = createTag(this.options[this.selectedIndex].text, container);
            container.appendChild(tag);
            this.value = '';
            checkContainer(container);
        }
    });
});

// Evento do botão confirmar
document.querySelector('.button-primary').addEventListener('click', function() {
    const formData = {
        skinTone: document.getElementById('skinTone').value,
        scars: document.getElementById('scars').value,
        skinAspects: Array.from(document.querySelectorAll('#skinAspects .tag'))
            .map(tag => tag.textContent.trim().replace('✕', '')),
        allergies: Array.from(document.querySelectorAll('#allergies .tag'))
            .map(tag => tag.textContent.trim().replace('✕', ''))
    };
    console.log('Form Data:', formData);
});

// Evento do botão cancelar
document.querySelector('.button-secondary').addEventListener('click', function() {
    if(confirm('Deseja realmente cancelar o cadastro?')) {
        console.log('Cadastro cancelado');
    }
});