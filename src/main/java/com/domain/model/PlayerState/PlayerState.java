package com.domain.model.PlayerState;

import com.domain.model.Track.TrackModel;
import com.domain.model.Device.Device;

public record PlayerState(TrackModel track,
                          Device device,
                          String repeatState,
                          int timestamp,
                          int progressInMs,
                          boolean isPlaying,
                          boolean shuffleStateOn
                          ) {}
