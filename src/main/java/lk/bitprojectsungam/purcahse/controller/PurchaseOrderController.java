package lk.bitprojectsungam.purcahse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.time.LocalDateTime;
import java.util.*;

import lk.bitprojectsungam.privilege.controller.PrivilegeController;
import lk.bitprojectsungam.purcahse.dao.PurchaseOrderDao;
import lk.bitprojectsungam.purcahse.entity.PurchaseOrder;
import lk.bitprojectsungam.purcahse.entity.PurchaseOrderHasItem;
import lk.bitprojectsungam.user.dao.UserDao;

@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDao dao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao daoUser;

    @GetMapping(value ="/purchase/findall" , produces = "application/json")
    public List<PurchaseOrder> getAllDate( ) {
         return dao.findAll(Sort.by(Direction.DESC, "id"));
    }

    @RequestMapping(value = "/purchase")
    public ModelAndView employeeUI() {
        // get user authentication object
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView viewEmp = new ModelAndView();
        viewEmp.addObject("logusername", auth.getName());
        viewEmp.addObject("title", "Purchase Management : BIT Project 2024");

        viewEmp.setViewName("purchaseModal.html");
        return viewEmp;
    }

    @PostMapping(value = "/purchase")
    public String savePurchase(@RequestBody PurchaseOrder porder) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String, Boolean> logUserPrivi = privilegeController.getPrivilegeByUserModule(auth.getName(), "PurchaseOrder");
        if (!logUserPrivi.get("insert")) {
            return "Porder Not Completed: You Haven't Permission";
        }
        try {
            porder.setAddeduser(daoUser.getUserByUsername(auth.getName()).getId());
            porder.setAddeddatetime(LocalDateTime.now().toLocalDate());
            porder.setPurchaseordercode("2000002");
            dao.save(porder);

            for(PurchaseOrderHasItem pohi : porder.getPurchaseOrderHasItemList()){
                pohi.setPurchaseorder_id(porder);
            }

            return "OK";
        } catch (Exception e) {
            // TODO: handle exception
            return "ERROR"+ e.getMessage();
        }
    }


}
