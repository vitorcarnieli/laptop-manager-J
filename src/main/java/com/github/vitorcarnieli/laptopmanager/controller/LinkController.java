package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.vitorcarnieli.laptopmanager.domain.laptop.LaptopDto;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.domain.link.LinkDto;
import com.github.vitorcarnieli.laptopmanager.service.LinkService;

@RestController
@RequestMapping("/link")
@CrossOrigin("*")
public class LinkController extends BaseController<Link, LinkDto> {

	@Autowired
	private LinkService linkService;

	@PostMapping
	public ResponseEntity<Object> save(@RequestBody LinkDto dto) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(linkService.save(dto));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@GetMapping("/getBeneficiaryNameLaptopListedNumberByLinkId/{id}")
	public ResponseEntity<Object> getBeneficiaryNameLaptopListedNumberByLinkId(@PathVariable("id") Long id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(linkService.getBeneficiaryNameLaptopListedNumberByLinkId(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}
	
	
}
