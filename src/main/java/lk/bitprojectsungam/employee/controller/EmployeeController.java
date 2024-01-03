package lk.bitprojectsungam.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.transaction.Transactional;
import lk.bitprojectsungam.employee.dao.EmpStatusDao;
import lk.bitprojectsungam.employee.dao.EmployeeDao;
// import lk.bitprojectsungam.employee.entity.Designation;
import lk.bitprojectsungam.employee.entity.Employee;
import lk.bitprojectsungam.privilege.controller.PrivilegeController;
import lk.bitprojectsungam.user.dao.UserDao;
import lk.bitprojectsungam.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.HashMap;

@RestController
public class EmployeeController {

    @Autowired
    //create dao object
    private EmployeeDao dao;

    // Designation designation = new Designation();

    //create employeestatusdao object
    @Autowired
    private EmpStatusDao empStatusDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PrivilegeController privilegeController;

    // public EmployeeController(EmployeeDao dao) {
    // this.dao = dao;
    // }
    @RequestMapping(value = "/employee")
    public ModelAndView employeeUI() {
        //get user authentication object
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title","Employee Management : BIT Project 2024");

        viewEmp.setViewName("employeeModal.html");
        return viewEmp;
    }

    //create get mapping for get employee list withot user accounts
    @GetMapping(value = "/employee/listwithoutuseraccount",produces = "application/json")
    public List<Employee> getEmployeeListWithoutUserAccount(){
        return dao.getEmployeeListWithoutUserAccount();
    }

    // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/employee/findall", produces = "application/json")
    public List<Employee> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // create post mapping for save employee
    @PostMapping(value = "/employee")
    public String save(@RequestBody Employee employee) {

        try {

            //check unique value 
            //mobile no
            Employee extEmployeeMobileNo = dao.getEmployeeByMobile(employee.getMobile());
            if (extEmployeeMobileNo != null) {
                return "Save not completed :Inserted Mobile is Already Existing";
            }
            //check nic no
            Employee extEmployeeNIC = dao.getEmployeeByNIC(employee.getNic());
            if (extEmployeeNIC != null) {
                return "Save not completed :Inserted NIC is Already Existing";
            }



            employee.setAddeddatetime(LocalDateTime.now().toLocalDate());//set current date time
            String nextEmpNo = dao.getNextEmpNo();
            if (nextEmpNo.equals("") || nextEmpNo.equals(null)) {
                employee.setEmpno("00000001");
                
            } else {
                employee.setEmpno(nextEmpNo); //emp no auto generated
            }
            // designation.setName("Software Engineer");
            // dao.save(designation);
            dao.save(employee);
            // return "OK";
            return nextEmpNo;
        } catch (Exception e) {

            return "save Not Completed" + e.getMessage();
        }

    }
    @Transactional
    @DeleteMapping(value = "/employee")
    public String delete(@RequestBody Employee employee){
              //get user authentication object
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "EMPLOYEE");
        if (!logUserPrivi.get("delete")) {
            return "Delete not completed you have not privilege";
        }
        try {
            Employee extemp = dao.getReferenceById(employee.getId());
            if (extemp == null) {
                return "Delete not completed :employee not exist" ;
            }
            //hard delete
            //dao.delete(employee);
            //dao.delete(dao.gerReferenceById(employee.getId()));

            // extemp.setEmployeestatus_id(empStatusDao.getReferenceById(3));
            // extemp.setDeletedatetime(LocalDateTime.now().toLocalDate());
            // dao.save(extemp);
            // User extUser = userDao.getUserByEmployeeId(extemp.getId());
            // if(extUser != null){
            //     extUser.setStatus(false);
            //     userDao.save(extUser);
            // }
            return "OK";
        } catch (Exception e) {
        
            return "Delete Not Completed" + e.getMessage();
        }
    }
    @Transactional
    @PutMapping(value = "/employee")
    public String update(@RequestBody Employee employee){
        //need to check duplicate record
        Employee extEmployee = dao.getReferenceById(employee.getId());
        if(extEmployee == null){
            return "Update Not Completed : Employee not available..!";
        }
        Employee extEmployeeMobile = dao.getEmployeeByMobile(employee.getMobile());
        if (extEmployeeMobile != null && extEmployeeMobile.getId() != employee.getId()) {
            return "Update not completed : Mobile no already existing..!";
        }
        Employee extEmployeeNic = dao.getEmployeeByNIC(employee.getNic());
        if(extEmployeeNic != null && extEmployeeNic.getId() != employee.getId()){
            return "Update not completed : NIC no already existing..!";
        }

        try {
            employee.setLastmodifydatetime(LocalDateTime.now().toLocalDate());
            dao.save(employee);
            //check employee status and change user status
            if (employee.getEmployeestatus_id().getName().equals("Resign") || 
            employee.getEmployeestatus_id().getName().equals("Deleted")) {
                User extUser = userDao.getUserByEmployeeId(employee.getId());
                if (extUser != null) {
                    extUser.setStatus(false);
                    userDao.save(extUser);
                }
            }

            return "OK";
        } catch (Exception e) {
        
            return "Update not completed" + e.getMessage();
        }
        
    }

}

