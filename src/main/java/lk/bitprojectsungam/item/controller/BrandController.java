package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lk.bitprojectsungam.item.dao.BrandDao;
import lk.bitprojectsungam.item.entity.Brand;

@RestController
@RequestMapping
public class BrandController {
        @Autowired
    private BrandDao dao;

    @GetMapping(value = "/brands/list" , produces = "application/json")
    public List<Brand> getAllBrands() {
        return dao.findAll();
    }
    
}
