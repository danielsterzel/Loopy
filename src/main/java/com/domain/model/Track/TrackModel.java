package com.domain.model.Track;

import com.domain.model.Artist.Artist;
import com.domain.model.ExternalUrl.ExternalUrl;

import java.util.List;

public record TrackModel(

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