package com.github.vitorcarnieli.laptopmanager.service;

import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.Laptop;
import com.github.vitorcarnieli.laptopmanager.domain.laptop.LaptopDto;

@Service
public class LaptopService extends BaseService<Laptop, LaptopDto> {

	public LaptopService() {
		super(new Laptop());
	}



	

}
