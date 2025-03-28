package com.poems.backend.controller;

import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemRequestDTO;
import com.poems.backend.domain.poem.PoemResponseDTO;
import com.poems.backend.service.PoemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<PoemResponseDTO>> getPoems(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size) {
        List<PoemResponseDTO> allPoems = this.poemService.getPoems(page, size);
        return ResponseEntity.ok(allPoems);
    }
}
