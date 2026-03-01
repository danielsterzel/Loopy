package com.domain.model.Track;

import com.domain.model.Artist.Artist;
import com.domain.model.Artist.ArtistModelMapper;
import com.domain.model.ExternalUrl.ExternalUrl;
import com.domain.model.ExternalUrl.ExternalUrlMapper;
import com.spotify.model.TrackObject.DTO.TrackDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

public class TrackModelMapper {

    private static final Logger log = LoggerFactory.getLogger(TrackModelMapper.class);

    public static TrackModel from(TrackDTO item)
    {
        if (item == null) {
            log.warn("Track DTO is null returning null");
            return null;
        }
        List<Artist> artists = ArtistModelMapper.fromList(item.artistNames());
        ExternalUrl url = ExternalUrlMapper.from(item.spotifyTrackUrl());

        return new TrackModel(
                item.spotifyTrackId(),
                item.trackName(),
                item.trackUri(),
                artists,
                url,
                item.spotifyWebApiEndpoint(),
                item.durationInMs(),
                item.trackHasExplicitLyrics(),
                item.isLocalFile()
        );
    }
}