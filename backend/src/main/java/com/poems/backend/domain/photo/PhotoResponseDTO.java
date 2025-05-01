package com.poems.backend.domain.photo;

import java.util.UUID;

public record PhotoResponseDTO(UUID id, String title, String url) {
}
