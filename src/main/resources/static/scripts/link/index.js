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
var avaliableEntitys = [];

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

selectBtns.forEach(btn => btn.addEventListener("click", (() => {
    btn.id == "register" ? () => {} : changeNavBtnSelected(btn);
})));

allBtn.click();



function buildPage() {
    
    deleteChildsOfCardScope();
    
    getLinkData().then(e => {
        appendCardToCardsLocal(filterLinks(searchField.value));
    });

    getAvaliableEntitys().then(r => {
        avaliableEntitys.push(r);
    });

}

function filterLinks(i) {
    if (filterSelected == "linkedless") {
        links = links.filter(b => b.current);
    } else if (filterSelected == "linked") {
        links = links.filter(b => !b.current);
    }
    /*
    if (i != null || i.trim() != "" || i != undefined) {
        return laptops.filter(b => b.listedNumber.includes(i));
    }
    */
    return links;
}


function appendCardToCardsLocal(dataForCards) {

    dataForCards.forEach(b => {
        console.log(b);
        cardLocal.appendChild(buildCard(b));
        console.log(b + "2");
    });
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
    links = []
}

function getLinkData() {
    return fetch(`http://localhost:8080/link`)
        .then(responseRaw => responseRaw.json())
        .then(response => {
            const promises = response.map(l => 
                getBeneficiaryNameLaptopListedNumberByLinkId(l.id).then(r => {
                    let obj = {
                        id: l.id,
                        name: r,
                        isCurrent: l.current
                    }
                    links.push(obj);
                })
            );
            return Promise.all(promises);
        })
        .catch(e => {
            throw new Error("erro ao obter informaçoes");
        });
}

function getAvaliableEntitys() {
    return getAvaliableBeneficiaries().then(rBeneficiaries => {
        return getAvaliableLaptops().then(rLaptops => {
            return [rLaptops,rBeneficiaries];
        })
    })
}

function getAvaliableLaptops() {
    return fetch(`http://localhost:8080/laptop/getAvailableLaptops`)
    .then(responseRaw => {
        return responseRaw.json();
    })
    .then(response => {
        return response;
    })
    .catch(e => {
        throw new Error("erro ao obter informaçoes");
    })
}

function getAvaliableBeneficiaries() {
    return fetch(`http://localhost:8080/beneficiary/getAvailableBeneficiaries`)
    .then(responseRaw => {
        return responseRaw.json();
    })
    .then(response => {
        return response;
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
    buildPage();
    selectBtns.forEach(btn => btn.classList.remove("bg-select"));
    filterSelected = btn.id;
    btn.classList.add("bg-select");
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

    
    modalErrorField.textContent = "";

    try {
        const response = await fetch("http://localhost:8080/link", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    beneficiaryId: modalBeneficiary.value,
                    laptopId: modalLaptop.value
                }
            ),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }

        const data = await response.json();
        if (data) {
            closeModal();
            allBtn.click();
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
    avaliableEntitys.forEach(e => {
        e[0].forEach(r => {
            let opt = document.createElement("option");
            opt.value = r.id;
            opt.textContent = r.listedNumber;
            modalLaptop.appendChild(opt);
        })
        e[1].forEach(r => {
            let opt = document.createElement("option");
            opt.value = r.id;
            opt.textContent = r.name;
            modalBeneficiary.appendChild(opt);
        })
    })
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

