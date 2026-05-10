package com.domain.model.Album;

import com.spotify.model.Album.DTO.AlbumDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class AlbumMapper {

    private static final Logger log = LoggerFactory.getLogger(AlbumMapper.class);

    public static Album from(AlbumDTO albumDTO)
    {
        if(albumDTO == null)
        {
            log.warn("Album DTO is null");
            return null;
        }
        return new Album(albumDTO.images());
    }
}
