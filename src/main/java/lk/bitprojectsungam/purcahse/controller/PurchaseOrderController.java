package lk.bitprojectsungam.purcahse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import lk.bitprojectsungam.purcahse.dao.PurchaseOrderDao;
import lk.bitprojectsungam.purcahse.entity.PurchaseOrder;

@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDao dao;

    @GetMapping(value ="/purchase/findall" , produces = "application/json")
    public List<PurchaseOrder> getAllDate( ) {
         return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @RequestMapping(value = "/purchase")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "Purchase Management : BIT Project 2024");

        viewEmp.setViewName("purchaseModal.html");
        return viewEmp;
    }

}
