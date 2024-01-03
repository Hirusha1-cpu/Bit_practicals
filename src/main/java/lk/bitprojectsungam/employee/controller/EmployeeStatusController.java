package lk.bitprojectsungam.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bitprojectsungam.employee.dao.EmpStatusDao;
import lk.bitprojectsungam.employee.entity.EmployeeStatus;

@RestController
public class EmployeeStatusController {
      @Autowired
    private EmpStatusDao dao;

     // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/empstatus/findall", produces = "application/json")
    public List<EmployeeStatus> findAll() {
        // login user authentication and authorization
        return dao.findAll();
    }
}
