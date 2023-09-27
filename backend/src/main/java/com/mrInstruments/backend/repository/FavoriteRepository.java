package com.mrInstruments.backend.repository;

import com.mrInstruments.backend.entities.Favorite;

import com.mrInstruments.backend.entities.Product;
import com.mrInstruments.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findAll();
    Optional<Favorite> findById(Long id);
    Favorite save(Favorite favorite);
    void deleteById(Long id);

}
