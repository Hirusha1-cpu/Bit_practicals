package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lk.bitprojectsungam.item.dao.SubCategoryDao;
import lk.bitprojectsungam.item.entity.SubCategory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
@RestController
public class SubCategoryController {
    @Autowired
    private SubCategoryDao dao;

    @GetMapping(value = "/subcategory/list" , produces = "application/json")
    public List<SubCategory> getAllSubCategories() {
        return dao.findAll();
    }
    
  
}
