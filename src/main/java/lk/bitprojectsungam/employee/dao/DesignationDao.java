package lk.bitprojectsungam.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.employee.entity.Designation;


public interface DesignationDao extends JpaRepository<Designation, Integer> {
    //
}
