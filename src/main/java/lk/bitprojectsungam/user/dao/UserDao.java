package lk.bitprojectsungam.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.bitprojectsungam.user.entity.User;

public interface UserDao extends JpaRepository<User, Integer>{
    //create query for get user by given username
    @Query("select u from User u where u.username = ?1")
    public User getUserByUsername(String username);

    //create query for get user by given employee
    @Query("select u from User u where u.employee_id.id = ?1")
    public User getUserByEmployeeId(Integer id);

//     SELECT bit_or(p.sel) as sel , bit_or(p.inst) as inst, bit_or(p.upd) as upd, bit_or(p.del) as del FROM bitproject123online.privilege as p
// where p.role_id in (select uhr.role_id from bitproject123online.user_has_role as uhr 
// where uhr.user_id in (select u.id from bitproject123online.user as u where u.username="Hirusha"))
// and p.module_id in (select m.id from bitproject123online.module as m where m.name ="Employee")
    
} 