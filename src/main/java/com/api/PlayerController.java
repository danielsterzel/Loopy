package com.api;

import com.spotify.client.SpotifyApiClient;
import com.domain.model.PlayerState.PlayerState;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player") // prefix for all mappings in controller
public class PlayerController {
    private final SpotifyApiClient spotifyApiClient;

    public PlayerController(SpotifyApiClient spotifyApiClient){
        this.spotifyApiClient = spotifyApiClient;
    }
    @GetMapping("/raw")
    public String rawPlayerJson(){
        return spotifyApiClient.getCurrentPlayerRawJson();
    }


    // ResponseEntity == full HTTP response with error code body and headers
    @GetMapping
    public ResponseEntity<PlayerState> getPlayer()
    {
        return spotifyApiClient.getCurrentPlayer().map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}


