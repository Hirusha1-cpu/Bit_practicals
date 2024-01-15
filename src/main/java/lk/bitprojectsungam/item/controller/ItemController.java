package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import lk.bitprojectsungam.item.dao.ItemDao;
import lk.bitprojectsungam.item.entity.Item;
import lk.bitprojectsungam.privilege.controller.PrivilegeController;
import lk.bitprojectsungam.user.dao.UserDao;
import lk.bitprojectsungam.user.entity.User;

@RestController
@RequestMapping
public class ItemController {
    @Autowired
    private ItemDao itemDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/item/findall", produces = "application/json")
    public List<Item> getAllItems() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Item");
        if (!logUserPrivi.get("select")) {
            return null;
        }
        return itemDao.findAll();
    }

    @Transactional
    @RequestMapping(value = "/item")
    public ModelAndView itemUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Item");

        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "Privilege Management : BIT Project 2024");

        if (logUserPrivi.get("insert")) {

            viewEmp.setViewName("ItemForm.html");
            return viewEmp;
        } else {
            viewEmp.setViewName("error.html");
            return viewEmp;
        }
    }

    @PostMapping(value = "/item")
    public String saveItem(@RequestBody Item item) {
        // authentication
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "Item");

        if (!logUserPrivi.get("insert")) {

            return "Save Not Complted Item : Havent permission";
        }
        // dupilicate check

        try {
            // set auto generate value
            
            item.setAddeddatetime(LocalDateTime.now().toLocalDate());
            User logedUser = userDao.getUserByUsername(auth.getName());
            item.setAdded_user_id(logedUser);
            // operator
            itemDao.save(item);
            // set dependence value
            return "OK";

        } catch (Exception e) {
            return "Save Not Complted " + e.getMessage();
        }

    }

}
