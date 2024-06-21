const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const allBtn = document.getElementById("all");
const linkedBtn = document.getElementById("linked");
const linkedlessBtn = document.getElementById("linkedless");
const registerBtn = document.getElementById("register");
const searchField = document.getElementsByTagName("input")[0];
var beneficiaries = [];


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

buildPage();

function buildPage() {
    deleteChildsOfCardScope();

    getBeneficiaiesData().then(e => {
        e.forEach(b => cardLocal.appendChild(buildCard(b)));
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
}

function getBeneficiaiesData() {
    return fetch(`http://localhost:8080/beneficiary`)
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
    cardTitle.classList.add("card-title");
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