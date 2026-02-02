package com.spotify.model.PlayerState;

import java.util.Optional;

import com.spotify.model.Device.Device;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import com.spotify.model.Device.DeviceMapper;
import com.spotify.model.TrackObject.SpotifyTrackObjectModel;
import com.spotify.model.TrackObject.SpotifyTrackObjectModelMapper;

public final class PlayerStateMapper {
    public static Optional<PlayerState> from(PlayerResponseDto dto){

        if (dto == null) {
            return Optional.empty();
        }

        SpotifyTrackObjectModel trackObject = SpotifyTrackObjectModelMapper.from(dto.track());
        Device device = DeviceMapper.from(dto.deviceDto());

        return Optional.of(
                new PlayerState(
                        trackObject,
                        device,
                        dto.repeatState(),
                        dto.timestamp(),
                        dto.progressInMs(),
                        dto.isPlaying(),
                        dto.shuffleStateOn()
                )
        );
    }
}
