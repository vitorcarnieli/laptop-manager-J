document.addEventListener('DOMContentLoaded', function () {
    allBtn.classList.add("bg-select");
    buildAll();
});

// VARS
const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const allBtn = document.getElementById("all");
const linkedBtn = document.getElementById("linked");
const linkedlessBtn = document.getElementById("linkedless");
const registerBtn = document.getElementById("register");

const registerModal = document.getElementById("registerModal");
const registerModalBoot = new bootstrap.Modal(registerModal);
const modalClose = document.getElementById("modalClose");
const modalSubmit = document.getElementById("modalSubmit");
const modalSerialNumber = document.getElementById("serialNumber");
const modalListedNumber = document.getElementById("listedNumber");
const modalLaptopModel = document.getElementById("laptopModel");
const modalErrorField = document.getElementById("modalErrorField")
const registerFields = [modalSerialNumber, modalLaptopModel, modalListedNumber]
// VARS

// BUILD FIELDS
async function buildAll(opt) {

    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }

    try {
        const response = await fetch('http://localhost:8080/laptop');

        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let data = await response.json();
        data = opt === "LINKED" ? data.filter(e => e.linked) : opt === "LINKEDLESS" ? data = data.filter(e => !e.linked) : data;

        for (const e of data) {
            const cardMain = document.createElement("a");
            cardMain.classList.add("card", "col-2", "mx-2", "my-2", "bg-whitesmoke-over", "border-0", "text-decoration-none");
            cardMain.href = `/views/laptop/show.html?id=${e.id}`
            cardMain.style.width = "18rem";

            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.src = e.laptopModel == "a515_54_5526" ? "../../assets/laptop_silver.png" : "../../assets/laptop_black.png";

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = `${[e.listedNumber.slice(0, 2), "-", e.listedNumber.slice(2)].join('')}`;

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            if (!e.linked) {
                cardText.textContent = "Não possui vínculo";
            } else {
                try {
                    const listedNumber = await fetchListedNumber(e.id);

                    cardText.textContent = `Vinculado a: ${listedNumber}`;
                } catch (error) {
                    console.error("Erro ao obter número vinculado:", error);
                    cardText.textContent = "Erro ao obter número vinculado";
                }
            }
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            cardMain.appendChild(cardImage);
            cardMain.appendChild(cardBody);

            cardLocal.appendChild(cardMain);
        }
    } catch (error) {
        console.error("Erro ao obter dados dos beneficiários:", error);
        throw error;
    }
}

async function fetchListedNumber(id) {
    try {
        const response = await fetch(`http://localhost:8080/laptop/getBeneficiaryNameByLaptopId/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw error;
    }
}
// BUILD FIELDS


// MANAGE MODAL

function closeModal() {
    registerModalBoot.hide();
    registerFields.forEach(valueIsNull);
    modalSubmit.classList.add("disabled");
    modalErrorField.textContent = "";
}

function valueIsNull(element) {
    element.value = null;
}

async function modalSubmited() {

    if (modalSerialNumber.value.length != 22) {
        modalErrorField.textContent = "Verifique o campo Número de Serie, este campo deve conter exatos 22 caracteres";
        return;
    }
    if (modalListedNumber.value.length != 7) {
        modalErrorField.textContent = "Verifique o campo Número de Tombamento, este campo deve conter exatos 7 caracteres";
        return;
    }
    if (modalLaptopModel.value == null) {
        modalErrorField.textContent = "Verifique o campo Cor / Modelo.";
        return;
    }
    
    modalErrorField.textContent = "";
    let object = {
        serialNumber: modalSerialNumber.value,
        listedNumber: modalListedNumber.value,
        laptopModel: modalLaptopModel.value,
    }

    try {
        // Faz a solicitação POST para o servidor
        const response = await fetch("http://localhost:8080/laptop", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }

        const data = await response.json();
        if (data) {
            closeModal();
            clickSelectBtns(allBtn);
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }



}

function changeFormField() {
    registerFields.forEach((f) => {
        if (f.value != "") {
            modalSubmit.classList.remove("disabled");
        } else {
            modalSubmit.classList.add("disabled");
        }
    })
}

registerBtn.addEventListener("click", (() => {
    registerFields.forEach(valueIsNull);
    registerModalBoot.show();
}));
modalClose.addEventListener("click", () => closeModal());
modalSubmit.addEventListener("click", (() => modalSubmited()))
registerFields.forEach((f) => {
    f.addEventListener("change", (() => changeFormField()));
})

// MANAGE MODAL


// MANAGE SELECT BTNS

function setSelect(target) {
    if (!target.classList.contains("bg-select")) {
        selectBtns.forEach((f) => {
            f.classList.remove("bg-select");
        })
        target.classList.add("bg-select")
    }
    return;
}

selectBtns.forEach((e) => {
    e.addEventListener("click", () => clickSelectBtns(e, null));
})

function clickSelectBtns(element) {
    if (element.textContent == "Cadastrar") {
        return
    }
    if (!element.classList.contains("bg-select")) {
        selectBtns.forEach((f) => {
            f.classList.remove("bg-select");
        })

        element.classList.add("bg-select")

    }

    element == allBtn ? buildAll() : element == linkedBtn ? buildAll("LINKED") : element == linkedlessBtn ? buildAll("LINKEDLESS") : console.log(1);

}

// MANAGE SELECT BTNS