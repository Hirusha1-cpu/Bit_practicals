package lk.bitprojectsungam.supplier.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class SupplierController {
    @RequestMapping(value = "/supplier")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "Supplier Management : BIT Project 2024");

        viewEmp.setViewName("supplier.html");
        return viewEmp;
    }
}
