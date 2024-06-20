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
const modalContactNumber = document.getElementById("contactNumber");
const modalIdentificationDocument = document.getElementById("identificationDocument");
const modalName = document.getElementById("name");
const modalContractType = document.getElementById("contractType");
const modalErrorField = document.getElementById("modalErrorField")
const registerFields = [modalContactNumber, modalIdentificationDocument, modalName, modalContractType];
// VARS


// BUILD FIELDS
async function buildAll(opt) {
    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }

    try {
        const response = await fetch('http://localhost:8080/beneficiary');

        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let data = await response.json();
        data = opt === "LINKED" ? data.filter(e => e.linked) : opt === "LINKEDLESS" ? data = data.filter(e => !e.linked) : data;

        for (const e of data) {
            const cardMain = document.createElement("a");
            cardMain.classList.add("card", "col-2", "mx-2", "my-2", "bg-whitesmoke-over", "text-decoration-none", "border-0");
            cardMain.href = `/views/beneficiary/show.html?id=${e.id}`
            cardMain.style.width = "18rem";

            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.src = "../../assets/person.png";

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            const splitedName = e.name.split(" ");
            cardTitle.textContent = `${splitedName[0]} ${splitedName.pop()[0]}.`;

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            if (!e.linked) {
                cardText.textContent = "Não possui vínculo";
            } else {
                try {
                    const listedNumber = await fetchListedNumber(e.id);
                    cardText.textContent = `Vinculado a: ${[listedNumber.slice(0, 2), "-", listedNumber.slice(2)].join('')}`;
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
        const response = await fetch(`http://localhost:8080/beneficiary/getLaptopListedNumberByUserId/${id}`);
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
    console.log(modalName.value.length)
    if (modalName.value.length < 3) {
        console.log("entrou")
        modalErrorField.textContent = "Verifique o campo Nome Completo";
        return;
    }
    if (modalIdentificationDocument.value.length < 7 || modalIdentificationDocument.value.length > 11) {
        modalErrorField.textContent = "Verifique o campo Documento de Identificação";
        return;
    }
    if (modalContactNumber.value.length < 10) {
        modalErrorField.textContent = "Verifique o campo Número para contato, lembre-se de colocar ddd";
        return;
    }
    if (modalContractType.value == null) {
        modalErrorField.textContent = "Verifique o campo Número para contato, lembre-se de colocar ddd";
        return;
    }
    try {
        if (!/^\d+$/.test(modalContractType.value) || !/^\d+$/.test(modalContactNumber.value)) {
            throw Error;
        };
    } catch (error) {
        modalErrorField.textContent = "Verifique o campo Documento de Identificação e Número para contato, digite apenas numeros";
        return
    }
    modalErrorField.textContent = "";
    let object = {
        name: modalName.value,
        document: modalIdentificationDocument.value,
        contactNumber: modalContactNumber.value,
        contractType: modalContractType.value
    }
    console.log(object)
    try {
        // Faz a solicitação POST para o servidor
        const response = await fetch("http://localhost:8080/beneficiary", {
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
            buildAll();
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }



}

function changeFormField() {
    registerFields.forEach((f) => {
        console.log(`form ${f.id} tem o seu value = ${f.value != null}`)
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