package com.poems.backend.repositories;

import com.poems.backend.domain.verse.Verse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VerseRepository extends JpaRepository<Verse, UUID> {
}
