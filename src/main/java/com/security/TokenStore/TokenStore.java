package com.security.TokenStore;


import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class TokenStore {
    private final ConcurrentMap<String, String> accessTokenMap = new ConcurrentHashMap<>() {
    };


    public void store(String springSecurityId, String token)
    {
        accessTokenMap.put(springSecurityId, token);
    }

    public String get(String id)
    {
        String token = accessTokenMap.get(id);

        if(token == null)
        {
            throw new IllegalStateException("No Spotify token stored yet for user: " + id);
        }
        return token;
    }

    public boolean hasToken(String id)
    {
        return accessTokenMap.containsKey(id);
    }
}
