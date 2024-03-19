const id  = new URLSearchParams(window.location.search).get("id");
const laptopModel = document.getElementById("laptopModel");
const serialNumber = document.getElementById("serialNumber");
const listedNumber = document.getElementById("listedNumber");
const beneficiaryName = document.getElementById("name");
const identificationDocument = document.getElementById("identificationDocument");
const contactNumber = document.getElementById("contactNumber");
const contractType = document.getElementById("contractType");
const dates = document.getElementById("dates");
const laptopImg = document.getElementById("laptopImg");
const nameLink = document.getElementById("linkName");
const titleDoc = document.getElementById("title")

buildLink();

async function buildLink() {
    try {
        const responseName = await fetch(`http://localhost:8080/link/getBeneficiaryNameLaptopListedNumberByLinkId/${id}`);

        if (!responseName.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let dataName = await responseName.text();
        nameLink.textContent = dataName;
        titleDoc.textContent = "Vínculo | " + dataName;




        const responseLink = await fetch(`http://localhost:8080/link/${id}`);

        if (!responseLink.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let dataLink = await responseLink.json();
        dates.textContent = dataLink.endDate == null ? 
            `Inicio: ${dataLink.initDate.split("T")[0].split("-").reverse().toString().replaceAll(",","/")}` 
        : 
        `Inicio: ${dataLink.initDate.split("T")[0].split("-").reverse().toString().replaceAll(",","/")}  -  Fim: ${dataLink.endDate.split("T")[0].split("-").reverse().toString().replaceAll(",","/")}`;

        const responseBeneficiary = await fetch(`http://localhost:8080/beneficiary/${dataLink.beneficiaryId}`);

        if (!responseBeneficiary.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let dataBeneficiary = await responseBeneficiary.json();

        beneficiaryName.value = dataBeneficiary.name;
        identificationDocument.value = dataBeneficiary.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        contactNumber.value = dataBeneficiary.contactNumber;
        contractType.value = dataBeneficiary.contractType[0] === "E" ? "Efetivo" : "Contratado (DT)";

        const responseLaptop = await fetch(`http://localhost:8080/laptop/${dataLink.laptopId}`);

        if (!responseLaptop.ok) {
            throw new Error('Erro ao obter os dados');
        }

        let dataLaptop = await responseLaptop.json();

        laptopModel.value = dataLaptop.laptopModel === "a515_54_5526" ? 
        function() {
            laptopImg.src = "../../assets/laptop_silver.png";            
            return `Prata / ${dataLaptop.laptopModel.split("_").toString().replaceAll(",","-").toUpperCase()}`;
        }()
        : 
        function() {
            laptopImg.src = "../../assets/laptop_black.png";            
            return `Preto / ${dataLaptop.laptopModel.split("_").toString().replaceAll(",","-").toUpperCase()}`;

        }()
        serialNumber.value = dataLaptop.serialNumber;
        listedNumber.value = dataLaptop.listedNumber.slice(0,2) + "-" + dataLaptop.listedNumber.slice(2);

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

