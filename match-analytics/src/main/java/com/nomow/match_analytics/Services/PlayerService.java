package com.nomow.match_analytics.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nomow.match_analytics.DTO.PlayerSummaryDto;
import com.nomow.match_analytics.Models.Event;
import com.nomow.match_analytics.Models.Match;
import com.nomow.match_analytics.Models.Player;
import com.nomow.match_analytics.Repositories.EventRepository;
import com.nomow.match_analytics.Repositories.PlayerRepository;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final EventRepository eventRepository;

    public PlayerService(PlayerRepository playerRepository, EventRepository eventRepository) {
        this.playerRepository = playerRepository;
        this.eventRepository = eventRepository;
    }

    
    public PlayerSummaryDto getPlayerSummary(Long playerId) {
        Optional<Player> optionalPlayer = playerRepository.findById(playerId);
        if (optionalPlayer.isEmpty()) {
            throw new NoSuchElementException("Player with ID " + playerId + " not found.");
        }

        Player player = optionalPlayer.get();
        Match match = player.getMatch();
        List<Event> allEvents = match.getEvents();

        long goals = allEvents.stream()
                .filter(event -> "GOAL".equals(event.getType()) && player.getId().equals(event.getPlayerId()))
                .count();

        long assists = allEvents.stream()
                .filter(event -> "GOAL".equals(event.getType()) && event.getMeta().has("assistId"))
                .filter(event -> event.getMeta().get("assistId").asLong() == player.getId())
                .count();

        // Assuming a simple form rating based on goals and assists
        double formRating = (goals * 1.5) + assists;

        PlayerSummaryDto summary = new PlayerSummaryDto();
        summary.setName(player.getName());
        summary.setGoals((int) goals);
        summary.setAssists((int) assists);
        summary.setFormRating(formRating);

        return summary;
    }
}
