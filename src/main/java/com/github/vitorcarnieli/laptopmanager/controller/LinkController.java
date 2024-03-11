package com.github.vitorcarnieli.laptopmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.vitorcarnieli.laptopmanager.domain.link.Link;
import com.github.vitorcarnieli.laptopmanager.domain.link.LinkDto;
import com.github.vitorcarnieli.laptopmanager.service.LinkService;

@RestController
@RequestMapping("/link")
public class LinkController extends BaseController<Link, LinkDto> {

	@Autowired
	LinkService linkService;
	
}
