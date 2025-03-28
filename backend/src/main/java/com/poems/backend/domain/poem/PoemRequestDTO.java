package com.poems.backend.domain.poem;

import java.util.Date;

public record PoemRequestDTO(String title, String author, String content, Long date) {



}
