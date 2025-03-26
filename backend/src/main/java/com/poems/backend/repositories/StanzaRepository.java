package com.poems.backend.repositories;

import com.poems.backend.domain.stanza.Stanza;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StanzaRepository extends JpaRepository<Stanza, UUID> {

}
