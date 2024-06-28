const id = new URLSearchParams(window.location.search).get("id");
const titlePage = document.getElementsByTagName("title");
const laptopNameTitleField = document.getElementById("laptopNameTitle");
const laptopSerialNumberField = document.getElementById("laptopSerialNumber");
const laptopListedNumberField = document.getElementById("listedNumber");
const laptopModelField = document.getElementById("laptopModel");
const laptopImg = document.getElementsByTagName("img")[0];

buildPage();

function buildPage() {
    defInfos();
    defLinkReport(getLaptopData());
}


function defInfos() {
    getLaptopData()
    .then(l => {
        let laptopListedNumber = l.listedNumber;
        document.title = "Notebook - " + formatLaptopListedNumber(laptopListedNumber)
        laptopNameTitleField.textContent = formatLaptopListedNumber(laptopListedNumber);
        laptopListedNumberField.value = formatLaptopListedNumber(laptopListedNumber);
        laptopSerialNumberField.value = l.serialNumber;

        if (l.laptopModel === "a515_54_5526") {
            laptopModelField.value = "Prata";
            laptopImg.src = "../../assets/laptop_silver.png";
        } else {

            laptopModel.value = "Preto";
            laptopImg.src = "../../assets/laptop_black.png";
        }

    })
    .catch(e => {
        console.log("ERRO NA FUNCAO defInfos: " + e);
    });
}

function defLinkReport(dataLaptop) {

    getLaptopLinksData().then(data => {
        if (data.length == 0) {
            laptopWithoutLinks()
        }
        data.forEach(e => {
            getBeneficiaryName(e.id).then(dataBeneficiary => {
                createTableReports(
                    {
                        beneficiaryName: dataBeneficiary,
                        initDate: e.initDate,
                        endDate: e.endDate,
                        linkId: e.id
                    }
                )
            }).catch(ee => {
                console.log(ee);
            })
        });
    })
}



function createTableReports(obj) {
    let tbody = document.getElementsByTagName("tbody")[0]

    let tr = document.createElement("tr");

    let tdBeneficiaryName = createTd();
    tdBeneficiaryName.textContent = obj.beneficiaryName;

    let tdStartDate = createTd();
    tdStartDate.textContent = formatDate(obj.initDate);

    let tdEndDate = createTd();
    tdEndDate.textContent = obj.endDate == null ? "Ainda em vigor" : formatDate(obj.endDate);

    let tdLink = createTd();
    let aTdLink = document.createElement("a");
    aTdLink.href = `/views/link/show.html?id=${obj.linkId}`;
    aTdLink.className = "bi bi-box-arrow-in-right fs-4";
    tdLink.appendChild(aTdLink);

    [tdBeneficiaryName, tdStartDate, tdEndDate, tdLink].forEach(td => {
        tr.appendChild(td);
    })

    tbody.appendChild(tr);
}

function getLaptopData() {
    return fetch(`http://localhost:8080/laptop/${id}`)
        .then(responseRaw => {
            console.log(responseRaw)

            return responseRaw.json();
        })
        .then(response => {
            return response;
        })
        .catch(e => {
            throw new Error("erro ao obter informaçoes");
        })


}

function getLaptopLinksData() {
    try {
        return fetch(`http://localhost:8080/laptop/getAllLinksByLaptopId/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("erro ao obter informações");
                }
                return response.json();
            })
            .then(dataBeneficiaryLinks => {
                return dataBeneficiaryLinks;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

    } catch (error) {
    }
}

function getBeneficiaryName(idBeneficiary) {
    console.log(2);
    return fetch(`http://localhost:8080/beneficiary/${idBeneficiary}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("erro ao obter informações");
            }
            return response.json();
        })
        .then(b => {
            return b.name;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}





function formatLaptopListedNumber(listedNumber) {
    return listedNumber.slice(0, 2) + "-" + listedNumber.slice(2);
}

function formatDate(date) {
    let dateUnformated = date.substring(0, 10).split("-");
    return `${dateUnformated[2]}/${dateUnformated[1]}/${dateUnformated[0]}`;
}

function createTd() {
    return document.createElement("td");
}

function laptopWithoutLinks() {
    let table = document.getElementsByTagName("table")[0];
    table.remove();
    let nonLinkeds = document.getElementById("alert")
    nonLinkeds.hidden = false;
    nonLinkeds.textContent = "Este notebook nunca possuiu um vínculo";
    nonLinkeds.classList = "text-danger fs-3 text-center"
}