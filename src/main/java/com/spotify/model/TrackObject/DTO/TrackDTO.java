package com.spotify.model.TrackObject.DTO;

import java.util.List;

import com.spotify.model.Artist.DTO.ArtistDto;
import com.spotify.model.ExternalUrl.DTO.ExternalUrlDto;

public record TrackDTO(
        List<ArtistDto> artistNames,
        ExternalUrlDto spotifyTrackUrl,
        String spotifyWebApiEndpoint,
        String spotifyTrackId,
        String trackName,
        String trackUri,
        int durationInMs,
        boolean trackHasExplicitLyrics,
        boolean isLocalFile
) {
}
