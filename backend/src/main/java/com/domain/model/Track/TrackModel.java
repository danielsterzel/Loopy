package com.domain.model.Track;

import com.domain.model.Album.Album;
import com.domain.model.Artist.Artist;
import com.domain.model.ExternalUrl.ExternalUrl;

import java.util.List;

public record TrackModel(

        String id,
        String name,
        String uri,
        List<Artist> artists,
        ExternalUrl externalUrls,
        String href,
        int durationMs,
        boolean explicit,
        boolean isLocal,
        Album album

) {}