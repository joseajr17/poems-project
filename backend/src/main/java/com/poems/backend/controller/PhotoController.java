package com.poems.backend.controller;

import com.poems.backend.domain.photo.Photo;
import com.poems.backend.domain.photo.PhotoRequestDTO;
import com.poems.backend.domain.photo.PhotoResponseDTO;
import com.poems.backend.domain.poem.Poem;
import com.poems.backend.domain.poem.PoemRequestDTO;
import com.poems.backend.domain.poem.PoemResponseDTO;
import com.poems.backend.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Photo> create(@RequestParam("title") String title,
                                        @RequestParam(value = "image")MultipartFile image) {
        PhotoRequestDTO photoRequestDTO = new PhotoRequestDTO(title, image);
        Photo newPhoto = this.photoService.createPhoto(photoRequestDTO);
        return ResponseEntity.ok(newPhoto);
    }

    @GetMapping
    public ResponseEntity<List<PhotoResponseDTO>> getPhotos() {

        List<PhotoResponseDTO> allPoems = this.photoService.getPhotos();
        return ResponseEntity.ok(allPoems);
    }
}
