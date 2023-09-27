package com.mrInstruments.backend.service;

import com.mrInstruments.backend.dto.ProductDto;
import com.mrInstruments.backend.entities.*;
import com.mrInstruments.backend.enums.UserRol;
import com.mrInstruments.backend.exception.ResourceNotFoundException;
import com.mrInstruments.backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.mrInstruments.backend.utils.UtilsDtoMapper.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
class FavoriteServiceTest {
    @Autowired
    FavoriteService favoriteService;
    @MockBean
    FavoriteRepository favoriteRepository;
    @MockBean
    UserRepository userRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CharacteristicRepository characteristicRepository;
    @Autowired
    ProductRepository productRepository;
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

        fav1 = new Favorite();
        fav1.setId(p1.getId());
        fav1.setFavorito(1l);
        fav1.setUser(usuario1);

        fav2 = new Favorite();
        fav2.setId(p2.getId());
        fav2.setFavorito(2l);
        fav2.setUser(usuario1);


        usuario1.setFavoritos(Set.of(fav2));
        userRepository.save(usuario1);



    }

    @Test
    @WithMockUser(username = "Ibis@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    @DisplayName("Deberia guardar Favorito - Service")
    void saveFavorite() throws ResourceNotFoundException {
        lenient().when(favoriteRepository.save(any(Favorite.class))).thenReturn(fav1);
        Mockito.when(userRepository.findByEmail(any())).thenReturn(Optional.of(usuario1));
        ProductDto productFav = favoriteService.saveFavorite(productToProductDto(p1));
        assertTrue(productFav.getNombre().equals(p1.getNombre()));

    }

    @Test
    @DisplayName("Deberia Listar los productos favoritos - Service")
    void listarFavoritos() throws ResourceNotFoundException {
        Mockito.when(userRepository.findById(usuario1.getId())).thenReturn(Optional.of(usuario1));


        List<ProductDto> favoritos = favoriteService.listarFavoritos(usuario1.getId());

        assertTrue(favoritos.size()==1);
        assertTrue(favoritos.get(0).getNombre().equals("Guitarra Criolla"));
    }

    @Test
    @WithMockUser(username = "Ibis@gmail.com", password = "$2a$10$jRASmaRhW4AJGRR66cQja.BiEGB8VrEpepduYpSdQnT8WNJF81obi", roles = "ADMIN")
    @DisplayName("Deberia eliminar favorito - Service")
    void eliminarFavorito() throws ResourceNotFoundException {
        Mockito.when(userRepository.findByEmail(any())).thenReturn(Optional.of(usuario1));
        willDoNothing().given(favoriteRepository).deleteById(2l);

        favoriteService.eliminarFavorito(2l);

        verify(favoriteRepository,timeout(1)).deleteById(2l);



    }
}