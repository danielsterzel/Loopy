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

        TrackModel trackObject = TrackModelMapper.from(dto.item());
        Device device = DeviceMapper.from(dto.device());

        return Optional.of(
                new PlayerState(
                        trackObject,
                        device,
                        dto.repeat_state(),
                        dto.timestamp(),
                        dto.progress_ms(),
                        dto.is_playing(),
                        dto.shuffle_state()
                )
        );
    }
}
