package com.spotify.client.filter;


import com.security.TokenStore.TokenStore;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import reactor.core.publisher.Mono;

@Component
public class SpotifyAuthInterceptor {

    public SpotifyAuthInterceptor(){}
    public static ExchangeFilterFunction bearer(TokenStore tokenStore)
    {

        return ExchangeFilterFunction.ofRequestProcessor(request -> {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if(auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken)
            {
                return Mono.error(new IllegalStateException("User not authenticated"));
            }
            String userId = auth.getName();

                    return Mono.just(
                            ClientRequest.from(request)
                                    .header("Authorization", "Bearer " + tokenStore.get(userId))
                                    .build()
                    );
                }
        );
    }
}
