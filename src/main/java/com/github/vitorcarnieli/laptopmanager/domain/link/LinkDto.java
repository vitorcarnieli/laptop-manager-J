package com.github.vitorcarnieli.laptopmanager.domain.link;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;

public class LinkDto extends BaseDto{
	private Long beneficiaryId, laptopId;
	
	public LinkDto() {
		
	}

	public LinkDto(Long beneficiaryId, Long laptopId) {
		super();
		this.beneficiaryId = beneficiaryId;
		this.laptopId = laptopId;
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
	
	
}
