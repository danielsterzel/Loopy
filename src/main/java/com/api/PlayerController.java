package com.api;

import com.spotify.client.SpotifyApiClient;
import com.domain.model.PlayerState.PlayerState;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private final SpotifyApiClient spotifyApiClient;

    public PlayerController(SpotifyApiClient spotifyApiClient){
        this.spotifyApiClient = spotifyApiClient;
    }
    @GetMapping("/raw")
    public String rawPlayerJson(){
        return spotifyApiClient.getCurrentPlayerRawJson();
    }

    @PostMapping("/repeat/start")
    public ResponseEntity<Map<String, Boolean>> startRepeat(@RequestBody ResponseEntity<String> request)
    {
        return ResponseEntity.ok(Map.of("repeat", true));
    }

}


