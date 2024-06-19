package com.github.vitorcarnieli.laptopmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.Beneficiary;
import com.github.vitorcarnieli.laptopmanager.domain.beneficiary.BeneficiaryDto;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.service.BeneficiaryService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/beneficiary")
@CrossOrigin("*")
public class BeneficiaryController extends BaseController<Beneficiary, BeneficiaryDto> {

	@Autowired
	private BeneficiaryService beneficiaryService;
	
	@GetMapping("/getLaptopListedNumberByUserId/{id}")
	public ResponseEntity<Object> getLaptopListedNumberByUserId(@PathVariable("id") Long id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(beneficiaryService.getLaptopListedNumberByUserId(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@GetMapping("/getAllLinksByBeneficiaryId/{id}")
    public ResponseEntity<Object> getAllLinksIdByBeneficiaryId(@PathVariable("id") Long id) {
        try {
			return ResponseEntity.status(HttpStatus.OK).body(beneficiaryService.getAllLinksByBeneficiaryId(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
    } 
	
}
