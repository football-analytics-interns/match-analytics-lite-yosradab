package com.nomow.match_analytics.Repositories;


import com.nomow.match_analytics.Models.Player;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByMatchId(Long matchId);
}