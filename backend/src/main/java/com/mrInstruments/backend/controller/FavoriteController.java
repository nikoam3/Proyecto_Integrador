package com.mrInstruments.backend.controller;


import com.mrInstruments.backend.dto.ProductDto;
import com.mrInstruments.backend.service.FavoriteService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/favoritos")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    private static final Logger logger = LogManager.getLogger(FavoriteController.class);

    @PostMapping
    @RolesAllowed({"ROLE_ADMIN","ROLE_USER"})
    public ResponseEntity<ProductDto> guardarFavorito(@RequestBody ProductDto productDto) throws Exception {
       // System.out.println(auth.getName());
        return ResponseEntity.ok(favoriteService.saveFavorite(productDto));
    }

    @GetMapping("/usuario/{usuarioId}")
    @RolesAllowed({"ROLE_ADMIN","ROLE_USER"})
    public ResponseEntity<?> listarFavoritos(@PathVariable Long usuarioId) throws Exception {
        return ResponseEntity.ok(favoriteService.listarFavoritos(usuarioId));
    }

    @DeleteMapping("/producto/{productoId}")
    @RolesAllowed({"ROLE_ADMIN","ROLE_USER"})
    public ResponseEntity<?> eliminarFavorito(@PathVariable Long productoId) throws Exception {
        favoriteService.eliminarFavorito(productoId);
        return ResponseEntity.ok("Se elimino correctamente el producto favorito con id: "+ productoId);
    }

}
