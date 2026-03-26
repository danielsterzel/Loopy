package com.spotify.SpotifyPlayerAdapter;

import com.domain.model.PlayerState.PlayerState;
import com.domain.model.PlayerState.PlayerStateMapper;
import com.domain.port.PlayerControlPort;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class SpotifyPlayerAdapter implements PlayerControlPort{

    private final WebClient spotifyWebClient;
    private final static Logger log = LoggerFactory.getLogger(SpotifyPlayerAdapter.class);

    public SpotifyPlayerAdapter(WebClient spotifyWebClient)
    {
        this.spotifyWebClient = spotifyWebClient;
    }

    @Override
    public Optional<PlayerState> getCurrentState() {

        PlayerResponseDto dto = spotifyWebClient
                .get()
                .uri("/me/player")
                .retrieve()
                .bodyToMono(PlayerResponseDto.class)
                .block();

        return PlayerStateMapper.from(dto);
    }
    @Override
    public void seekToPosition(int positionMs)
    {
        spotifyWebClient
                .put()
                .uri(uriBuilder -> uriBuilder
                        .path("/me/player/seek")
                        .queryParam("position_ms", positionMs)
                        .build()
                )
                .retrieve()
                .toBodilessEntity()
                .subscribe(
                        result -> log.debug("Seek to {}ms successfull", positionMs),
                        error -> log.error("Seek failed {}", error.getMessage())
                );
    }
    @Override
    public void play()
    {
        spotifyWebClient
                .put()
                .uri("/me/player/play")
                .retrieve()
                .toBodilessEntity()
                .subscribe(result -> log.debug("Play successfull"),
                        error -> log.error("Play failed: {}", error.getMessage())
                );
    }

    @Override
    public void repeatTrack(int positionMs){
        spotifyWebClient
                .put()
                .uri(uriBuilder -> uriBuilder
                                .path("/me/player/seek")
                                .queryParam("postition_ms", positionMs)
                                .build()
                        )
                .retrieve()
                .toBodilessEntity()
                .then(
                        spotifyWebClient
                                .put()
                                .uri("/me/player/play")
                                .retrieve()
                                .toBodilessEntity()
                )
                .subscribe(
                        result -> log.debug("Song repeat successfull!"),
                        error -> log.error("Repeating song failed: {}", error.getMessage())
                );

    }

}
