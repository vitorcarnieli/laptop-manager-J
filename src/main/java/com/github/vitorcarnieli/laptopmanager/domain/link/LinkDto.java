package com.github.vitorcarnieli.laptopmanager.domain.link;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;

public class LinkDto extends BaseDto{
	private Long beneficiaryId, laptopId, year;
	
	public LinkDto() {
		
	}

	public LinkDto(Long beneficiary, Long laptop, Long year) {
		this.beneficiaryId = beneficiary;
		this.laptopId = laptop;
        this.year = year;
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
		return "LinkDto [beneficiaryId=" + beneficiaryId + ", laptopId=" + laptopId + "]";
	}

    public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }
	
	
	
	
}
