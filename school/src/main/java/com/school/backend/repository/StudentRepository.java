package com.school.backend.repository;

import com.school.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository already gives us findAll, findById, save, deleteById, existsById, etc.
    // We can add custom query methods here later, e.g.:
    // List<Student> findByGrade(Integer grade);
}
