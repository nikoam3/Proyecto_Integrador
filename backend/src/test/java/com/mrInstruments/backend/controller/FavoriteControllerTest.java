package com.mrInstruments.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mrInstruments.backend.entities.*;
import com.mrInstruments.backend.enums.UserRol;
import com.mrInstruments.backend.exception.ResourceNotFoundException;
import com.mrInstruments.backend.repository.CategoryRepository;
import com.mrInstruments.backend.repository.CharacteristicRepository;
import com.mrInstruments.backend.repository.ProductRepository;
import com.mrInstruments.backend.repository.UserRepository;
import com.mrInstruments.backend.service.FavoriteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

import static com.mrInstruments.backend.utils.UtilsDtoMapper.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.http.RequestEntity.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest()
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
class FavoriteControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    FavoriteService favoriteService;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CharacteristicRepository characteristicRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;

    Favorite fav1;
    Favorite fav2;
    User usuario1;
    private Product p1;
    private Product p2;
    private Category cat1;
    private Characteristic char2;

    @BeforeEach
    @DisplayName("Cargando Data")
    void setup(){
        char2 = new Characteristic("Liviano","url-img");
        characteristicRepository.save(char2);
        cat1 = new Category("Cordofonos","vibracion de cuerdas","url-img");
        categoryRepository.save(cat1);
        p1 = new Product("Guitarra Electrica","descrip","url-img",350.0,cat1);
        p2 = new Product("Guitarra Criolla","descrip","url-img",200.0,cat1);

        p1.setCharacteristics(Set.of(char2));
        p2.setCharacteristics(Set.of(char2));
        p1.setId(1l);
        p2.setId(2l);

        productRepository.save(p1);
        productRepository.save(p2);
        usuario1 = new User("Juan","Perez","jperez@gmail.com","hola123", UserRol.ROLE_USER);


        userRepository.save(usuario1);



    }

    @Test
    @DisplayName("Deberia guardar Favorito - Controller")
    @WithMockUser(username = "jperez@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    void guardarFavorito() throws Exception {
        mockMvc.perform(post("/favoritos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productToProductDto(p1)))
                        .characterEncoding("utf-8")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(productToProductDto(p1))))
                .andReturn();


    }

    @Test
    @DisplayName("Deberia Listar los productos favoritos - Service")
    @WithMockUser(username = "jperez@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    void listarFavoritos() throws Exception {
//        favoriteService.saveFavorite(productToProductDto(p1));
//        favoriteService.saveFavorite(productToProductDto(p2));
//
//
//        mockMvc.perform(get("/favoritos/1")
//                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(jsonPath("$").exists())
//                .andExpect(jsonPath("$").isArray())
//                .andExpect(jsonPath("$[0].nombre").isNotEmpty())
//                .andExpect(jsonPath("$[0].nombre").isString())
//                .andExpect(jsonPath("$[0].nombre").value("Guitarra Electrica"))
//                .andExpect(jsonPath("$[0].descripcion").isNotEmpty())
//                .andExpect(jsonPath("$[0].descripcion").isString())
//                .andExpect(jsonPath("$[0].descripcion").value("descrip"))
//                .andExpect(jsonPath("$[1].nombre").isNotEmpty())
//                .andExpect(jsonPath("$[1].nombre").isString())
//                .andExpect(jsonPath("$[1].nombre").value("Guitarra Criolla"))
//                .andExpect(jsonPath("$[1].descripcion").isNotEmpty())
//                .andExpect(jsonPath("$[1].descripcion").isString())
//                .andExpect(jsonPath("$[1].descripcion").value("descrip"))
//                .andReturn();
    }

    @Test
    @DisplayName("Deberia eliminar favorito -  Controller")
    @WithMockUser(username = "jperez@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    void eliminarFavorito() throws Exception {
//        assertTrue(favoriteService.listarFavoritos(usuario1.getId()).isEmpty());
//        favoriteService.saveFavorite(productToProductDto(p1));
//        assertFalse(favoriteService.listarFavoritos(usuario1.getId()).isEmpty(),"Deberia tener elementos");
//        mockMvc.perform(delete("/favoritos/producto/1")
//                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
//                .andExpect(status().isOk())//deberia dar response code 200 al eliminar producto con id 1
//                .andReturn();
//
//        assertTrue(productRepository.findAll().isEmpty(), "Luego de la llamada a la api no deberiamos tener elementos en la BBDD");
//
//        mockMvc.perform(delete("/favoritos/producto/1")
//                        .accept(MediaType.APPLICATION_JSON)).andDo(print())
//                .andExpect(status().isBadRequest())//deberia dar response code 400 al eliminar producto con id 1
//                .andReturn();
//

    }
}