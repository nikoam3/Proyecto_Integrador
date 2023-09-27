package com.mrInstruments.backend.service;

import com.mrInstruments.backend.entities.Stock;
import com.mrInstruments.backend.repository.StockRepository;
import org.apache.catalina.LifecycleState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@ExtendWith(MockitoExtension.class)
class StockServiceTest {

    @Autowired
    StockService stockService;
    @MockBean
    StockRepository stockRepository;

    Stock stockProducto1;

    @BeforeEach
    @DisplayName("Cargando Data..")
    void setup(){
        stockProducto1 = new Stock();
        stockProducto1.setId(1l);
        stockProducto1.setCantidad(25);
    }
    @Test
    @DisplayName("Deberia guardar stock - Service")
    void saveStock() {
        Mockito.when(stockRepository.save(stockProducto1)).thenReturn(stockProducto1);
        Stock stockGuardado = stockService.saveStock(stockProducto1);

        assertTrue(Optional.of(stockGuardado).isPresent());
    }

    @Test
    @DisplayName("Deberia Listar stock - Service")
    void listStock() {
        Mockito.when(stockRepository.findAll()).thenReturn(List.of(stockProducto1));

        List<Stock> stockList = stockService.listStock();

        assertTrue(stockList.size()==1);


    }
}