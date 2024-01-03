package lk.bitprojectsungam.privilege.dao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.bitprojectsungam.privilege.entity.Module;

public interface ModuleDao extends JpaRepository<Module, Integer> {

    @Query("select m from Module m where m.id not in (select p.module_id.id from Privilege p where p.role_id.id=?1)")
    public List<Module> getModuleByRole(Integer roleid);
    
} 