package lk.bitprojectsungam.supplier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bitprojectsungam.supplier.dao.SupplierStatusDao;
import lk.bitprojectsungam.supplier.entity.SupplierStatus;

@RestController
public class SupplierStatusController {
      @Autowired
    private SupplierStatusDao dao;

     // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/supplierstatus/findall", produces = "application/json")
    public List<SupplierStatus> findAll() {
        // login user authentication and authorization
        return dao.findAll();
    }
}
