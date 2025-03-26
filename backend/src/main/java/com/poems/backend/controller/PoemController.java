package com.poems.backend.controller;

import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemRequestDTO;
import com.poems.backend.service.PoemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/poem")
public class PoemController {

    @Autowired
    private PoemService poemService;

    @PostMapping
    public ResponseEntity<Poem> create(@RequestBody PoemRequestDTO body) {
        Poem newPoem = this.poemService.createPoem(body);
        return ResponseEntity.ok(newPoem);

    }
}
