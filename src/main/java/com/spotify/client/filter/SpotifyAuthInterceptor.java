package com.spotify.client.filter;


import com.security.TokenStore.TokenStore;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import reactor.core.publisher.Mono;

@Component
public class SpotifyAuthInterceptor {

    private SpotifyAuthInterceptor(){}
    public static ExchangeFilterFunction bearer(TokenStore tokenStore)
    {
        return ExchangeFilterFunction.ofRequestProcessor(request ->
            Mono.just(
                    ClientRequest.from(request)
                            .header("Authorization", "Bearer " + tokenStore.get())
                            .build()
            )
        );
    }
}
