package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lk.bitprojectsungam.item.dao.SubCategoryDao;
import lk.bitprojectsungam.item.entity.SubCategory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping
@RestController
public class SubCategoryController {
    @Autowired
    private SubCategoryDao dao;

    @GetMapping(value = "/subcategory/list" , produces = "application/json")
    public List<SubCategory> getAllSubCategories() {
        return dao.findAll();
    }

    //define mapping for get subcategory by given category id
    @GetMapping(value = "/subcategory/listbycategory", params={"categoryid"}, produces="application/json")
    public List<SubCategory> getAllSubCategoriesByCategory(@RequestParam("categoryid") Integer categoryid){
        return dao.getByCategory(categoryid);
    }
    
    
  
}
