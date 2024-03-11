package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.LaptopDto;
import com.github.vitorcarnieli.laptopmanager.service.LaptopService;

@RestController
@RequestMapping("/laptop")
public class LaptopController extends BaseController<Laptop, LaptopDto> {

	@Autowired
	LaptopService laptopService;
}
