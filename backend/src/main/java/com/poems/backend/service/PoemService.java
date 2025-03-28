package com.poems.backend.service;

import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemDetailsDTO;
import com.poems.backend.domain.poem.PoemRequestDTO;
import com.poems.backend.domain.poem.PoemResponseDTO;
import com.poems.backend.repositories.PoemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class PoemService {

    @Autowired
    private PoemRepository poemRepository;

    public Poem createPoem(PoemRequestDTO data) {
        Poem newPoem = new Poem();

        newPoem.setTitle(data.title());
        newPoem.setAuthor(data.author());
        newPoem.setContent(data.content());
        newPoem.setDate(new Date(data.date()));

        poemRepository.save(newPoem);

        return newPoem;
    }

    public List<PoemResponseDTO> getPoems(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Poem> poemsPage = this.poemRepository.findAll(pageable);
        return poemsPage.map(poem -> new PoemResponseDTO(poem.getId(), poem.getTitle(), poem.getAuthor(), poem.getContent(), poem.getDate()))
                .stream().toList();
    }

    public PoemDetailsDTO getPoemDetails(UUID poemId) {
        Poem poem = poemRepository.findById(poemId)
                .orElseThrow(() -> new IllegalArgumentException("Poem not found"));

        return new PoemDetailsDTO(
                poem.getId(),
                poem.getTitle(),
                poem.getAuthor(),
                poem.getContent(),
                poem.getDate());
    }

    public List<PoemResponseDTO> getFilteredPoems(int page, int size, String title, Date startDate, Date endDate) {
        title = (title != null) ? title : "";
        startDate = (startDate != null) ? startDate : new Date(0);
        endDate = (endDate != null) ? endDate : new Date();

        Pageable pageable = PageRequest.of(page, size);
        Page<Poem> poemsPage = this.poemRepository.findFilteredPoems(title, startDate, endDate, pageable);
        return poemsPage.map(poem -> new PoemResponseDTO(
                        poem.getId(),
                        poem.getTitle(),
                        poem.getAuthor(),
                        poem.getContent(),
                        poem.getDate()))
                .stream().toList();
    }

    public void deletePoem(UUID poemId) {
        this.poemRepository.delete(this.poemRepository.findById(poemId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found")));
    }
}
