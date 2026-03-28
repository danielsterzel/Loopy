package com.api;

import com.domain.model.RepeatSession.RepeatSession;
import com.domain.model.Track.TrackModel;
import com.spotify.client.SpotifyApiClient;
import com.domain.RepeatSessionService.RepeatSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.domain.model.RepeatSession.StartRepeatRequest.StartRepeatRequest;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private final SpotifyApiClient spotifyApiClient;
    private final RepeatSessionService repeatSessionService;

    public PlayerController(SpotifyApiClient spotifyApiClient, RepeatSessionService repeatSessionService){
        this.spotifyApiClient = spotifyApiClient;
        this.repeatSessionService = repeatSessionService;
    }
    @GetMapping("/raw")
    public String rawPlayerJson(){
        return spotifyApiClient.getCurrentPlayerRawJson();
    }

    @PostMapping("/repeat/start")
    public ResponseEntity<Map<String, Boolean>> startRepeat(@RequestBody StartRepeatRequest request)
    {
        Optional<TrackModel> currentlyPlaying = repeatSessionService.pullCurrentlyPlaying();
        if(currentlyPlaying.isEmpty()){
            return ResponseEntity.ok(Map.of("repeat",false));
        }

        int startMs = request.startMs();
        int endMs = request.endMs();

        RepeatSession newSession = new RepeatSession(currentlyPlaying.get().id(),
                currentlyPlaying.get().name(), startMs, endMs);

        repeatSessionService.startRepeat(newSession);

        return ResponseEntity.ok(Map.of("repeat", true));
    }

    @PostMapping("/repeat/end")
    public ResponseEntity<Map<String, Boolean>> endRepeat()
    {
        repeatSessionService.stopRepeat();
        return ResponseEntity.ok(Map.of("repeat", false));
    }

}


