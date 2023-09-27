package com.mrInstruments.backend.repository;

import com.mrInstruments.backend.entities.*;
import com.mrInstruments.backend.enums.UserRol;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@AutoConfigureMockMvc(addFilters=false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ReviewRepositoryTest {

    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;




    Review review;
    Review review2;
    User usuario1;
    Product p1;
    Category cat1;

    @BeforeEach
    @DisplayName("Cargando Data")
    void setup(){
        cat1 = new Category("Cordofonos","vibracion de cuerdas","url-img");
        categoryRepository.save(cat1);
        p1 = new Product("Guitarra Electrica","descrip","url-img",350.0,cat1);
        productRepository.save(p1);
        usuario1 = new User("Juan","Perez","jperez@gmail.com","hola123", UserRol.ROLE_USER);
        userRepository.save(usuario1);

        review = new Review();
            review.setId(1l);
            review.setComentario("Comentario");
            review.setUsuario(usuario1);
            review.setProduct(p1);
            review.setValoracion(4);
            review.setFechaPublicacion(LocalDate.now());
            review.setNombreUsuario("jperez");

        review2 = new Review();
        review2.setId(2l);
        review2.setComentario("Comentario2");
        review2.setUsuario(usuario1);
        review2.setProduct(p1);
        review2.setValoracion(5);
        review2.setFechaPublicacion(LocalDate.now());
        review2.setNombreUsuario("Alfonso");
    }

    @Test
    void findAll() {
        reviewRepository.save(review);
        reviewRepository.save(review2);

        List<Review> listReviews = reviewRepository.findAll();

        assertTrue(listReviews.size()==2);
        assertFalse(listReviews.isEmpty());



    }

    @Test
    @DisplayName("Deberia buscar Review x ID - Repository")
    void findById() {
        reviewRepository.save(review);
        Optional<Review> reviewEncontrada = reviewRepository.findById(review.getId());
        assertTrue(reviewEncontrada.isPresent());
    }

    @Test
    @DisplayName("Deberia guardar Review - Repository")
    void save() {
        Review reviewGuardada = reviewRepository.save(review);
        assertTrue(Optional.of(reviewGuardada).isPresent());
    }

    @Test
    @DisplayName("Deberia eliminar Review x ID - Repository")
    void deleteById() {
        reviewRepository.save(review);
        assertTrue(reviewRepository.findAll().size()==1);
        reviewRepository.deleteById(1l);
        Optional<Review> ReviewEliminada = reviewRepository.findById(1l);
        assertTrue(ReviewEliminada.isEmpty());
    }

    @Test
    @DisplayName("Deberia buscar todas las Review x  Product ID - Repository")
    void findAllByProductId() {
        reviewRepository.save(review);
        reviewRepository.save(review2);

        List<Review> listReviews = reviewRepository.findAllByProductId(p1.getId());

        assertTrue(listReviews.size()==2);
    }
}