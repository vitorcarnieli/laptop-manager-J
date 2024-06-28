// VARS
const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const allBtn = document.getElementById("all");
const linkedBtn = document.getElementById("linked");
const linkedlessBtn = document.getElementById("linkedless");
const registerBtn = document.getElementById("register");
const endingBtn = document.getElementById("ending")
const searchField = document.getElementsByTagName("input")[0];
const datesField = document.getElementById("date");
var links = [];
var avaliableEntitys = [];

var filterSelected = "";

const registerModal = document.getElementById("registerModal");
const registerModalBoot = new bootstrap.Modal(registerModal);

const endingModal = document.getElementById("endingModal");
const endingModalBoot = new bootstrap.Modal(endingModal);

const modalClose = document.getElementById("modalClose");
const modalSubmit = document.getElementById("modalSubmit");

const modalCloseEnd = document.getElementById("modalCloseEnd");
const modalSubmitEnd = document.getElementById("modalSubmitEnd");

const modalLaptop = document.getElementById("laptop");
const modalBeneficiary = document.getElementById("beneficiary");
const modalErrorField = document.getElementById("modalErrorField");

const registerFields = [modalLaptop, modalBeneficiary];

const endLinks = document.getElementById("endLinks");
// VARS

searchField.addEventListener("input", (() => { buildPage() }));

selectBtns.forEach(btn => btn.addEventListener("click", (() => {
    btn.id == "register" ? () => { } : changeNavBtnSelected(btn);
})));

allBtn.click();


function buildPage() {
    return new Promise((resolve, reject) => {
        deleteChildsOfCardScope();

        getLinkData()
            .then(() => {
                appendCardToCardsLocal(filterLinks(searchField.value));
                resolve();
            })
            .catch(error => {
                reject(error);
            });

        getAvaliableEntitys()
            .then(r => {
                avaliableEntitys.push(r);
            })
            .catch(error => {
                console.error('Erro ao obter entidades disponíveis:', error);
            });
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


    if (dataForCards[0] == null) {
        let nonFind = document.createElement("div");
        nonFind.textContent = "Nenhuma entidade encontrada usando os filtros aplicados";
        nonFind.classList = "text-center text-danger";
        cardLocal.appendChild(nonFind);
        return
    }
    dataForCards.forEach(b => {
        cardLocal.appendChild(buildCard(b));
    });
}

function buildCard(e) {

    if (e.lenght < 1) {
        let nonFind = document.createElement("div");
        nonFind.textContent = "Nenhuma entidade encontrada usando os filtros aplicados";
        nonFind.classList = "text-center text-danger";
        return nonFind
    }

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
        .then(responseRaw => responseRaw.json())
        .then(response => {
            links = response.map(l => ({
                id: l.id,
                name: `${l.name.split(" ")[0].slice(0, 2)}-${l.name.split(" ")[0].slice(2,7)} & ${l.name.split(" ")[2]} `,
                isCurrent: l.current
            }));
        })
        .catch(error => {
            throw new Error("Erro ao obter informações de link");
        });
}


function getAvaliableEntitys() {
    return getAvaliableBeneficiaries().then(rBeneficiaries => {
        return getAvaliableLaptops().then(rLaptops => {
            return [rLaptops, rBeneficiaries];
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
    cardTitle.classList = "card-title text-center";
    cardTitle.textContent = name;
    return cardTitle;
}

function createCardText(e) {
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");


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
    if (btn.id == "register" || btn.id == "ending") {
        return;
    }
    btn.classList.add("bg-select");
}















// MANAGE MODAL

//fecha modal
function closeModal() {
    [endingModalBoot, registerModalBoot].forEach(boot => boot.hide());
    [modalSubmit, modalSubmitEnd].forEach(valueIsNull);

    registerFields.forEach(valueIsNull);

    modalErrorField.textContent = "";
}

function valueIsNull(element) {
    element.value = null;
}

function modalSubmited() {


    modalErrorField.textContent = "";

    try {
        const response = fetch("http://localhost:8080/link", {
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

        response.then(r => {
            closeModal();
            allBtn.click();
        })

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

[registerBtn, endingBtn].forEach(btn => {
    btn.addEventListener("click", () => {
        btn.id == "register" ? openModalRegister() : prepareAndOpenModalEnd();
    });
});

function openModalRegister() {
    while (datesField.firstChild) {
        datesField.removeChild(datesField.firstChild);
    }
    for (let index = 2021; index <= new Date().getFullYear(); index++) {
        let opt = document.createElement("option");
        opt.value = index;
        if (new Date().getFullYear() == index) {
            opt.textContent = "Atual";
            datesField.appendChild(opt);
            opt.selected = true;    
            continue;
        }
        opt.textContent = index
        datesField.appendChild(opt)        
    }
    avaliableEntitys.forEach(e => {
        if (e[0].lenght < 1) {
            e[0].forEach(r => {
                let opt = document.createElement("option");
                opt.value = r.id;
                opt.textContent = r.listedNumber;
                modalLaptop.appendChild(opt);
            })
        } else {
            let opt = document.createElement("option");
            opt.textContent = "NENHUM NOTEBOOK DISPONÍVEL PARA VÍNCULO";
            opt.disabled = true;
            opt.classList = "text-danger";
            modalLaptop.appendChild(opt);
        }
        if (e[1].lenght < 1) {
            e[1].forEach(r => {
                let opt = document.createElement("option");
                opt.value = r.id;
                opt.textContent = r.name;
                modalBeneficiary.appendChild(opt);
            })
        } else {
            let opt = document.createElement("option");
            opt.textContent = "NENHUM BENEFICIÁRIO DISPONÍVEL PARA VÍNCULO";
            opt.disabled = true;
            opt.classList = "text-danger";
            modalBeneficiary.appendChild(opt);
        }

    })
    registerFields.forEach(valueIsNull);
    registerModalBoot.show();
}

function prepareAndOpenModalEnd() {
    buildPage()
        .then(() => {
            openModalEnd();
        })
        .catch(error => {
            console.error('Erro ao preparar e abrir o modal de encerramento:', error);
        });
}

function openModalEnd() {

    links.forEach(l => {
        if (l.isCurrent) {
            let opt = document.createElement("option");
            opt.value = l.id;
            opt.text = l.name;
            endLinks.appendChild(opt);
        }
    })
    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }
    endingModalBoot.show();
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
modalCloseEnd.addEventListener("click", () =>  {
    closeModal();
    allBtn.click();
} )
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

