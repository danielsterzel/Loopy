package com.spotify.client;

import com.spotify.model.PlayerState.PlayerState;
import com.spotify.model.Playlist.PlaylistResponse;
import com.spotify.model.TrackObject.SpotifyTrackObjectModel;

import java.util.List;
import java.util.Optional;

public interface SpotifyApiClient {
    Optional<PlayerState> getCurrentPlayer();
    void enqueueTrack(String trackUri);
    void skipToNext();
    PlaylistResponse getUserPlaylists();
    List<SpotifyTrackObjectModel> getPlaylistTracks(String playlistId);
    String getCurrentPlayerRawJson();
}
