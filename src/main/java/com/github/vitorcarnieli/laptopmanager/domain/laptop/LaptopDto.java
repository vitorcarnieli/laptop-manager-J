package com.github.vitorcarnieli.laptopmanager.domain.laptop;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;

public class LaptopDto extends BaseDto {
	
	private String serialNumber, listedNumber, model;

	public LaptopDto() {
		super();
	}

	public LaptopDto(String serialNumber, String listedNumber, String model) {
		super();
		this.serialNumber = serialNumber;
		this.listedNumber = listedNumber;
		this.model = model;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getListedNumber() {
		return listedNumber;
	}

	public void setListedNumber(String listedNumber) {
		this.listedNumber = listedNumber;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}
	
	

}
