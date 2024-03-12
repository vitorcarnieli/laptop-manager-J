package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	
	
}
