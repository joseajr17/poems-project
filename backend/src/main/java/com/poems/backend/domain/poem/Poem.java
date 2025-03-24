package com.poems.backend.domain.poem;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Table(name = "poem")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Poem {
    @Id
    @GeneratedValue
    private UUID id;
    private String title;
    private String text;
    private String author;
    private Date date;
}