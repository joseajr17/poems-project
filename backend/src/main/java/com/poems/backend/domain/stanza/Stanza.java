package com.poems.backend.domain.stanza;

import com.poems.backend.domain.poem.Poem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name="stanza")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Stanza {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name="poem_id")
    private Poem poem;


}
