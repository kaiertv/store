package com.mycompany.store.service;

import com.mycompany.store.domain.Calificacion;
import com.mycompany.store.repository.CalificacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Calificacion}.
 */
@Service
@Transactional
public class CalificacionService {

    private final Logger log = LoggerFactory.getLogger(CalificacionService.class);

    private final CalificacionRepository calificacionRepository;

    public CalificacionService(CalificacionRepository calificacionRepository) {
        this.calificacionRepository = calificacionRepository;
    }

    /**
     * Save a calificacion.
     *
     * @param calificacion the entity to save.
     * @return the persisted entity.
     */
    public Calificacion save(Calificacion calificacion) {
        log.debug("Request to save Calificacion : {}", calificacion);
        return calificacionRepository.save(calificacion);
    }

    /**
     * Get all the calificacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Calificacion> findAll() {
        log.debug("Request to get all Calificacions");
        return calificacionRepository.findAll();
    }


    /**
     * Get one calificacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Calificacion> findOne(Long id) {
        log.debug("Request to get Calificacion : {}", id);
        return calificacionRepository.findById(id);
    }

    /**
     * Delete the calificacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Calificacion : {}", id);
        calificacionRepository.deleteById(id);
    }
}
