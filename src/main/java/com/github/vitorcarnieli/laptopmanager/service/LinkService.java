package com.github.vitorcarnieli.laptopmanager.service;

import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.domain.link.LinkDto;

@Service
public class LinkService extends BaseService<Link, LinkDto>{

	public LinkService() {
		super(new Link());
	}


}
