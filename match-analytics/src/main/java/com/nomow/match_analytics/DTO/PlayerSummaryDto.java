package com.nomow.match_analytics.DTO;

import lombok.Data;

@Data
public class PlayerSummaryDto {
    private String name;
    private int goals;
    private int assists;
    private double formRating;
}
