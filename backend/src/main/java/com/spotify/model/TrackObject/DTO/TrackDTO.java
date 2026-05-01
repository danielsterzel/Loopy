package com.spotify.model.TrackObject.DTO;

import com.spotify.model.Album.DTO.AlbumDTO;
import com.spotify.model.Artist.DTO.ArtistDto;
import com.spotify.model.ExternalUrl.DTO.ExternalUrlDto;

import java.util.List;

public record TrackDTO(
        List<ArtistDto> artists,
        AlbumDTO album,
        ExternalUrlDto external_urls,
        String href,
        String id,
        String name,
        String uri,
        int duration_ms,
        boolean explicit,
        boolean is_local
) {}