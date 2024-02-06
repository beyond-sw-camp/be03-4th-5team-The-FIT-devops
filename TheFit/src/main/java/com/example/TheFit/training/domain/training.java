package com.example.TheFit.training.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class training {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private int reps;
    private String target;
    private int weight;
    private String restTime;
    private int performance;
    private int set;

}
