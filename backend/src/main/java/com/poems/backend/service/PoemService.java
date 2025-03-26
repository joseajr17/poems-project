package com.poems.backend.service;

import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemRequestDTO;
import com.poems.backend.repositories.PoemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PoemService {

    @Autowired
    private PoemRepository repository;

    public Poem createPoem(PoemRequestDTO data) {
        Poem newPoem = new Poem();

        newPoem.setTitle(data.title());
        newPoem.setAuthor(data.author());
        newPoem.setDate(new Date(data.date()));

        repository.save(newPoem);

        return newPoem;
    }
}
