package lk.bitprojectsungam.service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import lk.bitprojectsungam.employee.entity.Role;
import lk.bitprojectsungam.user.entity.User;
import lk.bitprojectsungam.user.dao.UserDao;

@Service
public class MyUserDetailService implements UserDetailsService {
    
    @Autowired
    private UserDao userDao;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User extUser = userDao.getUserByUsername(username);
        System.out.println(extUser.getUsername());

        Set<GrantedAuthority> userRoles = new HashSet<GrantedAuthority>();
        
        for(Role role : extUser.getRoles()){
            userRoles.add(new SimpleGrantedAuthority(role.getName()));
        }

        ArrayList<GrantedAuthority> grantedAuthorities = 
        new ArrayList<GrantedAuthority>(userRoles);

        System.out.println(grantedAuthorities);

        UserDetails user = new org.springframework.security.core.userdetails
        .User(

        extUser.getUsername(), 
        extUser.getPassword(), 
        extUser.getStatus(), 
        true, 
        true, 
        true,  
        grantedAuthorities 
        
        );
        return user;
 
    }
    
}
