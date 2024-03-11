package com.github.vitorcarnieli.laptopmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;

public interface BaseRepository<E extends BaseEntity> extends JpaRepository<E, Long> {

}
