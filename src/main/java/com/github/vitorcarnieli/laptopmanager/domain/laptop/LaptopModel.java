package com.github.vitorcarnieli.laptopmanager.domain.laptop;

public enum LaptopModel {
	a515_54_5526("silver"),
	a515_54_55L0("charcol_black");

	private String model;
	
	LaptopModel(String model) {
		this.model = model;
	}
	
	public String getModel() {
		return model;
	}
	
}
