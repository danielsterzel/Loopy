package com.domain.model.PlayerState;

import java.util.Optional;

import com.domain.model.Device.Device;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import com.domain.model.Device.DeviceMapper;
import com.domain.model.Track.TrackModel;
import com.domain.model.Track.TrackModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class PlayerStateMapper {
    private static final Logger log = LoggerFactory.getLogger(PlayerStateMapper.class);

    public static Optional<PlayerState> from(PlayerResponseDto dto){

        if (dto == null) {
            log.warn("PlayerResponse DTO is null");
            return Optional.empty();
        }

        TrackModel trackObject = TrackModelMapper.from(dto.track());
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
