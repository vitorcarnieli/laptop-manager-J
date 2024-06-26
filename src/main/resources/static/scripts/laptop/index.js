// VARS
const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const allBtn = document.getElementById("all");
const linkedBtn = document.getElementById("linked");
const linkedlessBtn = document.getElementById("linkedless");
const registerBtn = document.getElementById("register");
const searchField = document.getElementsByTagName("input")[0];
var laptops = [];
var filterSelected = "";

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


searchField.addEventListener("input", (() => {buildPage()}));

selectBtns.forEach(btn => btn.addEventListener("click", (() => {
    console.log(btn);
    btn.id === "register" ? () => {} : changeNavBtnSelected(btn);
})));

allBtn.click();

function buildPage() {
    
    deleteChildsOfCardScope();
    
    getLaptopData().then(e => {
        appendCardToCardsLocal(filterBeneficiaries(searchField.value.replace("-","")));
    });
}

function filterBeneficiaries(i) {
    if (filterSelected == "linkedless") {
        laptops = laptops.filter(b => !b.linked);
    } else if (filterSelected == "linked") {
        laptops = laptops.filter(b => b.linked);
    }

    if ((i != null || i.trim() != "" || i != undefined) && i[0] == "0") {
        return laptops.filter(b => b.listedNumber.includes(i));
    }
    if ((i != null || i.trim() != "" || i != undefined)) {
        return laptops.filter(b => b.serialNumber.includes(i));
    }

    return laptops;
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
    let title = createCardTitle(e.listedNumber);
    let text = createCardText(e);
    let image = createCardImage(e.laptopModel);

    [title, text].forEach(e => body.appendChild(e));
    [image, body].forEach(e => scope.appendChild(e));
    
    return scope;
}

function deleteChildsOfCardScope() {
    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }
}

function getLaptopData() {
    return fetch(`http://localhost:8080/laptop`)
        .then(responseRaw => {
            return responseRaw.json();
        })
        .then(response => {
            laptops = response;
            return laptops;
        })
        .catch(e => {
            throw new Error("erro ao obter informaçoes");
        })
}

function getLaptopNumberWhichBeneficiaryLinked(id) {
    return fetch(`http://localhost:8080/laptop/getBeneficiaryNameByLaptopId/${id}`)
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
    cardScope.href = `/views/laptop/show.html?id=${id}`
    cardScope.style.width = "18rem";
    return cardScope;
}

function createCardImage(model) {
    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = model == "a515_54_5526" ? "../../assets/laptop_silver.png" : "../../assets/laptop_black.png";
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
    cardTitle.textContent = name.slice(0, 2) + "-" + name.slice(2);; 
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
            cardText.textContent = `Vinculado a: ${d}`;
            return cardText;

        });
    } catch (error) {
        console.error("Erro ao obter número vinculado:", error);
        cardText.textContent = "Erro ao obter número vinculado";
    }

    return cardText;

}

function changeNavBtnSelected(btn) {
    console.log(btn.id === "register");
    if (btn.id === "register") {
        buildPage();
        return;
    }
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
        serialNumber: modalSerialNumber.value.toUpperCase(),
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
            buildPage();
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

