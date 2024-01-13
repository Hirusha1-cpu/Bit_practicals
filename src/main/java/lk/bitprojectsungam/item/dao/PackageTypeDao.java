package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.item.entity.PackageType;

public interface PackageTypeDao extends JpaRepository<PackageType, Integer> {

    
}