package com.spotify.model.PlayerState;

import com.spotify.model.TrackObject.SpotifyTrackObjectModel;
import com.spotify.model.Device.Device;

public record PlayerState(SpotifyTrackObjectModel track,
                          Device device,
                          String repeatState,
                          int timestamp,
                          int progressInMs,
                          boolean isPlaying,
                          boolean shuffleStateOn
                          ) {}
