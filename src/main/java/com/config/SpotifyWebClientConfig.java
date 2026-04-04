package com.config;

import com.security.TokenStore.TokenStore;
import com.spotify.client.filter.SpotifyAuthInterceptor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class SpotifyWebClientConfig {

    @Bean
    @Qualifier("authSpotifyWebClient")
    WebClient spotifyWebClient(WebClient.Builder builder, TokenStore tokenStore){
        return builder
                .baseUrl("https://api.spotify.com/v1")
                .filter(SpotifyAuthInterceptor.bearer(tokenStore))
                .build();
    }
    @Bean
    @Qualifier("schedulerSpotifyWebClient")
    WebClient schedulerSpotifyWebClient(WebClient.Builder builder)
    {
        return builder.baseUrl("https://api.spotify.com/v1").build();
    }
}
