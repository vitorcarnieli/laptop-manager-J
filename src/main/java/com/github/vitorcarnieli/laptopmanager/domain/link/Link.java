package com.github.vitorcarnieli.laptopmanager.domain.link;

import java.util.Date;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Link extends BaseEntity {

	private static final long serialVersionUID = -9076079988164514233L;

	@ManyToOne
	@JoinColumn(name = "beneficiary_id")
	private Beneficiary beneficiary;
	
	@ManyToOne
	@JoinColumn(name = "laptop_id")
	private Laptop laptop;
	
	private Date initDate;
	
	private Date endDate;
	
	
	

	public Link() {
		super();
	}
	
	public Link(Laptop laptop, Beneficiary beneficiary) {
		setLaptop(laptop);
		setBeneficiary(beneficiary);
		setInitDate(new Date());
	}
	
	public boolean isCurrent() {
		return endDate == null;
	}

	public Beneficiary getBeneficiary() {
		return beneficiary;
	}

	public void setBeneficiary(Beneficiary beneficiary) {
		this.beneficiary = beneficiary;
	}

	public Laptop getLaptop() {
		return laptop;
	}

	public void setLaptop(Laptop laptop) {
		this.laptop = laptop;
	}

	public Date getInitDate() {
		return initDate;
	}

	public void setInitDate(Date initDate) {
		this.initDate = initDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public static BaseEntity newInstance() {
		return new Link();
	}
	
	
	
	
}
