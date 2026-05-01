package com.domain.model.PlayerState;

import com.domain.model.Track.TrackModel;
import com.domain.model.Device.Device;

public record PlayerState(TrackModel item,
                          Device device,
                          String repeatState,
                          long timestamp,
                          int progressInMs,
                          boolean isPlaying,
                          boolean shuffleStateOn
                          ) {}
