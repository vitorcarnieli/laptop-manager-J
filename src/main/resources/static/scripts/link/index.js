// VARS
const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const allBtn = document.getElementById("all");
const linkedBtn = document.getElementById("linked");
const linkedlessBtn = document.getElementById("linkedless");
const registerBtn = document.getElementById("register");
const searchField = document.getElementsByTagName("input")[0];
var tarcisio = "gay";
var links = [];

var filterSelected = "";

const registerModal = document.getElementById("registerModal");
const registerModalBoot = new bootstrap.Modal(registerModal);
const modalClose = document.getElementById("modalClose");
const modalSubmit = document.getElementById("modalSubmit");
const modalLaptop = document.getElementById("laptop");
const modalBeneficiary = document.getElementById("beneficiary");
const modalErrorField = document.getElementById("modalErrorField")
const registerFields = [modalLaptop, modalBeneficiary]
// VARS

searchField.addEventListener("input", (() => {buildPage()}));

allBtn.click();


selectBtns.forEach(btn => btn.addEventListener("click", (() => {
    btn.id == "register" ? () => {} : changeNavBtnSelected(btn);
})));

function buildPage() {
    
    deleteChildsOfCardScope();
    
    getLinkData().then(e => {
        appendCardToCardsLocal(filterBeneficiaries(searchField.value));
    });
}

function filterBeneficiaries(i) {
    if (filterSelected == "linkedless") {
        links = links.filter(b => !b.current);
    } else if (filterSelected == "linked") {
        links = links.filter(b => b.current);
    }
    /*
    if (i != null || i.trim() != "" || i != undefined) {
        return laptops.filter(b => b.listedNumber.includes(i));
    }
    */
    return links;
}


function appendCardToCardsLocal(dataForCards) {
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

function getLinkData() {
    return fetch(`http://localhost:8080/link`)
        .then(responseRaw => {
            return responseRaw.json();
        })
        .then(response => {
            response.forEach(l => {
                console.log(l);
                getBeneficiaryNameLaptopListedNumberByLinkId(l.id).then(r => {
                    links.push(
                        {
                            id:l.id,
                            name:r,
                            isCurrent: l.current
                        }
                    )
                })
            })
            return links;
        })
        .catch(e => {
            throw new Error("erro ao obter informaçoes");
        })
}

function getBeneficiaryNameLaptopListedNumberByLinkId(id) {
    return fetch(`http://localhost:8080/link/getBeneficiaryNameLaptopListedNumberByLinkId/${id}`)
        .then(responseRaw => {
            return responseRaw.text();
        })
        .then(response => {
            console.log(response)
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
    cardScope.href = `/views/link/show.html?id=${id}`
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
    cardTitle.classList.add("card-title");
    cardTitle.textContent = name;
    return cardTitle;
}

function createCardText(e) {
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    console.log(e)


    if (!e.isCurrent) {
        cardText.textContent = "Finalizado";
        return cardText;
    }
    cardText.textContent = "Ativo";
    return cardText;

}

function changeNavBtnSelected(btn) {
    selectBtns.forEach(btn => btn.classList.remove("bg-select"));
    filterSelected = btn.id;
    btn.classList.add("bg-select");
    buildPage();
}


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


// MANAGE SELECT BTNS