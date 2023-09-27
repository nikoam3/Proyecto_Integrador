package com.mrInstruments.backend.service;

import com.mrInstruments.backend.dto.ReviewDto;
import com.mrInstruments.backend.entities.Category;
import com.mrInstruments.backend.entities.Product;
import com.mrInstruments.backend.entities.Review;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.enums.UserRol;
import com.mrInstruments.backend.exception.BadRequestException;
import com.mrInstruments.backend.repository.CategoryRepository;
import com.mrInstruments.backend.repository.ProductRepository;
import com.mrInstruments.backend.repository.ReviewRepository;
import com.mrInstruments.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;

import static com.mrInstruments.backend.utils.UtilsDtoMapper.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ReviewServiceTest {

    @Autowired
    ReviewService reviewService;
    @MockBean
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
    @DisplayName("Deberia Listar las resenas - Service")
    void getAllReviews() throws Exception {
        Mockito.when(reviewRepository.findAll()).thenReturn(List.of(review,review2));
        List<ReviewDto> listaResenas = reviewService.getAllReviews();
        assertTrue(listaResenas.size()==2);
        assertTrue(Optional.of(listaResenas).isPresent());
    }

    @Test
    @DisplayName("Deberia obtener resena x Id - Service")
    void getReviewById() throws Exception {
        Mockito.when(reviewRepository.findById(review.getId())).thenReturn(Optional.of(review));
        Optional<ReviewDto> reviewEncontrada = reviewService.getReviewById(review.getId());
        assertTrue(reviewEncontrada.isPresent());
        assertTrue(reviewEncontrada.get().getComentario().equals(review.getComentario()));
    }

    @Test
    @DisplayName("Deberia guardar resena - Service")
    void createReview() throws Exception {

        lenient().when(reviewRepository.save(any(Review.class))).thenReturn(review);

        ReviewDto reviewGuardada = reviewService.createReview(reviewToReviewDto(review));

        assertTrue(Optional.of(reviewGuardada).isPresent());
        assertTrue(reviewGuardada.getComentario().equals(review.getComentario()));

    }

    @Test
    @DisplayName("Deberia eliminar resena - Service")
    void deleteReview() throws BadRequestException {
        willDoNothing().given(reviewRepository).deleteById(review.getId());
        reviewService.deleteReview(review.getId());

        verify(reviewRepository,timeout(1)).deleteById(review.getId());
    }

    @Test
    @DisplayName("Deberia actualizar resena - Service")
    void updateReview() throws Exception {

        lenient().when(reviewRepository.save(any(Review.class))).thenReturn(review);
        lenient().when(reviewRepository.existsById(review.getId())).thenReturn(true);

        ReviewDto reviewActualizada = reviewService.updateReview(review.getId(),reviewToReviewDto(review));

        assertTrue(reviewActualizada.getComentario().equals("Comentario"));
        review.setComentario("Comentario Actualizado");
        lenient().when(reviewRepository.save(any(Review.class))).thenReturn(review);
        reviewActualizada = reviewService.updateReview(review.getId(),reviewToReviewDto(review));
        assertTrue(reviewActualizada.getComentario().equals("Comentario Actualizado"));
    }

    @Test
    @DisplayName("Deberia Listar las resenas por Id de producto - Service")
    void obtenerReviewPorIdProducto() {
        given(reviewRepository.findAllByProductId(p1.getId())).willReturn(List.of(review,review2));

        List<ReviewDto> listadoReview = reviewService.obtenerReviewPorIdProducto(p1.getId());

        assertTrue(listadoReview.size()==2);
    }
}