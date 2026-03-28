package com.security.auth;

import com.security.TokenStore.TokenStore;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Component;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

@Component
public class SpotifyLoginListener {

    private final Logger log = LoggerFactory.getLogger(SpotifyLoginListener.class);
    private final TokenStore tokenStore;
    private final AuthFacade authFacade;

    public SpotifyLoginListener(TokenStore tokenStore, AuthFacade authFacade)
    {
        this.tokenStore = tokenStore;
        this.authFacade = authFacade;
    }

    @EventListener
    void onLoginSuccess(AuthenticationSuccessEvent event)
    {
        log.info("AuthenticationSuccessEvent fired: {}", event.getAuthentication().getClass().getSimpleName());
        if(event.getAuthentication() instanceof OAuth2LoginAuthenticationToken oauth)
        {
            OAuth2AccessToken accessToken = oauth.getAccessToken();
            log.info("Access token present: {}", accessToken != null);
            if (accessToken != null) {
                tokenStore.store(accessToken.getTokenValue());
                log.info("Token stored successfully");
            }
            else {
                log.warn("Not OAuth2LoginAuthenticationToken, got: {}",
                        event.getAuthentication().getClass().getSimpleName());
            }
        }
    }
}
