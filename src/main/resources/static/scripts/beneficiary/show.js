const id = new URLSearchParams(window.location.search).get("id");
const titlePage = document.getElementsByTagName("title");
const beneficiaryNameTitle = document.getElementById("beneficiaryNameTitle");
const beneficiaryName = document.getElementById("beneficiaryName");
const beneficiaryDocument = document.getElementById("beneficiaryDocument");
const beneficiaryContact = document.getElementById("beneficiaryContact");
const beneficiaryContractType = document.getElementById("beneficiaryContractType");

buildPage();

function buildPage() {
    defInfos();
    defReports(getBeneficiaryLinkdsData());
}


function defInfos() {
    getBeneficiaryData().then(b => {
        beneficiaryNameTitle.textContent = b.name;
        beneficiaryName.value = b.name;
        beneficiaryDocument.value = b.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');;
        beneficiaryContact.value = b.contactNumber;
        beneficiaryContractType.value = b.contractType[0] === "E" ? "Efetivo" : "Contratado (DT)";
    }).catch(e => {throw e});
}

function defReports(dataBeneficiary) {

    dataBeneficiary.then(data => {
        if (data.length == 0) {
            beneficiaryWithoutLinks()
        }
        data.forEach(e => {
            getLaptopData(e.laptopId).then(dataLaptop => {
                createTableReports(
                    {
                        laptopNumber: dataLaptop,
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

function beneficiaryWithoutLinks() {
    let table = document.getElementsByTagName("table")[0];
    table.remove();
    let nonLinkeds = document.getElementById("alert")
    nonLinkeds.hidden = false;
    nonLinkeds.textContent = "Este beneficiário nunca possuiu um vínculo";
    nonLinkeds.classList = "text-danger fs-3 text-center"
}

function createTableReports(obj) {
    console.log(obj)
    let tbody = document.getElementsByTagName("tbody")[0]

    let tr = document.createElement("tr");

    let tdLaptopNumber = createTd();
    tdLaptopNumber.textContent = obj.laptopNumber.slice(0, 2) + "-" + obj.laptopNumber.slice(2);

    let tdStartDate = createTd();
    tdStartDate.textContent = formatDate(obj.initDate);

    let tdEndDate = createTd();
    tdEndDate.textContent = obj.endDate == null ? "Ainda em vigor" : formatDate(obj.endDate);

    let tdLink = createTd();
    let aTdLink = document.createElement("a");
    aTdLink.href = `/views/link/show.html?id=${obj.linkId}`;
    aTdLink.className = "bi bi-box-arrow-in-right fs-4";
    tdLink.appendChild(aTdLink);

    [tdLaptopNumber, tdStartDate, tdEndDate, tdLink].forEach(td => {
        tr.appendChild(td);
    })

    tbody.appendChild(tr);
}

function formatDate(date) {
    let dateUnformated = date.substring(0, 10).split("-");
    return `${dateUnformated[2]}/${dateUnformated[1]}/${dateUnformated[0]}`;
}

function createTd() {
    return document.createElement("td");
}


function getBeneficiaryData() {
    return fetch(`http://localhost:8080/beneficiary/${id}`)
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

function getBeneficiaryLinkdsData() {
    try {
        return fetch(`http://localhost:8080/beneficiary/getAllLinksByBeneficiaryId/${id}`)
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

function getLaptopData(idLaptop) {
    return fetch(`http://localhost:8080/laptop/${idLaptop}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("erro ao obter informações");
            }
            return response.json();
        })
        .then(laptop => {
            return laptop.listedNumber;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}