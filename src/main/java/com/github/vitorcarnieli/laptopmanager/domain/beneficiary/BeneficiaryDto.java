package com.github.vitorcarnieli.laptopmanager.domain.beneficiary;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;

public class BeneficiaryDto extends BaseDto {
	
	private String name, document, contactNumber, contractType;

	
	
	public BeneficiaryDto() {
	}

	public BeneficiaryDto(String name, String document, String contactNumber, String contractType) {
		this.name = name;
		this.document = document;
		this.contactNumber = contactNumber;
		this.contractType = contractType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	@Override
	public String toString() {
		return "BeneficiaryDto [name=" + name + ", document=" + document + ", contactNumber=" + contactNumber
				+ ", contractType=" + contractType + "]";
	}
	
	
	
	
	
}
