package com.api;

import com.domain.model.Playlist.Playlist;

import com.domain.model.Playlist.PlaylistMapper;
import com.spotify.client.SpotifyApiClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/spotify")
public class PlaylistController
{
    private final SpotifyApiClient spotifyApiClient;

    public PlaylistController(SpotifyApiClient spotifyApiClient){this.spotifyApiClient = spotifyApiClient;}

    @GetMapping("/playlists")
    public ResponseEntity<List<Playlist>> getPlaylistsForUser() {
        List<Playlist> playlists = spotifyApiClient.getUserPlaylists();
        return ResponseEntity.ok(playlists);
    }
}
