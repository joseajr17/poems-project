package com.poems.backend.repositories;

import com.poems.backend.domain.poem.Poem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PoemRepository extends JpaRepository<Poem, UUID> {
    
}
