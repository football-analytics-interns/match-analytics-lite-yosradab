package com.nomow.match_analytics.Controllers;

import java.net.URI;
import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nomow.match_analytics.DTO.PlayerSummaryDto;
import com.nomow.match_analytics.Models.Event;
import com.nomow.match_analytics.Models.Match;
import com.nomow.match_analytics.Services.MatchService;
import com.nomow.match_analytics.Services.PlayerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") 
public class MatchController {

    private final MatchService matchService;
    private final PlayerService playerService;

    public MatchController(MatchService matchService, PlayerService playerService) {
        this.matchService = matchService;
        this.playerService = playerService;
    }

    /**
     * Endpoint to get a single match.
     * @return A ResponseEntity with the Match object and HTTP status OK.
     */
    @GetMapping("/match")
    public ResponseEntity<Match> getMatch() {
        return ResponseEntity.ok(matchService.getMatch());
    }

    /**
     * Endpoint to add a new event.
     * @param event The Event object to be added.
     * @return A ResponseEntity with the location of the newly created event.
     */
    @PostMapping("/event")
    public ResponseEntity<Void> addEvent(@Valid @RequestBody Event event) {
        Event newEvent = matchService.addEvent(event);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newEvent.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    /**
     * Endpoint to get a summary for a specific player.
     * @param id The ID of the player.
     * @return A ResponseEntity with the PlayerSummaryDto and HTTP status OK.
     */
    @GetMapping("/player/{id}")
    public ResponseEntity<PlayerSummaryDto> getPlayerSummary(@PathVariable Long id) {
        try {
            PlayerSummaryDto summary = playerService.getPlayerSummary(id);
            return ResponseEntity.ok(summary);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
