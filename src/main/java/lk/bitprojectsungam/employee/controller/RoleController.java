package lk.bitprojectsungam.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// import lk.bitprojectsungam.employee.dao.DesignationDao;
import lk.bitprojectsungam.employee.dao.RoleDao;
// import lk.bitprojectsungam.employee.entity.Designation;
import lk.bitprojectsungam.employee.entity.Role;


@RestController
public class RoleController {

     @Autowired
    private RoleDao dao;

     // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/role/findall", produces = "application/json")
    public List<Role> findAll() {
        // login user authentication and authorization
        return dao.findAll();
    }
}
