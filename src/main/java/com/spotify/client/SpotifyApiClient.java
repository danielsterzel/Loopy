package com.spotify.client;

import com.spotify.model.PlayerState.PlayerState;
import com.spotify.model.PlayerState.PlayerStateMock;

import java.util.Optional;

public interface SpotifyApiClient {
    Optional<PlayerState> getCurrentPlayer();
    void enqueueTrack(String trackUri);
    void skipToNext();
    String getCurrentPlayerRawJson();
}
