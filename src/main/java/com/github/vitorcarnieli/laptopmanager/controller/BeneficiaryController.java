package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.BeneficiaryDto;
import com.github.vitorcarnieli.laptopmanager.service.BeneficiaryService;

@RestController
@RequestMapping("/beneficiary")
public class BeneficiaryController extends BaseController<Beneficiary, BeneficiaryDto> {

	@Autowired
	private BeneficiaryService beneficiaryService;
	
	
}
