package com.security.auth;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.stereotype.Component;

import java.lang.IllegalStateException;

/**
 *  \ NOTES ON THE AuthFacade CLASS /
 *  =======================================================
 *  The AuthFacade class is a wrapper for Spring Security
 *  so that we don't have to call SecurityContextHolder.
 *  Said class will implement these functionalities:
 *      1. "Tell me, if someone is logged-in and their identity":
 *             * input: nothing -> void
 *             * output: OAuth2user / userId
 *      2. Retrieval of access token of a logged-in user:
 *             * input: nothing -> void
 *             * output: String accessToken
 *      3. [ Optional ] Retrieval of Spotify userId
 *             * input: nothing -> void
 *             * output: String spotifyUserId
 * =======================================================
 **/

@Component
public class AuthFacade {

    private final OAuth2AuthorizedClientService clientService;
    private final OAuth2AuthorizedClientRepository clientRepository;

    public AuthFacade( OAuth2AuthorizedClientService clientService, OAuth2AuthorizedClientRepository clientRepository){
        this.clientService = clientService;
        this.clientRepository = clientRepository;
    }
    public Authentication currentAuthentication() throws RuntimeException
    {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if(auth == null)
        {
            throw new IllegalStateException("No authentication in SecurityContextHolder");
        }
        return auth;
    }
    private OAuth2AuthenticationToken getOauth2AuthenticationToken() throws RuntimeException
    {
        Authentication authentication = currentAuthentication();

        if(authentication instanceof OAuth2AuthenticationToken oauth)
        {
            return oauth;
        }
        throw new IllegalStateException("Authentication is not OAuth2");
    }

    public String getAccessTokenValue() throws RuntimeException
    {
        var oauthToken = getOauth2AuthenticationToken();
        String principalName = oauthToken.getPrincipal().getName();
        String registrationId = oauthToken.getAuthorizedClientRegistrationId();

        OAuth2AuthorizedClient oauthClient = clientService.loadAuthorizedClient(registrationId, principalName);

        if (oauthClient == null || oauthClient.getAccessToken() == null)
        {
            throw new IllegalStateException("No authorized client found (OAuth login possibly failed");
        }

        return oauthClient.getAccessToken().getTokenValue();
    }

    public boolean isUserAuthenticated()
    {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated()
                && !(auth instanceof AnonymousAuthenticationToken);
    }

}
