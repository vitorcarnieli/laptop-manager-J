package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;
import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.service.BaseService;

public class BaseController<E extends BaseEntity, D extends BaseDto> {

	@Autowired
	private BaseService<E, D> baseService;

	@PostMapping
	public ResponseEntity<Object> save(@RequestBody D dto) {
		System.out.println("entrou aqui52");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(baseService.save(dto));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@PostMapping("/all")
	public ResponseEntity<Object> saveAll(@RequestBody Iterable<D> dtos) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(baseService.saveAll(dtos));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@GetMapping
	public ResponseEntity<Object> findAll() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(baseService.findAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findById(@PathVariable("id") Long id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(baseService.findById(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@DeleteMapping
	public ResponseEntity<Object> deleteAll() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(baseService.deleteAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(Long id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(baseService.deleteById(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
		}
	}

}
