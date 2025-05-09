package com.poems.backend.repositories;

import com.poems.backend.domain.poem.Poem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.UUID;

public interface PoemRepository extends JpaRepository<Poem, UUID> {

    @Query("SELECT p FROM Poem p " +
            "WHERE (:title IS NULL OR :title = '' OR LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
            "AND (p.date >= :startDate AND p.date <= :endDate)")
    Page<Poem> findFilteredPoems(@Param("title") String title,
                                 @Param("startDate") Date startDate,
                                 @Param("endDate") Date endDate,
                                 Pageable pageable);

}