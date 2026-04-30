package com.spotify.model.Artist.DTO;

import reactor.util.annotation.NonNull;

public record ArtistDto(String name) {
    @Override
    @NonNull
    public String toString(){
        return name;
    }
}
