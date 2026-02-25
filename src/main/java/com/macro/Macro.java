package com.macro;

import com.User.User;
import com.macro.DTO.MacroDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "macros")

public class Macro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 25)
    private String name;

    @Column(nullable = false)
    private int position; // ???? Is it really necessary?

    @Column(nullable = true)
    private Integer crossfadeDuration;

    @Column(nullable = false, length = 50)
    private String fromSong;

    @Column(nullable = false, length = 50)
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
    public Macro(User user, Long id, String name, int position, String fromSong, String toSong, Integer crossfadeDuration)
    {
        this.user = user;
        this.id = id;
        this.name = name;
        this.position = position;
        this.fromSong = fromSong;
        this.toSong = toSong;
        this.crossfadeDuration = crossfadeDuration;
    }

    void reconfigureMacro(MacroDTO reconfiguredMacro)
    {

    }

    public Long getId(){return id;}
    public String getName(){return name;}
    public String getFromSong() { return fromSong; }
    public String getToSong() { return toSong; }
    public int getMacroPosition(){return position;}
    public Integer getCrossfadeDuration(){return crossfadeDuration;}

    public void setName(String name){this.name = name;}
    public void setFromSong(String name){this.fromSong = fromSong;}
    public void setToSong(String toSong) {this.toSong = toSong;}
    public void setMacroPositionInList(int position){this.position = position;}
    public void setCrossfadeDuration(Integer crossfadeDuration){this.crossfadeDuration = crossfadeDuration;}
}
