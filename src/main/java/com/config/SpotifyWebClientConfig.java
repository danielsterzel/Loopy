package com.config;

import com.security.TokenProvider.SpotifyTokenProviderImpl;
import com.security.TokenStore.TokenStore;
import com.spotify.client.filter.SpotifyAuthInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class SpotifyWebClientConfig {

    @Bean
    WebClient spotifyWebClient(WebClient.Builder builder, TokenStore tokenStore){
        return builder
                .baseUrl("https://api.spotify.com/v1")
                .filter(SpotifyAuthInterceptor.bearer(tokenStore))
                .build();
    }
}
