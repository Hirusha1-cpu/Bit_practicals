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
import lk.bitprojectsungam.employee.entity.Role;
import lk.bitprojectsungam.user.entity.User;
import lk.bitprojectsungam.user.dao.UserDao;

//sampura washyen mekedi krnne user object ehekata ape theyena roles tika gratauthority kiyn authentication object eken assign krala return karana eka
@Service
public class MyUserDetailService implements UserDetailsService {
    
    //create dao instance
    @Autowired
    private UserDao userDao;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        //mekedi krnne dao eke query ekak wna getUserByUsername eka use krala username eka margyen userwa load kragnna eka
        User extUser = userDao.getUserByUsername(username);
        System.out.println(extUser.getUsername());

        //ita passe userRoles kiyla instance ekak hadagnnw array list ekak GrantedAuthorities kiyna set eke(Array set ekak)
        //grantedAuthorities kiynne, Represents an authority granted to an Authentication object.
        Set<GrantedAuthority> userRoles = new HashSet<GrantedAuthority>();
        
        //mekedi krnne userge thyena roles tika aragena eka Role entity eke role kiyna instance ekata dagnnwa
        //ita passe ara authentication object eken hadagatta userRoles kiyna arraylist ekata ape existing userge roles tika assign krnawa
        for(Role role : extUser.getRoles()){
            userRoles.add(new SimpleGrantedAuthority(role.getName()));
        }

        //ita passe grantedAuthorities kiyla arraylist ekak hadagnnwa ekata assign krnawa ape existing userge roles add krpu userRoles 
        ArrayList<GrantedAuthority> grantedAuthorities = 
        new ArrayList<GrantedAuthority>(userRoles);

        //<GrantedAuthority> == Spring Security uses this array to determine which URLs the user is authorized to access.
        //Set<GrantedAuthority> to hold the user's roles.
        System.out.println(grantedAuthorities);

        //ita passe granteAuthories kiyn arrayList ekath ekka existing userge username, password ha status eka aragena
        //eka assign kranwa UserDetail kiyn(This allows non-security related user information (such as email addresses, telephone numbers etc) to be stored in a convenient location)
        //eke user instance ekak lesa store karanwa
        //UserDetails object is created with the user's information and this set of granted authorities.
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
        //ita passe e user object eka return karanwa
        return user;
 
    }
    
}
