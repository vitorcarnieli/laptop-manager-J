package com.github.vitorcarnieli.laptopmanager.service;

import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.BeneficiaryDto;

@Service
public class BeneficiaryService extends BaseService<Beneficiary, BeneficiaryDto> {

	public BeneficiaryService() {
		super(new Beneficiary());
	}



}
