package com.spotify.model.PlayerState.DTO;

import com.spotify.model.Device.DTO.DeviceDto;
import com.spotify.model.TrackObject.DTO.SpotifyTrackDto;

public record PlayerResponseDto(SpotifyTrackDto track,
                                DeviceDto deviceDto,
                                String repeatState,
                                int timestamp,
                                int progressInMs,
                                boolean isPlaying,
                                boolean shuffleStateOn
) {}
