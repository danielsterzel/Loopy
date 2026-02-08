package com.User;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String spotifyUserId;

    @Column(nullable = false)
    private String displayName;

    protected User(){}

    public User(String spotifyUserId, String displayName)
    {
        this.spotifyUserId = spotifyUserId;
        this.displayName = displayName;
    }
    public Long getId(){ return id; }
    public String getSpotifyUserId(){ return spotifyUserId; }
}
