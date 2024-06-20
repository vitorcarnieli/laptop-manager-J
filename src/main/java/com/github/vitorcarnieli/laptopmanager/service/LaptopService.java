package com.github.vitorcarnieli.laptopmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.LaptopDto;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LaptopService extends BaseService<Laptop, LaptopDto> {

	public LaptopService() {
		super(new Laptop());
	}

	public String getBeneficiaryNameByLaptopId(Long id) throws EntityNotFoundException {
	    try {
	        Laptop laptop = this.findById(id);
	        if (laptop == null) {
	            throw new EntityNotFoundException("Beneficiary Entity by id: " + id + " not found");
	        }
	        if (!laptop.isLinked()) {
	            throw new RuntimeException("Beneficiary entity by id: " + id + " is not linked");
	        }
	        
	        return laptop.getCurrentBeneficiary().getName();
	    } catch (RuntimeException e) {
	        throw e;
	    } catch (Exception e) {
	        throw new RuntimeException("An unexpected error occurred while retrieving laptop listed number for Beneficiary with id: " + id, e);
	    }
	}

        public List<Link> getAllLinksByLaptopId(Long id) throws Exception {
        try {
            Laptop laptop = this.findById(id);
            if (laptop == null) {
	            throw new EntityNotFoundException("Beneficiary Entity by id: " + id + " not found");
            }
            return laptop.getLinks();
        } catch (Exception e) {
            throw e;
        }
    } 

	

}
