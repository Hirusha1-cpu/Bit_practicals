package lk.bitprojectsungam.privilege.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lk.bitprojectsungam.privilege.dao.ModuleDao;


@RestController
public class ModuleController {

    @Autowired
    // create dao object
    private ModuleDao dao;

      // create get mapping for get module all data --- [/module/findall]
    @GetMapping(value = "/module/findall", produces = "application/json")
    public List<lk.bitprojectsungam.privilege.entity.Module> findAll() {
        // login user authentication and authorization
        return dao.findAll();
    }

    //get mapping for get module darta by given role id [/module/listbyrole?roleid=1]
    @GetMapping(value = "/module/listbyrole", params = {"roleid"})
    public List<lk.bitprojectsungam.privilege.entity.Module> getByRole(@RequestParam("roleid") Integer roleid){
      return dao.getModuleByRole(roleid);
    }

    

}
