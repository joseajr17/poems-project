package com.poems.backend.domain.photo;

import org.springframework.web.multipart.MultipartFile;

public record PhotoRequestDTO(String title, MultipartFile imageFile) {
}
