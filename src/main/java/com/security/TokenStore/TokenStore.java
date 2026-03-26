package com.security.TokenStore;


import org.springframework.stereotype.Component;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class TokenStore {
    private final AtomicReference<String> accessToken = new AtomicReference<>();

    public void store(String token)
    {
        accessToken.set(token);
    }

    public String get()
    {
        String token = accessToken.get();

        if(token == null)
        {
            throw new IllegalStateException("No Spotify token stored yet.");
        }
        return token;
    }

    public boolean hasToken()
    {
        return accessToken.get() != null;
    }
}
