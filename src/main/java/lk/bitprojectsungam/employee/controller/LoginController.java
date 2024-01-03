package lk.bitprojectsungam.employee.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {
    @GetMapping(value = "/login")
    public ModelAndView loginUI(){
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login.html");
        return loginView;
    }
    @GetMapping(value = "/error")
     public ModelAndView errorUI(){
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("error.html");
        return loginView;
    }
    @GetMapping(value = "/index")
     public ModelAndView indexUI(){
        //get user authentication object
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        ModelAndView loginView = new ModelAndView();
        loginView.addObject("logusername", auth.getName());
        loginView.addObject("title","DashBoard : BIT Project 2024");

        loginView.setViewName("index.html");
        return loginView;
    }

}
