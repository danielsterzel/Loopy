package com.domain.model.ExternalUrl;

import com.spotify.model.ExternalUrl.DTO.ExternalUrlDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class ExternalUrlMapper {

    private static final Logger log = LoggerFactory.getLogger(ExternalUrlMapper.class);

    public static ExternalUrl from(ExternalUrlDto dto) {
        if (dto == null) {
            log.warn("ExternalUrl is null");
            return null;
        }
        return new ExternalUrl(
                dto.spotifyTrackUrl()
        );
    }
}
