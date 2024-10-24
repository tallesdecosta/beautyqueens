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

function areAllFieldsFilled() {
    const tonalidade = document.getElementById("tonalidadePele").value.trim();
    const cicatrizes = document.getElementById("cicatrizes").value.trim();
    const aspectosPele = document.getElementById("aspectosPeleBox").querySelectorAll(".tag").length;
    const alergias = document.getElementById("alergiasBox").querySelectorAll(".tag").length;

    return tonalidade && cicatrizes && aspectosPele > 0 && alergias > 0;
}

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault();

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
