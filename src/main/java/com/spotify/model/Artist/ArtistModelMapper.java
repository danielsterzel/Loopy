package com.spotify.model.Artist;

import java.util.List;

import com.CommonUtils;
import com.spotify.model.Artist.DTO.ArtistDto;

public final class ArtistModelMapper {
    public static Artist from(ArtistDto dto)
    {
        if(CommonUtils.isNull(dto)) return null;
        return new Artist(dto.name());
    }

    public static List<Artist> fromList(List<ArtistDto> dtos)
    {
        if (dtos == null) return null;
        return dtos.stream().map(ArtistModelMapper::from).toList();
        // dto -> ArtistModelMapper.from(dto);
    }
}
