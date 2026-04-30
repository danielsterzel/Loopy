package com.domain.model.Playlist;

import com.spotify.model.Playlist.DTO.PlaylistDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PlaylistMapper {

    private static final Logger log = LoggerFactory.getLogger(PlaylistMapper.class);

    public static Playlist from(PlaylistDTO playlistDTO) {

        if (playlistDTO == null)
        {
            log.warn("PlaylistDTO is NULL");
            return null;
        }
        String imageUrl = null;

        if (playlistDTO.images() != null && !playlistDTO.images().isEmpty()) {
            imageUrl = playlistDTO.images().getFirst().url();
        }
        System.out.println("TRACKS DTO: " + playlistDTO.items());
        int totalTracks = playlistDTO.items() != null
                ? playlistDTO.items().total()
                : 0;

        return new Playlist(
                playlistDTO.id(),
                playlistDTO.name(),
                imageUrl,
                totalTracks
        );
    }
}
