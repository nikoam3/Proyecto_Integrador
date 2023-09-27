package com.mrInstruments.backend.repository;

import com.mrInstruments.backend.entities.Category;
import com.mrInstruments.backend.entities.Product;
import com.mrInstruments.backend.entities.Reservation;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.enums.UserRol;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@AutoConfigureMockMvc(addFilters=false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ReservationRepositoryTest {

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;
    Reservation reserva1;
    Reservation reserva2;
    private Product p1;
    private Product p2;
    private Category cat1;
    private Set<Product> carrito;
    private User usuario1;


    @BeforeEach
    @DisplayName("Cargando Data")
    void setup(){
        cat1 = new Category("Cordofonos","vibracion de cuerdas","url-img");
        categoryRepository.save(cat1);

        p1 = new Product("Guitarra Electrica","descrip","url-img",350.0,cat1);
        p2 = new Product("Guitarra Criolla","descrip","url-img",200.0,cat1);
        productRepository.save(p1);
        productRepository.save(p2);

        List<Product> carrito  =new ArrayList<>();
        carrito.add(p1);
        carrito.add(p2);

        usuario1 = new User("Juan","Perez","jperez@gmail.com","hola123", UserRol.ROLE_USER);
        usuario1.setId(1l);
        userRepository.save(usuario1);

        reserva1 = new Reservation();
            reserva1.setId(1l);
            reserva1.setFechaIngreso(LocalDateTime.now());
            reserva1.setFechaSalida(LocalDateTime.of(2023,11,29,5,55,55));
            reserva1.setReservaActiva(true);
            reserva1.setSeguro(5.5);
            reserva1.setProducts(carrito);
            reserva1.setUsuario(usuario1);

        reserva2 = new Reservation();
        reserva2.setId(2l);
        reserva2.setFechaIngreso(LocalDateTime.now());
        reserva2.setFechaSalida(LocalDateTime.of(2023,11,29,4,44,44));
        reserva2.setReservaActiva(true);
        reserva2.setSeguro(5.5);
        reserva2.setProducts(carrito);
        reserva2.setUsuario(usuario1);

    }
    @Test
    void save() {
        Reservation reservaGuardada = reservationRepository.save(reserva1);

        assertTrue(Optional.of(reservaGuardada).isPresent());
        assertTrue(reservaGuardada.getId().equals(reserva1.getId()));
    }

    @Test
    void findAll() {
        reservationRepository.save(reserva1);
        reservationRepository.save(reserva2);

        List<Reservation> listadoReservas = reservationRepository.findAll();
        assertTrue(listadoReservas.size() ==2);

    }

    @Test
    void deleteById() {
        reservationRepository.save(reserva1);
        assertTrue(reservationRepository.findById(reserva1.getId()).isPresent());
        reservationRepository.deleteById(reserva1.getId());
        Optional<Reservation> reservaEliminada = reservationRepository.findById(reserva1.getId());
        assertTrue(reservaEliminada.isEmpty());

    }

    @Test
    void findById() {
        reservationRepository.save(reserva1);
        Optional<Reservation> reservaEncontrada = reservationRepository.findById(reserva1.getId());
        assertTrue(reservaEncontrada.isPresent());
        assertTrue(reservaEncontrada.get().getId().equals(reserva1.getId()));
    }

    @Test
    void findAllByUsuarioId() {
        reservationRepository.save(reserva1);

        List<Reservation> listadoReservas = reservationRepository.findAllByUsuarioId(usuario1.getId());
        assertTrue(listadoReservas.size() == 1);

        reservationRepository.save(reserva2);

        listadoReservas = reservationRepository.findAllByUsuarioId(usuario1.getId());

        assertTrue(listadoReservas.size()==2);


    }

}