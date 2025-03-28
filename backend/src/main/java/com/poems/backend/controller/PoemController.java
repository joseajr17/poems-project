package com.poems.backend.controller;

import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemDetailsDTO;
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
import java.util.UUID;

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

    @GetMapping("/{poemId}")
    public ResponseEntity<PoemDetailsDTO> getPoemDetails(@PathVariable UUID poemId) {
        PoemDetailsDTO poemDetails = poemService.getPoemDetails(poemId);

        return ResponseEntity.ok(poemDetails);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<PoemResponseDTO>> getFilteredPoems(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "10") int size,
                                                                  @RequestParam(required = false) String title,
                                                                  @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
                                                                  @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        List<PoemResponseDTO> poems = poemService.getFilteredPoems(page, size, title, startDate, endDate);
        return ResponseEntity.ok(poems);
    }

    @PutMapping("/{poemId}")
    public ResponseEntity<Poem> updatePoem(@PathVariable UUID poemId, @RequestBody PoemRequestDTO body) {
        Poem poemUpdated = poemService.updatePoem(poemId, body);
        return ResponseEntity.ok(poemUpdated);
    }

    @DeleteMapping("/{poemId}")
    public ResponseEntity<Void> deletePoem(@PathVariable UUID poemId) {
        poemService.deletePoem(poemId);
        return ResponseEntity.noContent().build();
    }



}
