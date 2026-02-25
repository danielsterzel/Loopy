package com.spotify.client;

import com.security.AuthFacade;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import com.spotify.model.PlayerState.PlayerState;
import com.spotify.model.PlayerState.PlayerStateMapper;

import com.spotify.model.Playlist.PlaylistResponse;
import com.spotify.model.TrackObject.PlaylistTracksResponse;
import com.spotify.model.TrackObject.PlaylistTrackItem;
import com.spotify.model.TrackObject.SpotifyTrackObjectModel;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

/**
 * 1. WebClient -> builds and sends Http Request
 * 2. Mono<T> -> promise that I will receive one object of type T
 * 3. bodyToMono(...class) can be used to map object to any class. It maps Json fields to class fields.
 * */

@Component
public class SpotifyApiClientImpl  implements SpotifyApiClient{

    private final AuthFacade auth;
    private final WebClient webClient;

    public SpotifyApiClientImpl(AuthFacade auth, WebClient webClient){
        this.auth = auth;
        this.webClient = webClient; // spring uses the SpotifyWebClientConfig for creating WebClient type object
    }
    @Override
    public Optional<PlayerState> getCurrentPlayer()
    {
        var spotifyAccessToken = auth.getAccessTokenValue();
        PlayerResponseDto dto = webClient
                .get()
                .uri("/me/player")
                .header("Authorization", "Bearer " + spotifyAccessToken)
                .retrieve()
                .onStatus( status -> status.value() == 401,
                        response -> response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Spotify 401" + body)))
                .bodyToMono(PlayerResponseDto.class)
                .block();

        return PlayerStateMapper.from(dto);
    }

    @Override
    public void enqueueTrack(String trackUri)
    {}
    @Override
    public void skipToNext()
    {}
    @Override
    public String getCurrentPlayerRawJson() throws RuntimeException
    {
        var spotifyAccessToken = auth.getAccessTokenValue();

        var oauth = auth.getOauth2AuthenticationToken();
        System.out.println(oauth.getAuthorities());

        return webClient
                .get()
                .uri("/me/player")
                .header("Authorization", "Bearer " + spotifyAccessToken)
                .retrieve()// execute
                .onStatus(status -> status.value() == 401,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Spotify 401" + body)))
                .bodyToMono(String.class)
                .block(); // block thread and give me the result -> sync communication
    }
    @Override
    public PlaylistResponse getUserPlaylists()
    {
        var spotifyAccessToken = auth.getAccessTokenValue();
        var oauth = auth.getOauth2AuthenticationToken();

        return webClient
                .get()
                .uri("/me/playlists")
                .header("Authorization", "Bearer " + spotifyAccessToken)
                .retrieve()
                .onStatus(status -> status.value() == 401,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Spotify 401" + body)))
                .bodyToMono(PlaylistResponse.class)
                .block();
    }
    @Override
    public List<SpotifyTrackObjectModel> getPlaylistTracks(String playlistId)
    {
        var accessToken = auth.getAccessTokenValue();

        PlaylistTracksResponse response = webClient
                .get()
                .uri("/playlists/{playlist_id}/tracks", playlistId)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(PlaylistTracksResponse.class)
                .block();

        return response.items()
                .stream()
                .map(PlaylistTrackItem::track)
                .toList();
    }
}
