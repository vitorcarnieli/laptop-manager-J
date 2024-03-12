package com.github.vitorcarnieli.laptopmanager.domain.laptop;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;

public class LaptopDto extends BaseDto {
	
	private String serialNumber, listedNumber, laptopModel;

	public LaptopDto() {
	}
	
	public LaptopDto(String serialNumber, String listedNumber, String laptopModel) {
		this.serialNumber = serialNumber;
		this.listedNumber = listedNumber;
		this.setLaptopModel(laptopModel);
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

	public String getLaptopModel() {
		return laptopModel;
	}

	public void setLaptopModel(String laptopModel) {
		this.laptopModel = laptopModel;
	}


	
	
	

}
