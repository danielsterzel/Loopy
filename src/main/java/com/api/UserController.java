/**
 * NOTES:
 * -----------------------------------------------
 * @AuthenticationPrincipal -> give me an object representing a logged-in user with SecurityContext. This is a
 *      shorthand form of this code:
 *          ```
 *          Authentication auth = SecurityContextHolder.getContext().getAuthentication();
 *          OAuth2User user = (OAuth2User) auth.getPrincipal();
 *          ```
 * -----------------------------------------------
 * OAuth flow:
 * Spotify returns code -> Spring exchanges code for access_token -> Spring calls https://api.spotify.com/v1/me ->
 *  -> Gets a JSON -> Spring creates an object from said JSON -> Object goes to SecurityContextHolder (the object is OAuth2User)
 * -----------------------------------------------
 * OAuth2User:
 *      -> Wrapper class for User data.
 *      -> Works for ALL providers(Google, GitHub, Azure AD etc.)
 * -----------------------------------------------
 *
 *
 *
 *
 * */

package com.api;

import com.domain.model.RepeatSession.RepeatSessionStorage;
import com.security.TokenStore.TokenStore;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.stream.Collectors;

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
    @GetMapping("/api/csrf")
    public void csrf(CsrfToken token) {}
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
