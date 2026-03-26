package com.security.auth;

import com.security.TokenStore.TokenStore;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class SpotifyLoginListener {

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
        if(event.getAuthentication() instanceof OAuth2LoginAuthenticationToken)
        {
            String token = authFacade.getAccessTokenValue();
            tokenStore.store(token);
        }
    }
}
