package com.github.vitorcarnieli.laptopmanager.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonSerializable.Base;
import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.BeneficiaryDto;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;

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

    public List<Link> getAllLinksByBeneficiaryId(Long id) throws Exception {
        try {
            Beneficiary beneficiary = this.findById(id);
            if (beneficiary == null) {
	            throw new EntityNotFoundException("Beneficiary Entity by id: " + id + " not found");
            }
            return beneficiary.getLinks();
        } catch (Exception e) {
            throw e;
        }
    } 


}
