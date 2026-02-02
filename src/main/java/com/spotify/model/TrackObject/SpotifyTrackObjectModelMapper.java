package com.spotify.model.TrackObject;

import com.spotify.model.Artist.Artist;
import com.spotify.model.Artist.ArtistModelMapper;
import com.spotify.model.ExternalUrl.ExternalUrl;
import com.spotify.model.ExternalUrl.ExternalUrlMapper;
import com.spotify.model.TrackObject.DTO.SpotifyTrackDto;

import java.util.List;

public class SpotifyTrackObjectModelMapper {
    public static SpotifyTrackObjectModel from(SpotifyTrackDto item)
    {
        List<Artist> artists = ArtistModelMapper.fromList(item.artistNames());
        ExternalUrl url = ExternalUrlMapper.from(item.spotifyTrackUrl());
        return new SpotifyTrackObjectModel
                (
                        artists,
                        url,
                        item.spotifyWebApiEndpoint(),
                        item.spotifyTrackId(),
                        item.trackName(),
                        item.trackUri(),
                        item.durationInMs(),
                        item.trackHasExplicitLyrics(),
                        item.isLocalFile()
                );
    }
}
