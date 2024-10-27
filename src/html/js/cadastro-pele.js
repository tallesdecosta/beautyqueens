document.getElementById("aspectosPeleInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const input = document.getElementById("aspectosPeleInput");
        const value = input.value.trim();
        if (value !== "" && !isChipAlreadyAdded(value, "aspectosPeleBox")) {
            const chip = createChip(value);
            document.getElementById("aspectosPeleBox").appendChild(chip);
            input.value = "";
        }
        if(areAllFieldsFilled()) {
    
            document.getElementById("confirmarButton").classList.remove('desativado');
            document.getElementById("confirmarButton").classList.add('ativado');

        } else {

            document.getElementById("confirmarButton").classList.remove('ativado');
            document.getElementById("confirmarButton").classList.add('desativado');

        }
    }
});

document.getElementById("alergiasInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const input = document.getElementById("alergiasInput");
        const value = input.value.trim();
        if (value !== "" && !isChipAlreadyAdded(value, "alergiasBox")) {
            const chip = createChip(value);
            document.getElementById("alergiasBox").appendChild(chip);
            input.value = "";
        }
        if(areAllFieldsFilled()) {
    
            document.getElementById("confirmarButton").classList.remove('desativado');
            document.getElementById("confirmarButton").classList.add('ativado');

        } else {

            document.getElementById("confirmarButton").classList.remove('ativado');
            document.getElementById("confirmarButton").classList.add('desativado');

        }
    }
});

function createChip(value) {
    const chip = document.createElement("span");
    chip.className = "tag";
    chip.textContent = value;

    const removeButton = document.createElement("span");
    removeButton.className = "remove";
    removeButton.textContent = "x";

    removeButton.addEventListener("click", function () {
        chip.remove();
        if(areAllFieldsFilled()) {
    
            document.getElementById("confirmarButton").classList.remove('desativado');
            document.getElementById("confirmarButton").classList.add('ativado');

        } else {

            document.getElementById("confirmarButton").classList.remove('ativado');
            document.getElementById("confirmarButton").classList.add('desativado');

        }
    });

    chip.appendChild(removeButton);

    return chip;
}

function isChipAlreadyAdded(value, boxId) {
    const chips = document.getElementById(boxId).querySelectorAll(".tag");
    for (const chip of chips) {
        if (chip.textContent.includes(value)) {
            return true;
        }
    }
    return false;
}

selects = document.getElementsByTagName('select');
for (s in selects) {
    if (s == 0 || s == 1) {

        selects[s].addEventListener('change', () => {

            if(areAllFieldsFilled()) {
    
                document.getElementById("confirmarButton").classList.remove('desativado');
                document.getElementById("confirmarButton").classList.add('ativado');
    
            } else {
    
                document.getElementById("confirmarButton").classList.remove('ativado');
                document.getElementById("confirmarButton").classList.add('desativado');
    
            }
    
        });

    }

    

}

function areAllFieldsFilled() {
    const tonalidade = document.getElementById("tonalidadePele").value.trim();
    const cicatrizes = document.getElementById("cicatrizes").value.trim();
    const aspectosPele = document.getElementById("aspectosPeleBox").querySelectorAll(".tag").length;
    const alergias = document.getElementById("alergiasBox").querySelectorAll(".tag").length;

    return tonalidade && cicatrizes && aspectosPele > 0 && alergias > 0;
}

document.getElementById("confirmarButton").addEventListener("click", () => {

    if (areAllFieldsFilled()) {

        const queryString = new URLSearchParams(window.location.search);
        window.location.href = `confirmacao.html?email=${queryString.get('email')}`;

    } else {

        alert("Por favor, preencha todos os campos.");

    }

});

document.getElementById("cancelarButton").addEventListener("click", function () {

    window.location.href = "../index.html";

});
