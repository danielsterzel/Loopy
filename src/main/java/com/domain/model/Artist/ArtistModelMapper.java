package com.domain.model.Artist;

import com.spotify.model.Artist.DTO.ArtistDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

public final class ArtistModelMapper {

    private static final Logger log = LoggerFactory.getLogger(ArtistModelMapper.class);

    public static Artist from(ArtistDto dto)
    {
        if(dto == null)
        {
            log.warn("Artist DTO is null");
            return null;
        }
        return new Artist(dto.name());
    }

    public static List<Artist> fromList(List<ArtistDto> dtos)
    {
        if (dtos == null || dtos.isEmpty())
        {
            log.warn("Artist list is empty or null");
            return List.of();
        }
        return dtos.stream().map(ArtistModelMapper::from).toList();
    }
}
