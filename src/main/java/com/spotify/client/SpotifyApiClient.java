package com.spotify.client;

import com.domain.model.PlayerState.PlayerState;
import com.domain.model.Playlist.Playlist;
import com.domain.model.Track.TrackModel;

import java.util.List;
import java.util.Optional;

public interface SpotifyApiClient {
    void enqueueTrack(String trackUri);
    void skipToNext();
    List<Playlist> getUserPlaylists();
    List<TrackModel> getPlaylistTracks(String playlistId);
    String getCurrentPlayerRawJson();

}
