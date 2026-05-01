package com.domain.model.Track;

import com.domain.model.Album.Album;
import com.domain.model.Album.AlbumMapper;
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

    public static TrackModel from(TrackDTO item) {
        if (item == null) {
            log.warn("Track DTO is null returning null");
            return null;
        }

        List<Artist> artists = ArtistModelMapper.fromList(item.artists());
        ExternalUrl url = ExternalUrlMapper.from(item.external_urls());
        Album album = AlbumMapper.from(item.album());

        return new TrackModel(
                item.id(),
                item.name(),
                item.uri(),
                artists,
                url,
                item.href(),
                item.duration_ms(),
                item.explicit(),
                item.is_local(),
                album
        );
    }
}