package com.nomow.match_analytics.seed;

import java.io.InputStream;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nomow.match_analytics.Models.Event;
import com.nomow.match_analytics.Models.Match;
import com.nomow.match_analytics.Models.Player;
import com.nomow.match_analytics.Repositories.EventRepository;
import com.nomow.match_analytics.Repositories.MatchRepository;
import com.nomow.match_analytics.Repositories.PlayerRepository;

@Component
public class DataSeeder implements CommandLineRunner {
    private final MatchRepository matchRepository;
    private final PlayerRepository playerRepository;
    private final EventRepository eventRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(MatchRepository matchRepository, PlayerRepository playerRepository, EventRepository eventRepository, ObjectMapper objectMapper) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
        this.eventRepository = eventRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (matchRepository.count() == 0) {  // Seed only if empty
            InputStream is = getClass().getResourceAsStream("/seed/match.json");
            Map<String, Object> jsonData = objectMapper.readValue(is, Map.class);

            Map<String, Object> matchData = (Map<String, Object>) jsonData.get("match");
           
            Match match = new Match();
            match.setDate(Instant.parse((String) matchData.get("date")));
            match.setHomeTeam((String) matchData.get("homeTeam"));
            match.setAwayTeam((String) matchData.get("awayTeam"));
            match.setHomeScore((Integer) matchData.get("homeScore"));
            match.setAwayScore((Integer) matchData.get("awayScore"));
            
            // Fix: Capture the returned, managed entity from the save operation
            Match savedMatch = matchRepository.save(match);

            // Parse players
            List<Map<String, Object>> playersData = (List<Map<String, Object>>) jsonData.get("players");
            for (Map<String, Object> p : playersData) {
               
                Player player = new Player();
            
                player.setName((String) p.get("name"));
                player.setTeam((String) p.get("team"));
                player.setPosition((String) p.get("position"));
                
                // Use the managed entity
                player.setMatch(savedMatch);
                playerRepository.save(player);
            }

            // Parse events
            List<Map<String, Object>> eventsData = (List<Map<String, Object>>) jsonData.get("events");
            for (Map<String, Object> e : eventsData) {
                Event event = new Event();
                event.setMinute((Integer) e.get("minute"));
                event.setType((String) e.get("type"));
                // Fix: The playerId is an Integer in Event.java, not a Long.
                event.setPlayerId((long) ((Number) e.get("playerId")).intValue());
                event.setMeta(objectMapper.valueToTree(e.get("meta")));  // As JsonNode
                
                // Use the managed entity
                event.setMatch(savedMatch);
                eventRepository.save(event);
            }
        }
    }
}
