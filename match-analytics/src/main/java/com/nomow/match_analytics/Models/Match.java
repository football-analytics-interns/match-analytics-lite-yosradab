package com.nomow.match_analytics.Models;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data  
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant date;
    private String homeTeam;
    private String awayTeam;
    private int homeScore;
    private int awayScore;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    private List<Player> players;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    private List<Event> events;
  
}