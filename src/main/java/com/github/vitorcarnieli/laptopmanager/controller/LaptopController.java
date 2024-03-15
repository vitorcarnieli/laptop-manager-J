package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.LaptopDto;
import com.github.vitorcarnieli.laptopmanager.service.LaptopService;

@RestController
@RequestMapping("/laptop")
@CrossOrigin("*")
public class LaptopController extends BaseController<Laptop, LaptopDto> {

	@Autowired
	private LaptopService laptopService;
	
	@GetMapping("/getBeneficiaryNameByLaptopId/{id}")
	public ResponseEntity<Object> getBeneficiaryNameByLaptopId(@PathVariable("id") Long id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(laptopService.getBeneficiaryNameByLaptopId(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}
}
