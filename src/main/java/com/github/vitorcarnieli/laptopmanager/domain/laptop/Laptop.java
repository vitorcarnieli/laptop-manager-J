package com.github.vitorcarnieli.laptopmanager.domain.laptop;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Laptop extends BaseEntity {

	private static final long serialVersionUID = -1934216965515548387L;
	
	private String serialNumber;
	
	private String listedNumber;
	
	private LaptopModel laptopModel;
	
    @OneToOne
    @JoinColumn(name = "current_beneficiary_id")
	@JsonIgnore
	private Beneficiary currentBeneficiary;
	
	@OneToMany(mappedBy = "laptop")
	@JsonIgnore
	private List<Link> links;
	
	
	
	public Laptop() {
	}
	
	public Boolean isLinked() {
	    return !links.isEmpty() && links.get(links.size() - 1).isCurrent();
	}
	
	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getListedNumber() {
		return listedNumber;
	}

	public void setListedNumber(String listedNumber) {
		this.listedNumber = listedNumber;
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
			return this.setCurrentBeneficiary(link.getBeneficiary());
		}
		throw new RuntimeException();
	}

	public static BaseEntity newInstance() {
		return new Laptop();
	}

	public LaptopModel getLaptopModel() {
		return laptopModel;
	}

	public void setLaptopModel(String laptopModel) {
		switch (laptopModel) {
			case "0": {
				this.laptopModel = LaptopModel.a515_54_5526;
				break;
			}
			case "1": {
				this.laptopModel = LaptopModel.a515_54_55L0;
				break;
			}
		
		}
	}

	public Beneficiary getCurrentBeneficiary() {
		return currentBeneficiary;
	}

	public boolean setCurrentBeneficiary(Beneficiary currentBeneficiary) {
		this.currentBeneficiary = currentBeneficiary;
		return true;
	}
}
