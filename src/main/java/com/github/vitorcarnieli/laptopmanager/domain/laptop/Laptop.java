package com.github.vitorcarnieli.laptopmanager.domain.laptop;

import java.util.List;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Laptop extends BaseEntity {

	private static final long serialVersionUID = -1934216965515548387L;
	
	private String serial_number;
	
	private String listed_number;
	
	@OneToMany(mappedBy = "laptop")
	private List<Link> links;
	
	
	
	public Laptop() {
	}

	public String getSerial_number() {
		return serial_number;
	}
	
	public void setSerial_number(String serial_number) {
		this.serial_number = serial_number;
	}
	
	public String getListed_number() {
		return listed_number;
	}
	
	public void setListed_number(String listed_number) {
		this.listed_number = listed_number;
	}
	
	public List<Link> getLinks() {
		return links;
	}
	
	public void setLinks(List<Link> links) {
		this.links = links;
	}
	
	public boolean addLink(Link link) {
		if (link != null) {
			return links.add(link);
		}
		throw new RuntimeException();
	}

	public static BaseEntity newInstance() {
		return new Laptop();
	}
	
	
}
