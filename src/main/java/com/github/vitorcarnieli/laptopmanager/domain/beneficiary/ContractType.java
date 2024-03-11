package com.github.vitorcarnieli.laptopmanager.domain.beneficiary;

public enum ContractType {
	HIRED("hired"),
	EFFECTIVE("effective");
	
	private String contractType;
	
	ContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getContractType() {
		return contractType;
	}
}
