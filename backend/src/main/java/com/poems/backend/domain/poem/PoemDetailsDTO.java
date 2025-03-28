package com.poems.backend.domain.poem;

import java.util.Date;
import java.util.UUID;

public record PoemDetailsDTO(UUID poemId, String title, String author, String content, Date date) {
}
