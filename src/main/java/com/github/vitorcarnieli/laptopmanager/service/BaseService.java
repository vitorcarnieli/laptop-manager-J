package com.github.vitorcarnieli.laptopmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.vitorcarnieli.laptopmanager.domain.base.BaseDto;
import com.github.vitorcarnieli.laptopmanager.domain.base.BaseEntity;
import com.github.vitorcarnieli.laptopmanager.repository.BaseRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BaseService<E extends BaseEntity, D extends BaseDto> {

	private Class<E> entityClass;
	
    @Autowired
	protected BaseRepository<E> baseRepository;
	
	public BaseService(E entityClass) {
		this.entityClass = (Class<E>) entityClass.getClass();
	}

	public List<E> findAll() throws Exception {
		try {
			return baseRepository.findAll();
		} catch (Exception e) {
			throw e;
		}
	}
	
	public E findById(Long id) throws Exception {
		try {
			Optional<E> entityOptional =  baseRepository.findById(id);
			if (entityOptional.isEmpty()) {
				throw new EntityNotFoundException("Entity by id: " + id + " not found");
			}
			return entityOptional.get();
		} catch (Exception e) {
			throw e;
		}
	}
	
	public boolean saveAll(Iterable<D> entitys) throws Exception {
		
		try {
			entitys.forEach( e -> {
                try {
                    E entity = entityClass.getDeclaredConstructor().newInstance();
                    BeanUtils.copyProperties(e, entity);
                    this.save(entity);   
                } catch (Exception error) {
                    System.out.println("Erro ao salver multiplo usuarios");
                }
			});
			return true;
		} catch (Exception e) {
			throw e;
		}		
	}
	
	public boolean save(D dto) throws Exception {
		try {
			E entity = entityClass.getDeclaredConstructor().newInstance();
			BeanUtils.copyProperties(dto, entity);
			baseRepository.save(entity);
			return true;
		} catch (Exception e) {
			throw e;
		}
	}

	public boolean save(E entity) throws Exception {
		try {
			baseRepository.save(entity);
			return true;
		} catch (Exception e) {
			throw e;
		}
	}
	
	public boolean deleteAll() throws Exception {
		try {
			baseRepository.deleteAll();
			return true;
		} catch (Exception e) {
			throw e;
		}
	}
	
	public boolean deleteById(Long id) throws Exception {
		try {
			baseRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			throw e;
		}
	}
	
}
