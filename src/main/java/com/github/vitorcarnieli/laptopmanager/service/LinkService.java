package com.github.vitorcarnieli.laptopmanager.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.domain.link.LinkDto;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LinkService extends BaseService<Link, LinkDto>{

	@Autowired
	BeneficiaryService beneficiaryService;
	
	@Autowired
	LaptopService laptopService;
	
	public LinkService() {
		super(new Link());
	}
	
	
	public boolean save(LinkDto dto) throws Exception {
		try {
			Laptop laptop = laptopService.findById(dto.getLaptopId());
			Beneficiary beneficiary = beneficiaryService.findById(dto.getBeneficiaryId());
			Link link = new Link(laptop, beneficiary);
            link.setName(laptop.getListedNumber() + " & " + beneficiary.getName());
			return this.save(link);
		} catch (Exception e) {
			System.out.println(e.getLocalizedMessage());
			throw e;
		}
		
	}
	
	public String getBeneficiaryNameLaptopListedNumberByLinkId(Long id) {
	    try {
	        Link link = this.findById(id);
	        if (link == null) {
	            throw new EntityNotFoundException("Link Entity by id: " + id + " not found");
	        }

	        String[] name = link.getBeneficiary().getName().split(" ");
	        return link.getLaptop()
	        		.getListedNumber().replaceAll("^(\\d{2})(\\d{5})$", "$1-$2")
	        		+ " & " + 
	        		name[0] + " " + name[name.length-1].charAt(0) + ".";
	    } catch (RuntimeException e) {
	        throw e;
	    } catch (Exception e) {
	        throw new RuntimeException("An unexpected error occurred while retrieving laptop listed number for Beneficiary with id: " + id, e);
	    }
	}
	
	public List<List<Object>> getAvailablesBeneficiariesLaptops() {
		List<List<Object>> listReturn = new ArrayList<List<Object>>();
		try {
			List<Beneficiary> beneficiaries = this.beneficiaryService.findAll();
			List<Laptop> laptops = this.laptopService.findAll();
			beneficiaries.removeIf(b -> b.isLinked());
			laptops.removeIf(l -> l.isLinked());
			listReturn.add(Arrays.asList(beneficiaries));
			listReturn.add(Arrays.asList(laptops));
			return listReturn;
		} catch (Exception e) {
			throw new RuntimeException("Error in get beneficiaries and laptops availables");
		}
	}

    public boolean finishLinkForId(Long id) throws Exception {
        try {
            Link link = this.findById(id);
            link.finishLink();
            return this.save(link);
        } catch (EntityNotFoundException e) {
            System.out.println("Link by id:" + id + " not founded");
            throw e;
        }
    }


}
