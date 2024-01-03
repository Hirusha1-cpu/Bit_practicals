package lk.bitprojectsungam.employee.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.employee.entity.EmployeeStatus;


public interface EmpStatusDao extends JpaRepository<EmployeeStatus, Integer> {
    //
}
