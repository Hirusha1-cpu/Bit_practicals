package lk.bitprojectsungam.purcahse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lk.bitprojectsungam.purcahse.dao.PurchaseStatusDao;
import lk.bitprojectsungam.purcahse.entity.PurchaseStatus;

@RestController
public class PurchaseStatusController {
          @Autowired
           private PurchaseStatusDao dao;

     // create get mapping for get empllyee all data --- [/employee/findall]
    @GetMapping(value = "/purcahsestatus/findall", produces = "application/json")
    public List<PurchaseStatus> findAll() {
        // login user authentication and authorization
        return dao.findAll();
    }
}
