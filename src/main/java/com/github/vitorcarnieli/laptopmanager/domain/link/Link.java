package com.github.vitorcarnieli.laptopmanager.domain.link;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Link extends BaseEntity {

	private static final long serialVersionUID = -9076079988164514233L;

	@ManyToOne
	@JoinColumn(name = "beneficiary_id")
	@JsonIgnore
	private Beneficiary beneficiary;
	
	@ManyToOne
	@JoinColumn(name = "laptop_id")
	@JsonIgnore
	private Laptop laptop;
	
    @Column(name = "beneficiary_id", insertable = false, updatable = false)
    private Long beneficiaryId;

    @Column(name = "laptop_id", insertable = false, updatable = false)
    private Long laptopId;
	
	private Date initDate;
	
	private Date endDate;
	
	
	

	public Link() {
		super();
	}
	
	public Link(Laptop laptop, Beneficiary beneficiary) {
		setLaptop(laptop);
		setBeneficiary(beneficiary);
		setInitDate(new Date());
		laptop.addLink(this);
		beneficiary.addLink(this);
	}
	
    public boolean finishLink() {
        if (!isCurrent()) {
            throw new RuntimeException("link with id:" + this.getId() + " does not is current");
        }
        this.setEndDate(new Date());
        System.out.println(this.getEndDate());
        return true;
    }

	public boolean isCurrent() {
		return endDate == null;
	}

	public Beneficiary getBeneficiary() {
		return beneficiary;
	}

	public void setBeneficiary(Beneficiary beneficiary) {
		if (beneficiary.isLinked()) 
			throw new RuntimeException("Laptop by id: " + beneficiary.getId() + " is linked.");
		this.beneficiary = beneficiary;	
	}

	public Laptop getLaptop() {
		return laptop;
	}

	public void setLaptop(Laptop laptop) {
		if (laptop.isLinked()) 
			throw new RuntimeException("Laptop by id: " + laptop.getId() + " is linked.");
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

	public Long getBeneficiaryId() {
		return beneficiaryId;
	}

	public void setBeneficiaryId(Long beneficiaryId) {
		this.beneficiaryId = beneficiaryId;
	}

	public Long getLaptopId() {
		return laptopId;
	}

	public void setLaptopId(Long laptopId) {
		this.laptopId = laptopId;
	}

    @Override
    public String toString() {
        return "Link [beneficiary=" + beneficiary + ", laptop=" + laptop + ", beneficiaryId=" + beneficiaryId
                + ", laptopId=" + laptopId + ", initDate=" + initDate + ", endDate=" + endDate + "]";
    }
	
	
	
	
	
	
}
