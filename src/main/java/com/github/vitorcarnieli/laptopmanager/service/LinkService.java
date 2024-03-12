package com.github.vitorcarnieli.laptopmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.domain.link.LinkDto;

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
			return this.save(link);
		} catch (Exception e) {
			throw e;
		}
		
	}


}
