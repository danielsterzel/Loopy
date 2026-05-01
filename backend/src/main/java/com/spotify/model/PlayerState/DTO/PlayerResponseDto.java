package com.spotify.model.PlayerState.DTO;

import com.spotify.model.Device.DTO.DeviceDto;
import com.spotify.model.TrackObject.DTO.TrackDTO;

public record PlayerResponseDto(TrackDTO item,
                                DeviceDto device,
                                String repeat_state,
                                long timestamp,
                                int progress_ms,
                                boolean is_playing,
                                boolean shuffle_state
) {}
