package com.poems.backend.domain.poem;

import java.util.Date;
import java.util.UUID;

public record PoemResponseDTO(UUID id, String title, String author, Date date) {
}
