package com.api;

import com.domain.model.RepeatSession.RepeatSession;
import com.domain.model.Track.TrackModel;
import com.domain.RepeatSessionService.RepeatSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import com.domain.model.RepeatSession.StartRepeatRequest.StartRepeatRequest;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private final RepeatSessionService repeatSessionService;

    public PlayerController(RepeatSessionService repeatSessionService){
        this.repeatSessionService = repeatSessionService;
    }

    @PostMapping("/repeat/start")
    public ResponseEntity<Map<String, Boolean>> startRepeat(
            @AuthenticationPrincipal OAuth2User user,
            @RequestBody StartRepeatRequest request)
    {
        Optional<TrackModel> currentlyPlaying = repeatSessionService.pullCurrentlyPlaying();
        if(currentlyPlaying.isEmpty()){
            return ResponseEntity.ok(Map.of("repeat",false));
        }

        int startMs = request.startMs();
        int endMs = request.endMs();

        String userId = user.getAttributes().get("user_id").toString();
        RepeatSession newSession = new RepeatSession(currentlyPlaying.get().id(),
                currentlyPlaying.get().name(), startMs, endMs, userId);

        repeatSessionService.startRepeat(newSession);

        return ResponseEntity.ok(Map.of("repeat", true));
    }

    @PostMapping("/repeat/end")
    public ResponseEntity<Map<String, Boolean>> endRepeat(@AuthenticationPrincipal OAuth2User user)
    {
        String userId = user.getAttributes().get("user_id").toString();
        repeatSessionService.stopRepeat(userId);
        return ResponseEntity.ok(Map.of("repeat", false));
    }

}


