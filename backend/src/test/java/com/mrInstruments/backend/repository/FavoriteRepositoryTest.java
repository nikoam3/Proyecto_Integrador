package com.mrInstruments.backend.repository;

import com.mrInstruments.backend.entities.Category;
import com.mrInstruments.backend.entities.Favorite;
import com.mrInstruments.backend.entities.Product;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.enums.UserRol;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.objenesis.SpringObjenesis;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureMockMvc(addFilters=false)
class FavoriteRepositoryTest {

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    UserRepository userRepository;


    Favorite fav1;
    Favorite fav2;
    User usuario1;

    @BeforeEach
    @DisplayName("Cargando Data")
    void setup(){
        usuario1 = new User("Juan","Perez","jperez@gmail.com","hola123", UserRol.ROLE_USER);
        userRepository.save(usuario1);
       fav1 = new Favorite();
       fav1.setId(1l);
       fav1.setFavorito(1l);
       fav1.setUser(usuario1);

       fav2 = new Favorite();
       fav2.setId(2l);
       fav2.setFavorito(2l);
       fav2.setUser(usuario1);


    }

    @Test
    @DisplayName("Deberia listar los FAVs - Repository")
    void findAll() {

        favoriteRepository.save(fav1);
        favoriteRepository.save(fav2);

        List<Favorite> listFavs = favoriteRepository.findAll();

        assertTrue(listFavs.size()==2);
        assertFalse(listFavs.isEmpty());

    }

    @Test
    @DisplayName("Deberia buscar Favorito x ID - Repository")
    void findById() {
        favoriteRepository.save(fav1);
        Optional<Favorite> favEncontrado = favoriteRepository.findById(1l);

        assertTrue(favEncontrado.isPresent());

    }

    @Test
    @DisplayName("Deberia guardar Favorito - Repository")
    void save() {
        Favorite favGuardado = favoriteRepository.save(fav1);

        assertTrue(Optional.of(favGuardado).isPresent());
        assertTrue(favGuardado.getId().equals(1l));

    }

    @Test
    @DisplayName("Deberia eliminar Favorito x ID - Repository")
    void deleteById() {
        favoriteRepository.save(fav1);
        assertTrue(favoriteRepository.findAll().size()==1);
        favoriteRepository.deleteById(1l);
        Optional<Favorite> favEliminado = favoriteRepository.findById(1l);
        assertTrue(favEliminado.isEmpty());
    }
}