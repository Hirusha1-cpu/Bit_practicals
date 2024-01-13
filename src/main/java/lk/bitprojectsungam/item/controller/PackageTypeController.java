package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bitprojectsungam.item.dao.PackageTypeDao;
import lk.bitprojectsungam.item.entity.PackageType;

import java.util.*;

@RestController
@RequestMapping
public class PackageTypeController {
        @Autowired
    private PackageTypeDao dao;

    @GetMapping(value = "/packagetype/list" , produces = "application/json")
    public List<PackageType> getAllPackages() {
        return dao.findAll();
    }
    
}
