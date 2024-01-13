package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import lk.bitprojectsungam.item.dao.ItemDao;
import lk.bitprojectsungam.item.entity.Item;
import lk.bitprojectsungam.privilege.controller.PrivilegeController;

@RestController
@RequestMapping
public class ItemController {
    @Autowired
    private ItemDao itemDao;

    @Autowired
    private PrivilegeController privilegeController;

    @GetMapping(value = "/item/findall", produces = "application/json" )
    public List<Item> getAllItems() {
               // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Item");
        if (!logUserPrivi.get("select")) {
            return null;
        }
        return itemDao.findAll();
    }

     @RequestMapping(value = "/item")
    public ModelAndView employeeUI() {

        ModelAndView viewEmp = new ModelAndView();
    
        viewEmp.setViewName("ItemForm.html");
        return viewEmp;
    }

    
}
