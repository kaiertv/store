package com.mycompany.store.web.rest;

import com.mycompany.store.StoreApp;
import com.mycompany.store.domain.Calificacion;
import com.mycompany.store.repository.CalificacionRepository;
import com.mycompany.store.service.CalificacionService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.store.domain.enumeration.Evaluar;
/**
 * Integration tests for the {@link CalificacionResource} REST controller.
 */
@SpringBootTest(classes = StoreApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CalificacionResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Evaluar DEFAULT_EVALUACION = Evaluar.X;
    private static final Evaluar UPDATED_EVALUACION = Evaluar.XX;

    @Autowired
    private CalificacionRepository calificacionRepository;

    @Autowired
    private CalificacionService calificacionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCalificacionMockMvc;

    private Calificacion calificacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Calificacion createEntity(EntityManager em) {
        Calificacion calificacion = new Calificacion()
            .date(DEFAULT_DATE)
            .evaluacion(DEFAULT_EVALUACION);
        return calificacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Calificacion createUpdatedEntity(EntityManager em) {
        Calificacion calificacion = new Calificacion()
            .date(UPDATED_DATE)
            .evaluacion(UPDATED_EVALUACION);
        return calificacion;
    }

    @BeforeEach
    public void initTest() {
        calificacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCalificacion() throws Exception {
        int databaseSizeBeforeCreate = calificacionRepository.findAll().size();
        // Create the Calificacion
        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isCreated());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeCreate + 1);
        Calificacion testCalificacion = calificacionList.get(calificacionList.size() - 1);
        assertThat(testCalificacion.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCalificacion.getEvaluacion()).isEqualTo(DEFAULT_EVALUACION);
    }

    @Test
    @Transactional
    public void createCalificacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = calificacionRepository.findAll().size();

        // Create the Calificacion with an existing ID
        calificacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = calificacionRepository.findAll().size();
        // set the field null
        calificacion.setDate(null);

        // Create the Calificacion, which fails.


        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEvaluacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = calificacionRepository.findAll().size();
        // set the field null
        calificacion.setEvaluacion(null);

        // Create the Calificacion, which fails.


        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCalificacions() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);

        // Get all the calificacionList
        restCalificacionMockMvc.perform(get("/api/calificacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calificacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].evaluacion").value(hasItem(DEFAULT_EVALUACION.toString())));
    }
    
    @Test
    @Transactional
    public void getCalificacion() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);

        // Get the calificacion
        restCalificacionMockMvc.perform(get("/api/calificacions/{id}", calificacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(calificacion.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.evaluacion").value(DEFAULT_EVALUACION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCalificacion() throws Exception {
        // Get the calificacion
        restCalificacionMockMvc.perform(get("/api/calificacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCalificacion() throws Exception {
        // Initialize the database
        calificacionService.save(calificacion);

        int databaseSizeBeforeUpdate = calificacionRepository.findAll().size();

        // Update the calificacion
        Calificacion updatedCalificacion = calificacionRepository.findById(calificacion.getId()).get();
        // Disconnect from session so that the updates on updatedCalificacion are not directly saved in db
        em.detach(updatedCalificacion);
        updatedCalificacion
            .date(UPDATED_DATE)
            .evaluacion(UPDATED_EVALUACION);

        restCalificacionMockMvc.perform(put("/api/calificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCalificacion)))
            .andExpect(status().isOk());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeUpdate);
        Calificacion testCalificacion = calificacionList.get(calificacionList.size() - 1);
        assertThat(testCalificacion.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCalificacion.getEvaluacion()).isEqualTo(UPDATED_EVALUACION);
    }

    @Test
    @Transactional
    public void updateNonExistingCalificacion() throws Exception {
        int databaseSizeBeforeUpdate = calificacionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalificacionMockMvc.perform(put("/api/calificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCalificacion() throws Exception {
        // Initialize the database
        calificacionService.save(calificacion);

        int databaseSizeBeforeDelete = calificacionRepository.findAll().size();

        // Delete the calificacion
        restCalificacionMockMvc.perform(delete("/api/calificacions/{id}", calificacion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
