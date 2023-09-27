package com.mrInstruments.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mrInstruments.backend.dto.ProductDto;
import com.mrInstruments.backend.dto.ReservationDto;
import com.mrInstruments.backend.entities.Category;
import com.mrInstruments.backend.entities.Product;
import com.mrInstruments.backend.entities.Reservation;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.enums.UserRol;
import com.mrInstruments.backend.repository.CategoryRepository;
import com.mrInstruments.backend.repository.ProductRepository;
import com.mrInstruments.backend.repository.ReservationRepository;
import com.mrInstruments.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;
import static com.mrInstruments.backend.utils.UtilsDtoMapper.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.ResponseEntity.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest()
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ReservationControllerTest {

    @Autowired
    private WebApplicationContext context;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserRepository userRepository;


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

        List<Product>carrito  =new ArrayList<>();
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
    @DisplayName("Deberia traer una reserva x ID - Controller")
    void getReservationById() throws Exception {
        reservationRepository.save(reserva1);
        reservationRepository.save(reserva2);

        mockMvc.perform(get("/reservas/4")
                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andReturn();

        mockMvc.perform(get("/reservas/2")
                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$").isMap())
                .andReturn();

    }

    @Test
    @DisplayName("Deberia crear una reserva -  Controller")
    void createReservation() throws Exception {
        ReservationDto reservationDto = reservationToReservationDto(reserva1);
        mockMvc.perform(post("/reservas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reservationDto))
                .characterEncoding("utf-8")).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(reservationDto)))
                .andReturn();
    }

    @Test
    @DisplayName("Deberia actualizar una reserva -  Controller")
    void updateReservation() throws Exception {
        reservationRepository.save(reserva1);
        reservationRepository.save(reserva2);

        reserva1.setFechaSalida(LocalDateTime.of(2024,11,29,4,44,4));
        mockMvc.perform(put("/reservas/1").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservationToReservationDto(reserva1)))
                        .characterEncoding("utf-8"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.fechaEntrega").value("2024-11-29@04:44:04"))
                .andReturn();


    }

    @Test
    @DisplayName("Deberia eliminar una reserva -  Controller")
    void deleteReservation() throws Exception {
        assertTrue(reservationRepository.findAll().isEmpty(), "No deberia haber elementos en la BBDD");
        reservationRepository.save(reserva1);

        assertFalse(reservationRepository.findAll().isEmpty(),"Deberia tener elementos");

        assertTrue(reservationRepository.findAll().size() == 1,"Deberia tener 1 elemento, el que guardamos");

        mockMvc.perform(delete("/reservas/1")
                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())//deberia dar response code 200 al eliminar producto con id 1
                .andReturn();

        assertTrue(reservationRepository.findAll().isEmpty(), "Luego de la llamada a la api no deberiamos tener elementos en la BBDD");

        mockMvc.perform(delete("/reservas/1")
                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isNotFound())//deberia dar response code 400 al eliminar producto con id 1
                .andReturn();
    }

    @Test
    @DisplayName("Deberia listar todas reservas -  Controller")
    void listReservations() throws Exception {
        reservationRepository.save(reserva1);
        reservationRepository.save(reserva2);

        mockMvc.perform(get("/reservas")
                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].fechaEntrega").isNotEmpty())
                .andExpect(jsonPath("$[0].fechaEntrega").isString())
                .andExpect(jsonPath("$[0].fechaEntrega").value("2023-11-29@04:44:04"))
                .andExpect(jsonPath("$[0].reservaActiva").isNotEmpty())
                .andExpect(jsonPath("$[0].reservaActiva").isBoolean())
                .andExpect(jsonPath("$[0].reservaActiva").value(true))
                .andExpect(jsonPath("$[1].fechaEntrega").isNotEmpty())
                .andExpect(jsonPath("$[1].fechaEntrega").isString())
                .andExpect(jsonPath("$[1].fechaEntrega").value("2023-11-29@05:55:55"))
                .andExpect(jsonPath("$[1].reservaActiva").isNotEmpty())
                .andExpect(jsonPath("$[1].reservaActiva").isBoolean())
                .andExpect(jsonPath("$[1].reservaActiva").value(true))
                .andReturn();



    }

    @Test
    @WithMockUser(username = "Ibis@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    @DisplayName("Deberia buscar reservas x Id Producto -  Controller")
    void buscarReservasPorIdProducto() throws Exception {
        //p1.setReservations(Set.of(reserva1,reserva2));
        reservationRepository.save(reserva1);
        reservationRepository.save(reserva2);

        mockMvc.perform(get("/reservas/producto/1")
                .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].fechaEntrega").isNotEmpty())
                .andExpect(jsonPath("$[0].fechaEntrega").isString())
                .andExpect(jsonPath("$[0].fechaEntrega").value("2023-11-29@04:44:04"))
                .andExpect(jsonPath("$[0].reservaActiva").isNotEmpty())
                .andExpect(jsonPath("$[0].reservaActiva").isBoolean())
                .andExpect(jsonPath("$[0].reservaActiva").value(true))
                .andExpect(jsonPath("$[1].fechaEntrega").isNotEmpty())
                .andExpect(jsonPath("$[1].fechaEntrega").isString())
                .andExpect(jsonPath("$[1].fechaEntrega").value("2023-11-29@05:55:55"))
                .andExpect(jsonPath("$[1].reservaActiva").isNotEmpty())
                .andExpect(jsonPath("$[1].reservaActiva").isBoolean())
                .andExpect(jsonPath("$[1].reservaActiva").value(true))
                .andReturn();


    }

    @Test
    @WithMockUser(username = "Ibis@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    @DisplayName("Deberia listar reservas x ID de Usuario - Controller")
    void buscarReservasPorIdUsuario() throws Exception {
        reservationRepository.save(reserva1);
        reservationRepository.save(reserva2);

        mockMvc.perform(get("/reservas/usuario/1")
                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").exists())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].fechaEntrega").isNotEmpty())
                .andExpect(jsonPath("$[0].fechaEntrega").isString())
                .andExpect(jsonPath("$[0].fechaEntrega").value("2023-11-29@04:44:04"))
                .andExpect(jsonPath("$[0].reservaActiva").isNotEmpty())
                .andExpect(jsonPath("$[0].reservaActiva").isBoolean())
                .andExpect(jsonPath("$[0].reservaActiva").value(true))
                .andExpect(jsonPath("$[1].fechaEntrega").isNotEmpty())
                .andExpect(jsonPath("$[1].fechaEntrega").isString())
                .andExpect(jsonPath("$[1].fechaEntrega").value("2023-11-29@05:55:55"))
                .andExpect(jsonPath("$[1].reservaActiva").isNotEmpty())
                .andExpect(jsonPath("$[1].reservaActiva").isBoolean())
                .andExpect(jsonPath("$[1].reservaActiva").value(true))
                .andReturn();

    }
}