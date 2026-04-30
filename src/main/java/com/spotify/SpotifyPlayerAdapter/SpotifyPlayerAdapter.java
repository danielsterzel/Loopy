package com.spotify.SpotifyPlayerAdapter;

import com.domain.model.PlayerState.PlayerState;
import com.domain.model.PlayerState.PlayerStateMapper;
import com.domain.port.PlayerControlPort;
import com.security.TokenStore.TokenStore;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class SpotifyPlayerAdapter implements PlayerControlPort{

    private final WebClient schedulerSpotifyWebClient;
    private final static Logger log = LoggerFactory.getLogger(SpotifyPlayerAdapter.class);
    private final TokenStore tokenStore;

    public SpotifyPlayerAdapter(@Qualifier("schedulerSpotifyWebClient") WebClient schedulerSpotifyWebClient, TokenStore tokenStore)
    {
        this.tokenStore = tokenStore;
        this.schedulerSpotifyWebClient = schedulerSpotifyWebClient;
    }

    @Override
    public Optional<PlayerState> getCurrentState(String id) {

        String token = tokenStore.get(id);

        PlayerResponseDto dto = schedulerSpotifyWebClient
                .get()
                .uri("/me/player")
                .headers(headers -> headers.setBearerAuth(token))
                .retrieve()
                .bodyToMono(PlayerResponseDto.class)
                .block();

        log.info("PlayerResponseDto received: {}", dto);
        return PlayerStateMapper.from(dto);
    }
    @Override
    public void seekToPosition(String id, int positionMs)
    {
        String token = tokenStore.get(id);
        schedulerSpotifyWebClient
                .put()
                .uri(uriBuilder -> uriBuilder
                        .path("/me/player/seek")
                        .queryParam("position_ms", positionMs)
                        .build()
                )
                .headers(headers -> headers.setBearerAuth(token))
                .retrieve()
                .toBodilessEntity()
                .subscribe(
                        result -> log.debug("Seek to {}ms successfull", positionMs),
                        error -> log.error("Seek failed {}", error.getMessage())
                );
    }
    @Override
    public void play(String id)
    {
        String token = tokenStore.get(id);
        schedulerSpotifyWebClient
                .put()
                .uri("/me/player/play")
                .headers(header -> header.setBearerAuth(token))
                .retrieve()
                .toBodilessEntity()
                .subscribe(result -> log.debug("Play successfull"),
                        error -> log.error("Play failed: {}", error.getMessage())
                );
    }

    @Override
    public void repeatTrack(String id, int positionMs){

        String token = tokenStore.get(id);

        schedulerSpotifyWebClient
                .put()
                .uri(uriBuilder -> uriBuilder
                                .path("/me/player/seek")
                                .queryParam("position_ms", positionMs)
                                .build()
                        )
                .headers(headers -> headers.setBearerAuth(token))
                .retrieve()
                .toBodilessEntity()

                .subscribe(
                        result -> log.debug("Song repeat successful!"),
                        error -> log.error("Repeating song failed: {}", error.getMessage())
                );

    }

}
