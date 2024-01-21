package lk.bitprojectsungam.privilege.controller;

import java.util.List;
import java.util.HashMap;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.bitprojectsungam.privilege.dao.PrivilegeDao;
import lk.bitprojectsungam.privilege.entity.Privilege;

@RestController
public class PrivilegeController {
    @Autowired
    // create dao object
    private PrivilegeDao dao;

    @RequestMapping(value = "/privilege")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "Privilege Management : BIT Project 2024");

        viewEmp.setViewName("privilegeModal.html");
        return viewEmp;
    }

    // create get mapping for get privilege all data --- [/privilege/findall]
    @GetMapping(value = "/privilege/findall", produces = "application/json")
    public List<Privilege> findAll() {
        // login user authentication and authorization
        return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @DeleteMapping(value = "/privilege")
    public String delete(@RequestBody Privilege privilege) {
        Privilege extemp = dao.getReferenceById(privilege.getId());
        if (extemp == null) {
            return "Delete not completed :privilege not exist";
        }
        try {
            // hard delete
            // dao.delete(employee);
        
            extemp.setSel(false);
            extemp.setInst(false);
            extemp.setUpd(false);
            extemp.setDel(false);

            dao.save(extemp);
            return "OK";
        } catch (Exception e) {

            return "Delete Not Completed" + e.getMessage();
        }
    }

    //create get mapping for get privilege by logged user module
    @GetMapping(value = "/privilege/bylogedusermodule/{modulename}", produces = "application/json")
    public HashMap<String, Boolean> getPrivilegeByLoggedUserModule(@PathVariable("modulename") String modulename){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return getPrivilegeByUserModule(auth.getName(), modulename);
    }

    @PostMapping(value = "/privilege" , produces = "application/json")
    public String save(@RequestBody Privilege privilege) {
        //authentication and authorization

        //duplicate
        Privilege extPrivilege = dao.getByRoleModule(privilege.getRole_id().getId(),privilege.getModule_id().getId());
        if(extPrivilege != null){
            return "Save not completed : Privilege alredy exist by given role and module";
        }

        try {
            //set auto generated value

            //oparation
            dao.save(privilege);
            return "OK";

        } catch (Exception e) {

            return "Save not completed :"+e.getMessage();
        }
     
    }

 
    //define function for get privilege by user module
    public HashMap<String, Boolean> getPrivilegeByUserModule(String username, String modulename) {
        HashMap<String, Boolean> userPrivilege = new HashMap<String, Boolean>();
        if (username.equals("Admin")) {
            userPrivilege.put("select", true);
            userPrivilege.put("insert", true);
            userPrivilege.put("update", true);
            userPrivilege.put("delete", true);
        } else {

            String userPrivi = dao.getPrivilegeByUserModule(username, modulename);
            System.out.println(userPrivi);
            String[] userPriviList = userPrivi.split(",");
            userPrivilege.put("select", userPriviList[0].equals("1"));
            userPrivilege.put("insert", userPriviList[1].equals("1"));
            userPrivilege.put("update", userPriviList[2].equals("1"));
            userPrivilege.put("delete", userPriviList[3].equals("1"));
        }
        return userPrivilege;
    }

}
