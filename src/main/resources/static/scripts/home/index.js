document.addEventListener('DOMContentLoaded', function () {
    beneficiariesBtn.classList.add("bg-select");
    buildBeneficiaries();
});

// VARS
const cardLocal = document.getElementById("cardLocal");
const selectBtns = document.querySelectorAll(".nav-btn");
const beneficiariesBtn = document.getElementById("beneficiaries");
const linkBtn = document.getElementById("links");
const laptopBtn = document.getElementById("laptop")

// VARS


// BUILD FIELDS
async function buildBeneficiaries(opt) {
    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }

    try {
        const response = await fetch('http://localhost:8080/beneficiary');

        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let data = await response.json();
        if (opt === "linked") {
            data.filter((e) => e.linked);
        } else if (opt === "linkedless") {
            data.filter((e) => !e.linked);
        }
        for (const e of data) {
            const cardMain = document.createElement("div");
            cardMain.classList.add("card", "col-2", "mx-2", "my-2", "bg-whitesmoke-over", "border-0");
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
                    const listedNumber = await fetchListedNumberBeneficiary(e.id);
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

async function fetchListedNumberBeneficiary(id) {
    console.log(`http://localhost:8080/beneficiary/getLaptopListedNumberByUserId/${id}`);
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

async function buildLaptop() {
    console.log(2)
    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }

    try {
        const response = await fetch('http://localhost:8080/laptop');

        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let data = await response.json();

        for (const e of data) {
            console.log(e)
            const cardMain = document.createElement("div");
            cardMain.classList.add("card", "col-2", "mx-2", "my-2", "bg-whitesmoke-over", "border-0");
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
                    const listedNumber = await fetchListedNumberLaptop(e.id);
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

async function fetchListedNumberLaptop(id) {
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

async function buildLink() {

    while (cardLocal.firstChild) {
        cardLocal.removeChild(cardLocal.firstChild);
    }

    try {
        const response = await fetch('http://localhost:8080/link');

        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let data = await response.json();

        for (const e of data) {
            const cardMain = document.createElement("a");
            cardMain.classList.add("card", "col-2", "mx-2", "my-2", "bg-whitesmoke-over", "border-0", "text-decoration-none");
            cardMain.href = `http://localhost:8080/views/link/show.html?${e.id}`;
            cardMain.style.width = "18rem";

            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.src = "../../assets/link.png"

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = await fetchLaptopListedNumberBeneficiaryName(e.id);

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            if (!e.current) {
                cardText.textContent = "Finalizado";
            } else {
                cardText.textContent = "Ativo";
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

async function fetchLaptopListedNumberBeneficiaryName(id) {
    try {
        const response = await fetch(`http://localhost:8080/link/getBeneficiaryNameLaptopListedNumberByLinkId/${id}`);
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




// MANAGE SELECT BTNS



selectBtns.forEach((e) => {
    e.addEventListener("click", () => clickSelectBtns(e, null));
})

function clickSelectBtns(element) {
    console.log(element)
    if (!element.classList.contains("bg-select")) {
        selectBtns.forEach((f) => {
            f.classList.remove("bg-select");
        })

        element.classList.add("bg-select")
    }
    element.textContent == "Beneficiários" ? 
        buildBeneficiaries() : 
    element.textContent == "Notebooks" ? 
        buildLaptop() : 
    element.textContent == "Vínculos" ? 
        buildLink() : console.log(1);
}

// MANAGE SELECT BTNS