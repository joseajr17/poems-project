package com.poems.backend.domain.user;

import java.util.UUID;

public record UserDTO(UUID id, String login, UserRole role) {
}
