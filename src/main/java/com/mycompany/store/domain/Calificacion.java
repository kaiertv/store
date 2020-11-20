package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.mycompany.store.domain.enumeration.Evaluar;

/**
 * A Calificacion.
 */
@Entity
@Table(name = "calificacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Calificacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "evaluacion", nullable = false)
    private Evaluar evaluacion;

    @ManyToOne
    @JsonIgnoreProperties(value = "calificacions", allowSetters = true)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Calificacion date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Evaluar getEvaluacion() {
        return evaluacion;
    }

    public Calificacion evaluacion(Evaluar evaluacion) {
        this.evaluacion = evaluacion;
        return this;
    }

    public void setEvaluacion(Evaluar evaluacion) {
        this.evaluacion = evaluacion;
    }

    public Product getProduct() {
        return product;
    }

    public Calificacion product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Calificacion)) {
            return false;
        }
        return id != null && id.equals(((Calificacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Calificacion{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", evaluacion='" + getEvaluacion() + "'" +
            "}";
    }
}
