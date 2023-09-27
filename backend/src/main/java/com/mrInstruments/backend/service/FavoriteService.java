package com.mrInstruments.backend.service;

import com.mrInstruments.backend.dto.ProductDto;
import com.mrInstruments.backend.entities.Favorite;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.exception.BadRequestException;
import com.mrInstruments.backend.exception.ResourceNotFoundException;
import com.mrInstruments.backend.repository.FavoriteRepository;
import com.mrInstruments.backend.repository.ProductRepository;
import com.mrInstruments.backend.repository.UserRepository;
import com.mrInstruments.backend.utils.UtilsDtoMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.mrInstruments.backend.utils.UtilsDtoMapper.productToProductDto;

@Log4j2
@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public ProductDto saveFavorite(ProductDto productDto) throws ResourceNotFoundException {

        Authentication auth = getAuth();
        Favorite favorite = new Favorite();

        User user = (User) userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("No existe usuario en BBDD"));
        favorite.setUser(user);
        boolean exiteFavorito = favorite.getUser().getFavoritos()
                .stream()
                .anyMatch(favorite1 -> favorite1.getFavorito().equals(productDto.getId()));
        if (exiteFavorito){
            throw new ResourceNotFoundException("Ya existe ese producto en los favoritos de ese usuario");
        }
        if (productRepository.existsById(productDto.getId())){
            favorite.setFavorito(productDto.getId());
        }else throw new ResourceNotFoundException("No existe ese producto en BBDD");


        favoriteRepository.save(favorite);
        return productDto;
    }

    public List<ProductDto> listarFavoritos(Long usuarioId) throws ResourceNotFoundException {
        User user = userRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("No existe usuario en BBDD asociado a ese id"));
        List<ProductDto> productDtoList = user.getFavoritos()
                .stream()
                .map(favorite -> {
                    try {
                        return productToProductDto(
                                productRepository.findById(favorite.getFavorito())
                                        .orElseThrow(()->new BadRequestException("Error al recuperar los favoritos"))
                        );
                    } catch (BadRequestException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
        return productDtoList;
    }

    public void eliminarFavorito(Long productoId) throws ResourceNotFoundException {
        Authentication auth = getAuth();
        User user = (User) userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResourceNotFoundException("No existe usuario en BBDD asociado a ese id"));
        Favorite favorito = user.getFavoritos()
                .stream()
                .filter(favorite -> favorite.getFavorito().equals(productoId))
                .findFirst().orElseThrow(()-> new ResourceNotFoundException("No existe ese producto en los favoritos del usuario"));
        favoriteRepository.deleteById(favorito.getId());
    }

    private Authentication getAuth() throws ResourceNotFoundException {
        SecurityContext context = SecurityContextHolder.getContext();

        if (context == null) {
            log.error("No security context");
            throw new ResourceNotFoundException("Error al consultar el security context");
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            log.error("No auth in security context");
            throw new ResourceNotFoundException("Usuario no autenticado");
        }
        return auth;
    }
}