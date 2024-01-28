package lk.bitprojectsungam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lk.bitprojectsungam.employee.dao.EmployeeDao;
import lk.bitprojectsungam.employee.dao.RoleDao;
import lk.bitprojectsungam.user.dao.UserDao;
import lk.bitprojectsungam.user.entity.User;
import lk.bitprojectsungam.employee.entity.Role;

@SpringBootApplication
@RestController //
public class BitprojectsungamApplication {
	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(BitprojectsungamApplication.class, args);
		System.out.println("Hello world!");
	}

	@GetMapping(value =  "/test",produces = "application/json")
	public String testRequest(){
		return "Welcome";
	}
	@RequestMapping(value = "/testui",method = RequestMethod.GET)
	public ModelAndView testUi(){
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("dashboard.html");
		return modelAndView;
	}
	@GetMapping(value = "/createadmin")
	public String generateAdmin(){
		User existAdmin = userDao.getUserByUsername("Admin");
		if (existAdmin == null) {
			
			User adminUser = new User();
			adminUser.setUsername("Admin");
			adminUser.setEmail("admin@gmail.com");
			adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
			adminUser.setStatus(true);
			adminUser.setAdded_datetime(LocalDateTime.now());
	
			adminUser.setEmployee_id(employeeDao.getReferenceById(1));
			Set<Role> roles = new HashSet<Role>();
			roles.add(roleDao.getReferenceById(1));
	
			adminUser.setRoles(roles);
	
			userDao.save(adminUser);
		}

		return "<script> window.location.replace('http://localhost:8080/login');</script>";
	}


}
