package com.github.vitorcarnieli.laptopmanager.domain.beneficiary;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Beneficiary extends BaseEntity {

	private static final long serialVersionUID = -7302649604872231004L;
	
	private String name;
	
	private String document;
	
	private String contactNumber;
	
	private ContractType contractType;
	
    @OneToOne(mappedBy = "currentBeneficiary")
    @JsonIgnore
	private Laptop currentLaptop;
	
	@OneToMany(mappedBy = "beneficiary")
	@JsonIgnore
	private List<Link> links;

	public Beneficiary() {
		
	}
	
	public Boolean isLinked() {
	    return !links.isEmpty() && links.get(links.size() - 1).isCurrent();
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

	public ContractType getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		switch (contractType) {
			case "0": {
				this.contractType = ContractType.EFFECTIVE;
				break;
			}
			case "EFFECTIVE": {
				this.contractType = ContractType.EFFECTIVE;
				break;
			}
			case "1": {
				this.contractType = ContractType.HIRED;
				break;
			}
			case "HIRED": {
				this.contractType = ContractType.HIRED;
				break;
			}
		default:
			throw new IllegalArgumentException("Unexpected value: " + contractType);
		}
	}

	public List<Link> getLinks() {
		return links;
	}

	public void setLinks(List<Link> links) {
		this.links = links;
	}
	
	public boolean addLink(Link link) {
		if (link != null) {
			links.add(link);
			return this.setCurrentLaptop(link.getLaptop());
		} 
		throw new RuntimeException();
	}

	@Override
	public String toString() {
		return "Beneficiary [name=" + name + ", document=" + document + ", contactNumber=" + contactNumber
				+ ", contractType=" + contractType + ", links=" + links + "]";
	}

	public Laptop getCurrentLaptop() {
		return currentLaptop;
	}

	public boolean setCurrentLaptop(Laptop currentLaptop) {
		this.currentLaptop = currentLaptop;
		return true;
	}
	
	



	
	
}
