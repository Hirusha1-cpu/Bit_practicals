package lk.bitprojectsungam.user.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.bitprojectsungam.privilege.controller.PrivilegeController;
import lk.bitprojectsungam.user.dao.UserDao;
import lk.bitprojectsungam.user.entity.User;

@RestController
public class UserController {
    @Autowired
    // create dao object
    private UserDao dao;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PrivilegeController privilegeController;

    @RequestMapping(value = "/user")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "User Management : BIT Project 2024");

        viewEmp.setViewName("userModal.html");
        return viewEmp;
    }

    // create get mapping for get user all data --- [/user/findall]
    @GetMapping(value = "/user/findall", produces = "application/json")
    public List<User> findAll() {
        // login user authentication and authorization
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "USER");
        if (!logUserPrivi.get("select")) {
            return null;
        }
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // save user
    @PostMapping(value = "/user")
    public String saveUser(@RequestBody User user) {
         // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "USER");
        if (!logUserPrivi.get("insert")) {
            return "User Save Not Completed: You Haven't Permission";
        }
        // check duplicate email, username, employee
        User extUserName = dao.getUserByUsername(user.getUsername());
        if (extUserName != null) {
            return "User Save not completed yet: given username already exists";
        }

        User extUserEmployee = dao.getUserByEmployeeId(user.getEmployee_id().getId());
        if (extUserEmployee != null) {
            return "User Save not completed yet: given employee already exists";

        }

        try {
            // set automatically added datetime
            user.setAdded_datetime(LocalDateTime.now());
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            dao.save(user);
            return "OK";
        } catch (Exception e) {
            return "Save Not completed" + e.getMessage();
        }
    }

    @DeleteMapping(value = "/user")
    public String deleteUser(@RequestBody User user) {
         // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "USER");
        if (!logUserPrivi.get("delete")) {
            return "User Delete Not Completed: You Haven't Permission";
        }
        // need to check given user exist or not
        User extUser = dao.getReferenceById(user.getId());
        if (extUser == null) {
            return "User Delete Not completed : Given User Not Exist";
        }
        try {
            user.setStatus(false);
            dao.save(user);
            return "OK";
        } catch (Exception e) {

            return "User Delete Not Completed :" + e.getMessage();
        }
    }

    @PutMapping(value = "/user")
    public String updateUser(@RequestBody User user) {
           // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "USER");
        if (!logUserPrivi.get("update")) {
            return "User Update Not Completed: You Haven't Permission";
        }
        // check auth person
        User extUser = dao.getReferenceById(user.getId());
        if (extUser == null) {
            return "Update not completed : User Not Exist";
        }
        // check duplicate
        User extUsername = dao.getUserByUsername(user.getUsername());

        if (extUsername != null && !user.getId().equals(extUsername.getId())) {
            return "Update not completed : User name already exist..!";
        }
        try {
            // if(!user.getPassword().equals("")){

            // if(extUser.getPassword().equals(user.getPassword())){
            // return "Update Failed : Given password already exist";
            // }else{
            // //encrypt password

            // }
            // }else{
            // user.setPassword(extUser.getPassword());
            // }
            user.setPassword(extUser.getPassword());
            dao.save(user);
            return "OK";
        } catch (Exception e) {

            return "Update not completed" + e.getMessage();
        }
    }

}
