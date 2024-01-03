package lk.bitprojectsungam.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;

// import lk.bitprojectsungam.employee.entity.Designation;
import lk.bitprojectsungam.employee.entity.Role;


public interface RoleDao extends JpaRepository<Role, Integer> {
    //
}
