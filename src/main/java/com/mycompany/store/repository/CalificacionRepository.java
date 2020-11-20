package com.mycompany.store.repository;

import com.mycompany.store.domain.Calificacion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Calificacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {
}
