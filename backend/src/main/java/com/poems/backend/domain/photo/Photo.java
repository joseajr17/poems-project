package com.poems.backend.domain.photo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "photo")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    @Id
    @GeneratedValue
    private UUID id;
    private String title;
    private String url;
}
