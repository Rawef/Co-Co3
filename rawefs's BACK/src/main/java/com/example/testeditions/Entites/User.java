package com.example.testeditions.Entites;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String nom ;
    private String email;
    private String password;
    private int telephone;
    private String rating;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_inscription")
    private Date dateInscription;

    @Enumerated(EnumType.STRING)
    private TypeRole role;

    @Enumerated(EnumType.STRING)
    private GenreType Genre;

    private Boolean connected = false;
    private boolean banned = false;
    private boolean verified=false;

    @Column(name = "verification_token")
    private String verificationToken;

    @OneToMany
    private Set<Authority> authorities;

    private LocalDateTime banExpiration;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL )
    private List<Preferences> preferences;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL )
    private List<ReservationCov> reservations;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AnnonceCov> annonceCov;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private List<AnnonceColocation> annonceColocations;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Reclamation> Reclamations;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private List<Post> Posts;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private List<Subscription> subscriptions;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Certification> certifications;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private List<ReservationColoc> ReservationColocs;
    @ManyToOne
    Contract contract;

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }



    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    // Define the getter method for tickets
    public List<Ticket> getTickets() {
        return tickets;

    }
}

