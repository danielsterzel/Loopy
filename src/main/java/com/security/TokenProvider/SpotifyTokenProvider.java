package com.security.TokenProvider;

public interface SpotifyTokenProvider {
    String accessToken();
    void refreshToken();
}
