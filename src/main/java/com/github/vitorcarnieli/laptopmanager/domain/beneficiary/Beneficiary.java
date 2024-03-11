package com.github.vitorcarnieli.laptopmanager.domain.beneficiary;

import java.util.List;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Beneficiary extends BaseEntity {

	private static final long serialVersionUID = -7302649604872231004L;
	
	private String name;
	
	private String document;
	
	private String contactNumber;
	
	private ContractType contractType;
	
	@OneToMany(mappedBy = "beneficiary")
	private List<Link> links;

	public Beneficiary() {
		
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
			return links.add(link);
		}
		throw new RuntimeException();
	}

	@Override
	public String toString() {
		return "Beneficiary [name=" + name + ", document=" + document + ", contactNumber=" + contactNumber
				+ ", contractType=" + contractType + ", links=" + links + "]";
	}
	
	



	
	
}
