package com.poems.backend.domain.user;

public record LoginResponseDTO(String token, UserDTO userDTO) {
}
