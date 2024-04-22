package com.example.testeditions.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AnnonceColocation implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String adresse;
    private int nbr_chambres;
    private int superficie;
    @Enumerated(EnumType.STRING)
    private TypeLocal type;
    private String description;
    private Status status;
    @Temporal(TemporalType.DATE)
    private Date date_annonce;
    private String image;
    private float prix;
    private int dislike;
    private int llike;
    private int nombreVues;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Contract> contracts;

    @OneToMany(mappedBy = "annoncecolocation", cascade = CascadeType.ALL)
    private List<Preferences> preferences;

    @ManyToOne
    User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="annoncecolocation")
    private List<ReservationColoc> reservationColocs;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="annoncecolocation")
    private List<Comment> Comments;


}