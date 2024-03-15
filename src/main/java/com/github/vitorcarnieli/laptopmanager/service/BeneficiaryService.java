package com.github.vitorcarnieli.laptopmanager.service;

import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.BeneficiaryDto;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BeneficiaryService extends BaseService<Beneficiary, BeneficiaryDto> {

	public BeneficiaryService() {
		super(new Beneficiary());
	}

	public String getLaptopListedNumberByUserId(Long id) throws EntityNotFoundException {
	    try {
	        Beneficiary beneficiary = this.findById(id);
	        if (beneficiary == null) {
	            throw new EntityNotFoundException("Beneficiary Entity by id: " + id + " not found");
	        }
	        if (!beneficiary.isLinked()) {
	            throw new RuntimeException("Beneficiary entity by id: " + id + " is not linked");
	        }
	        
	        return beneficiary.getCurrentLaptop().getListedNumber();
	    } catch (RuntimeException e) {
	        throw e;
	    } catch (Exception e) {
	        throw new RuntimeException("An unexpected error occurred while retrieving laptop listed number for Beneficiary with id: " + id, e);
	    }
	}


}
