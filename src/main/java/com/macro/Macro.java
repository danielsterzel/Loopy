package com.macro;

import com.User.User;
import jakarta.persistence.*;

@Entity
@Table(name = "macros")

public class Macro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int position;

    @Column(nullable = true)
    private Integer crossfadeDuration;

    @Column(nullable = false)
    private String fromSong;

    @Column(nullable = false)
    private String toSong;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    protected Macro() {} //JPA requirement

    public Macro(User user,String name, int position,String fromSong, String toSong, Integer crossfadeDuration)
    {
        this.user = user;
        this.name = name;
        this.position = position;
        this.fromSong = fromSong;
        this.toSong = toSong;
        this.crossfadeDuration = crossfadeDuration;
    }

    public Long getId(){return id;}
    public String getName(){return name;}
    public String getFromSong() { return fromSong; }
    public String getToSong() { return toSong; }
    public int getMacroPosition(){return position;}
    public Integer getCrossfadeDuration(){return crossfadeDuration;}

    public void setName(String name){this.name = name;}
}
