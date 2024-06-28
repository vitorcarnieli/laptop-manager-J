const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const allBtn = document.getElementById("all");
const linkedBtn = document.getElementById("linked");
const linkedlessBtn = document.getElementById("linkedless");
const registerBtn = document.getElementById("register");
const searchField = document.getElementsByTagName("input")[0];
var beneficiaries = [];
var filterSelected = "";


//modal
const registerModal = document.getElementById("registerModal");
const registerModalBoot = new bootstrap.Modal(registerModal);
const modalClose = document.getElementById("modalClose");
const modalSubmit = document.getElementById("modalSubmit");
const modalContactNumber = document.getElementById("contactNumber");
const modalIdentificationDocument = document.getElementById("identificationDocument");
const modalName = document.getElementById("name");
const modalContractType = document.getElementById("contractType");
const modalErrorField = document.getElementById("modalErrorField");
const registerFields = [modalContactNumber, modalIdentificationDocument, modalName, modalContractType];


searchField.addEventListener("input", (() => {buildPage()}));

selectBtns.forEach(btn => btn.addEventListener("click", (() => {
    btn.id == "register" ? () => {} : changeNavBtnSelected(btn);
})));

allBtn.click();

function buildPage() {
    
    deleteChildsOfCardScope();
    
    getBeneficiaiesData().then(e => {
        appendCardToCardsLocal(filterBeneficiaries(searchField.value));
    });
}

function filterBeneficiaries(i) {
    if (filterSelected == "linkedless") {
        beneficiaries = beneficiaries.filter(b => !b.linked);
    } else if (filterSelected == "linked") {
        beneficiaries = beneficiaries.filter(b => b.linked);
    }

    if (i != null || i.trim() != "" || i != undefined) {
        return beneficiaries.filter(b => b.name.toLowerCase().includes(i.toLowerCase()));
    }

    return beneficiaries;
}


function appendCardToCardsLocal(dataForCards) {
    if (dataForCards[0] == null) {
        let nonFind = document.createElement("div");
        nonFind.textContent = "Nenhuma entidade encontrada usando os filtros aplicados";
        nonFind.classList = "text-center text-danger";
        cardLocal.appendChild(nonFind);
        return
    }
    dataForCards.forEach(b => cardLocal.appendChild(buildCard(b)));
}

function buildCard(e) {
    let scope = createCardScope(e.id);
    let body = createCardBody();
    let title = createCardTitle(e.name);
    let text = createCardText(e);
    let image = createCardImage();

    [title, text].forEach(e => body.appendChild(e));
    [image, body].forEach(e => scope.appendChild(e));
    
    return scope;
}

function deleteChildsOfCardScope() {
    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }
}

function getBeneficiaiesData() {
    return fetch(`http://localhost:8080/beneficiary`)
        .then(responseRaw => {
            return responseRaw.json();
        })
        .then(response => {
            beneficiaries = response;
            return beneficiaries;
        })
        .catch(e => {
            throw new Error("erro ao obter informaçoes");
        })
}

function getLaptopNumberWhichBeneficiaryLinked(id) {
    return fetch(`http://localhost:8080/beneficiary/getLaptopListedNumberByUserId/${id}`)
        .then(responseRaw => {
            console.log(responseRaw)

            return responseRaw.text();
        })
        .then(response => {
            return response;
        })
        .catch(e => {
            console.log(e);
            throw new Error("erro ao obter informaçoes 2");
        })
}

function createCardScope(id) {
    let cardScope = document.createElement("a");
    cardScope.classList.add("card", "col-2", "mx-2", "my-2", "bg-whitesmoke-over", "text-decoration-none", "border-0");
    cardScope.href = `/views/beneficiary/show.html?id=${id}`
    cardScope.style.width = "18rem";
    return cardScope;
}

function createCardImage() {
    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = "../../assets/person.png";
    return cardImage;
}

function createCardBody() {
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    return cardBody;
}

function createCardTitle(name) {
    let cardTitle = document.createElement("h5");
    cardTitle.classList = "card-title text-center";
    let splitedName = name.split(" ");
    cardTitle.textContent = `${splitedName[0]} ${splitedName.pop()[0]}.`;
    return cardTitle;
}

function createCardText(e) {
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    if (!e.linked) {
        cardText.textContent = "Não possui vínculo";
        return cardText;
    }
    try {
        getLaptopNumberWhichBeneficiaryLinked(e.id).then(d => {
            cardText.textContent = `Vinculado a: ${[d.slice(0, 2), "-", d.slice(2)].join('')}`;
            return cardText;

        });
    } catch (error) {
        console.error("Erro ao obter número vinculado:", error);
        cardText.textContent = "Erro ao obter número vinculado";
    }

    return cardText;

}

function changeNavBtnSelected(btn) {

    selectBtns.forEach(btn => btn.classList.remove("bg-select"));
    filterSelected = btn.id;
    console.log(btn);
    btn.id == "register" ? () => {} : btn.classList.add("bg-select");
    buildPage();
}

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
        name: modalName.value[0] == " " ? modalName.value.substring(0) : modalName.value ,
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
            buildPage();
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