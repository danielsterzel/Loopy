package com.spotify.model.ExternalUrl;

import com.CommonUtils;
import com.spotify.model.ExternalUrl.DTO.ExternalUrlDto;

public final class ExternalUrlMapper {
    public static ExternalUrl from(ExternalUrlDto dto)
    {
        if(CommonUtils.isNull(dto)) return null;
        return new ExternalUrl(
                dto.spotifyTrackUrl()
        );
    }
}
