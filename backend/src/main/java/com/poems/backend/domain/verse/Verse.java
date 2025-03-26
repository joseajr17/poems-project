package com.poems.backend.domain.verse;

import com.poems.backend.domain.stanza.Stanza;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name="verse")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Verse {

    @Id
    @GeneratedValue
    private UUID id;
    private String line;

    @ManyToOne
    @JoinColumn(name="stanza_id")
    Stanza stanza;

}
