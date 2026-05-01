
package com.api;

import com.domain.model.RepeatSession.RepeatSessionStorage;
import com.security.TokenStore.TokenStore;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {


    private final TokenStore tokenStore;
    private final RepeatSessionStorage repeatSessionStorage;

    public UserController(TokenStore tokenStore, RepeatSessionStorage repeatSessionStorage) {
        this.tokenStore = tokenStore;
        this.repeatSessionStorage = repeatSessionStorage;
    }

    @GetMapping("/ping")
    public String ping()
    {
        return "pong";
    }

    @GetMapping("/api/me")
    public Map<String, Object> me(@AuthenticationPrincipal OAuth2User user){

        return user.getAttributes();
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> getUserDetails(@AuthenticationPrincipal OAuth2User user)
    {
        return ResponseEntity.ok(Map.of("name", (String) user.getAttributes().get("display_name")));
    }
    @PostMapping("/logout")
    public void logout(@AuthenticationPrincipal OAuth2User user){

        String userId = user.getName();

        repeatSessionStorage.clearSession(userId);
        tokenStore.remove(userId);
    }
}
