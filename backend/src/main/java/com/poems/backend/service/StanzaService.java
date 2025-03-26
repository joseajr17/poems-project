package com.poems.backend.service;

import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.stanza.Stanza;
import com.poems.backend.domain.stanza.StanzaRequestDTO;
import com.poems.backend.repositories.PoemRepository;
import com.poems.backend.repositories.StanzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StanzaService {

    @Autowired
    private StanzaRepository repository;

    @Autowired
    private PoemRepository poemRepository;

    public Stanza addStanzaToEvent(UUID poemId, StanzaRequestDTO stanzaData) {
        Poem poem = poemRepository.findById(poemId)
                .orElseThrow(() -> new IllegalArgumentException("Poem not found"));

        Stanza newStanza = new Stanza();
        newStanza.setPoem(poem);

        repository.save(newStanza);

        return newStanza;


    }

}
