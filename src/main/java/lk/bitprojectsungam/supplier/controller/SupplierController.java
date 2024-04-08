package lk.bitprojectsungam.supplier.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.bitprojectsungam.privilege.controller.PrivilegeController;
import lk.bitprojectsungam.supplier.dao.SupplierDao;
import lk.bitprojectsungam.supplier.entity.Supplier;

@RestController
@RequestMapping(value = "/supplier")
public class SupplierController {
    @Autowired
    private SupplierDao dao;

    @Autowired
    private PrivilegeController privilegeController;

    @GetMapping
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "Supplier Management : BIT Project 2024");

        viewEmp.setViewName("supplier.html");
        return viewEmp;
    }

    @GetMapping(value = "/list",produces = "application/json")
  public List<Supplier> getAllDataList() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Supplier");
        if (!logUserPrivi.get("select")) {
            return null;
        }
        return dao.List();
        // return dao.findAll();
    }



}
