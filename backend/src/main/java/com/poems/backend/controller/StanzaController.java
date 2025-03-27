package com.poems.backend.controller;

import com.poems.backend.domain.stanza.Stanza;
import com.poems.backend.domain.stanza.StanzaRequestDTO;
import com.poems.backend.service.StanzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/stanza")
public class StanzaController {

    @Autowired
    private StanzaService stanzaService;

    @PostMapping("/poem/{poemId}")
    public ResponseEntity<Stanza> addStanzasToPoem(@PathVariable UUID poemId, @RequestBody StanzaRequestDTO data) {
        Stanza stanzas = stanzaService.addStanzaToEvent(poemId, data);
        return ResponseEntity.ok(stanzas);
    }
}
