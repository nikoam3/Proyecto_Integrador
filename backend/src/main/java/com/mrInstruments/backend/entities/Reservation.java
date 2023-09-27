package com.mrInstruments.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "pedidos")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime fechaIngreso;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime fechaSalida;
    private boolean reservaActiva;
    private double seguro;

    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "usuarios_id", nullable = false)
    private User usuario;

    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "pedidos_has_productos",
            joinColumns = @JoinColumn(name = "pedidos_id"),
            inverseJoinColumns = @JoinColumn(name = "productos_id"))
    private List<Product> products;

    public Reservation(LocalDateTime fechaIngreso, LocalDateTime fechaSalida, boolean reservaActiva, double seguro, User usuario, List<Product> products) {
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.reservaActiva = reservaActiva;
        this.seguro = seguro;
        this.usuario = usuario;
        this.products = products;
    }
}
