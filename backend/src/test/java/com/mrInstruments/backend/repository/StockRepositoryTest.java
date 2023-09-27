package com.mrInstruments.backend.repository;

import com.mrInstruments.backend.entities.Stock;
import com.mrInstruments.backend.entities.User;
import com.mrInstruments.backend.enums.UserRol;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@AutoConfigureMockMvc(addFilters = false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class StockRepositoryTest {

    @Autowired
    StockRepository stockRepository;

    Stock stock;

    @BeforeEach
    @DisplayName("Cargando Data..")
    void setup(){
        stock = new Stock();
            stock.setId(1l);
            stock.setCantidad(25);
    }
    @Test
    void save() {
        Stock stockGuardado = stockRepository.save(stock);
        assertTrue(Optional.of(stockGuardado).isPresent());

    }

    @Test
    void findById() {
        stockRepository.save(stock);
        Optional<Stock> stockBuscado = stockRepository.findById(1l);
        assertTrue(stockBuscado.isPresent());
    }

    @Test
    void findAll() {
        stockRepository.save(stock);
        List<Stock> listStock = stockRepository.findAll();
        assertTrue(listStock.size() == 1);
    }
}