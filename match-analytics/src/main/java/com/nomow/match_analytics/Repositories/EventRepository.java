package com.nomow.match_analytics.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nomow.match_analytics.Models.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
   
}
