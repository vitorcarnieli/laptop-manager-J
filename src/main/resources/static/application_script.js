const selectBtns = document.querySelectorAll(".nav-btn");

selectBtns.forEach((e) => {
    e.addEventListener("click", () => clickSelectBtns(e, null));
})

function clickSelectBtns(element, target) {
    if (target == null) {
        if (!element.classList.contains("bg-select")) {
            selectBtns.forEach((f) => {
                f.classList.remove("bg-select");
            })
            element.classList.add("bg-select")
        }
        return;
    }
    if (element.textContent == target) {
        element.classList.add("bg-select")
    }
}

async function stringOla(name) {
    if (name.length < 3) {
        return `olá ${name}`;
    }

    try {
        const numero = await fetchNumero();
        return `olá senhor ${name}, seu número é ${numero}`;
    } catch (error) {
        throw error;
    }
}

async function fetchNumero() {
    try {
        const response = await fetch('http://localhost:8080/secrity-api-from-usa-govern');
        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}