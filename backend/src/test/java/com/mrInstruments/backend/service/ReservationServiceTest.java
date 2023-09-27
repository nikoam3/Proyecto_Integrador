package com.mrInstruments.backend.service;

import com.mrInstruments.backend.dto.ReservationDto;
import com.mrInstruments.backend.entities.Category;
import com.mrInstruments.backend.entities.Product;
import com.mrInstruments.backend.entities.Reservation;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.enums.UserRol;
import com.mrInstruments.backend.exception.BadRequestException;
import com.mrInstruments.backend.exception.ResourceNotFoundException;
import com.mrInstruments.backend.repository.CategoryRepository;
import com.mrInstruments.backend.repository.ProductRepository;
import com.mrInstruments.backend.repository.ReservationRepository;
import com.mrInstruments.backend.repository.UserRepository;
import static com.mrInstruments.backend.utils.UtilsDtoMapper.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
class ReservationServiceTest {

    @Autowired
    ReservationService reservationService;
    @MockBean
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
        reserva1.setFechaSalida(LocalDateTime.of(2023,11,29,4,44,4));
        reserva1.setReservaActiva(true);
        reserva1.setSeguro(5.5);
        reserva1.setProducts(carrito);
        reserva1.setUsuario(usuario1);

        reserva2 = new Reservation();
        reserva2.setId(2l);
        reserva2.setFechaIngreso(LocalDateTime.now());
        reserva2.setFechaSalida(LocalDateTime.of(2023,11,29,5,55,55));
        reserva2.setReservaActiva(true);
        reserva2.setSeguro(5.5);
        reserva2.setProducts(carrito);
        reserva2.setUsuario(usuario1);

    }
    @Test
    @DisplayName("Deberia buscar Reserva x ID - Service")
    void findReservationById() throws Exception {
        Mockito.when(reservationRepository.findById(1l)).thenReturn(Optional.of(reserva1));
        Optional<ReservationDto> reservaBuscada = reservationService.findReservationById(1l);
        assertTrue(reservaBuscada.isPresent());

    }

    @Test
    @DisplayName("Deberia crear Reserva - Service")
    void createReservation() throws Exception {
        Mockito.when(reservationRepository.save(any(Reservation.class))).thenReturn(reserva1);
        ReservationDto reservaCreada = reservationService.createReservation(reservationToReservationDto(reserva1));
        assertTrue(Optional.of(reservaCreada).isPresent());
        assertTrue(reservaCreada.getFechaReserva().equals(reserva1.getFechaIngreso()));

    }

    @Test
    @DisplayName("Deberia actualizar Reserva x ID - Service")
    void updateReservation() throws Exception {
        Mockito.when(reservationRepository.existsById(1l)).thenReturn(true);
        Mockito.when(reservationRepository.save(any(Reservation.class))).thenReturn(reserva1);
        ReservationDto reservaUpdate = reservationService.updateReservation(1l,reservationToReservationDto(reserva1));
        assertTrue(Optional.of(reservaUpdate).isPresent());
    }

    @Test
    @DisplayName("Deberia Eliminar Reserva x ID - Service")
    void deleteReservation() {
        Mockito.when(reservationRepository.existsById(1l)).thenReturn(true);
        reservationService.deleteReservation(1l);
        verify(reservationRepository,timeout(1)).deleteById(1l);
    }

    @Test
    @DisplayName("Deberia listar reservas - Service")
    void listReservations() throws BadRequestException {
        Mockito.when(reservationRepository.findAll()).thenReturn(List.of(reserva1,reserva2));
        List<ReservationDto> reservas = reservationService.listReservations();
        assertTrue(reservas.size()==2);
    }

    @Test
    @DisplayName("Deberia listar reservas x ID de Producto - Service")
    void obtenerReservationPorIdProducto() throws Exception {
        p1.setReservations(List.of(reserva1,reserva2));
        List<ReservationDto> reservasP1 = reservationService.obtenerReservationPorIdProducto(p1.getId());
        assertTrue(reservasP1.size()==2);


    }

    @Test
    @DisplayName("Deberia listar reservas x ID de Usuario - Service")
    void obtenerReservationPorIdUsuario() throws Exception {
        Mockito.when(reservationRepository.findAllByUsuarioId(usuario1.getId())).thenReturn(List.of(reserva1,reserva2));
        List<ReservationDto> reservasUsuario1 = reservationService.obtenerReservationPorIdUsuario(usuario1.getId());
        assertTrue(reservasUsuario1.size()==2);
    }
}