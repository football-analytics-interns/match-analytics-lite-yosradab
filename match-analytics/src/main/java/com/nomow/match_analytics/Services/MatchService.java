package com.nomow.match_analytics.Services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.nomow.match_analytics.Models.Event;
import com.nomow.match_analytics.Models.Match;
import com.nomow.match_analytics.Repositories.EventRepository;
import com.nomow.match_analytics.Repositories.MatchRepository;

@Service
public class MatchService {

    private final MatchRepository matchRepository;
    private final EventRepository eventRepository;

    public MatchService(MatchRepository matchRepository, EventRepository eventRepository) {
        this.matchRepository = matchRepository;
        this.eventRepository = eventRepository;
    }

  
    public Match getMatch() {
        List<Match> matches = matchRepository.findAll();
        if (matches.isEmpty()) {
            throw new NoSuchElementException("No match data found.");
        }
        return matches.get(0);
    }

   
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }
}
