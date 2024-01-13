package lk.bitprojectsungam.item.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import lk.bitprojectsungam.item.dao.ItemStatusDao;
import lk.bitprojectsungam.item.entity.ItemStatus;


@RestController
@RequestMapping
public class ItemStatusController {
        @Autowired
    private ItemStatusDao dao;

    @GetMapping(value = "/itemstatus/list" , produces = "application/json")
    public List<ItemStatus> getAllItemStatus() {
        return dao.findAll();
    }
    
}
