package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import lk.bitprojectsungam.item.dao.UnitTypeDao;

import lk.bitprojectsungam.item.entity.UnitType;

@RequestMapping
@RestController
public class UnitTypeController {
      @Autowired
    private UnitTypeDao dao;

    @GetMapping(value = "/unittypes/list" , produces = "application/json")
    public List<UnitType> getAllUnitTypes() {
        return dao.findAll();
    }
    

    
} 