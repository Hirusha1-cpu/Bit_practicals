package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lk.bitprojectsungam.item.dao.CategoryDao;
import lk.bitprojectsungam.item.entity.Category;

@RequestMapping
@RestController
public class CategoryController {
        @Autowired
    private CategoryDao dao;

    @GetMapping(value = "/categories/list" , produces = "application/json")
    public List<Category> getAllCategories() {
        return dao.findAll();
    }

    @GetMapping(value = "/category/listbybrand/{brandid}", produces = "application/json")
    public List<Category> getCategoryByBrand(@PathVariable("brandid") Integer brandid) {
        return dao.getByBrand(brandid);
    }
}
