package com.spotify.model.TrackObject;

import com.spotify.model.Artist.Artist;
import com.spotify.model.ExternalUrl.ExternalUrl;
import com.spotify.model.Album.Album;

import java.util.List;

public record SpotifyTrackObjectModel(

        String id,
        String name,
        String uri,
        List<Artist> artists,
        ExternalUrl external_urls,
        String href,
        int duration_ms,
        boolean explicit,
        boolean is_local
//        ,Album album

) {}