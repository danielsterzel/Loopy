package com.spotify.client;

import com.domain.model.Playlist.Playlist;
import com.domain.model.Playlist.PlaylistMapper;
import com.domain.model.Track.TrackModelMapper;
import com.security.AuthFacade;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import com.domain.model.PlayerState.PlayerState;
import com.domain.model.PlayerState.PlayerStateMapper;

import com.spotify.model.PlaylistResponse.DTO.PlaylistResponse;
import com.domain.model.Track.TrackModel;
import com.spotify.model.PlaylistTrackItem.DTO.PlaylistTrackItem;
import com.spotify.model.PlaylistTrackResponse.DTO.PlaylistTracksResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * 1. WebClient -> builds and sends Http Request
 * 2. Mono<T> -> promise that I will receive one object of type T
 * 3. bodyToMono(...class) can be used to map object to any class. It maps Json fields to class fields.
 *
 */

@Component
public class SpotifyApiClientImpl implements SpotifyApiClient {

    private final AuthFacade auth;
    private final WebClient webClient;

    public SpotifyApiClientImpl(AuthFacade auth, WebClient webClient) {
        this.auth = auth;
        this.webClient = webClient; // spring uses the SpotifyWebClientConfig for creating WebClient type object
    }

    @Override
    public Optional<PlayerState> getCurrentPlayer() {
        var spotifyAccessToken = auth.getAccessTokenValue();

        PlayerResponseDto dto = webClient
                .get()
                .uri("/me/player")
                .header("Authorization", "Bearer " + spotifyAccessToken)
                .retrieve()
                .onStatus(status -> status.value() == 401,
                        response -> response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Spotify 401" + body)))
                .bodyToMono(PlayerResponseDto.class)
                .block();

        return PlayerStateMapper.from(dto);
    }

    @Override
    public void enqueueTrack(String trackUri) {
    }

    @Override
    public void skipToNext() {
    }

    @Override
    public String getCurrentPlayerRawJson() throws RuntimeException {
        var spotifyAccessToken = auth.getAccessTokenValue();

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
    public List<Playlist> getUserPlaylists() {
        var spotifyAccessToken = auth.getAccessTokenValue();

        PlaylistResponse response = webClient
                .get()
                .uri("/me/playlists")
                .header("Authorization", "Bearer " + spotifyAccessToken)
                .retrieve()
                .onStatus(status -> status.value() == 401,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Couldn't get PLAYLISTS" + body)))
                .bodyToMono(PlaylistResponse.class)
                .block();
        if( response == null || response.items() == null)
        {
            System.err.println("Something went wrong with getting the playlists or the playlist dtoItems are null");
            return List.of();
        }
        return response.items().stream()
                .filter(Objects::nonNull)
                .map(item -> PlaylistMapper.from(item))
                .toList();
    }

    @Override
    public List<TrackModel> getPlaylistTracks(String playlistId) {
        var spotifyAPIToken = auth.getAccessTokenValue();

        PlaylistTracksResponse spotifyResponse = webClient
                .get()
                .uri("/playlists/{playlist_id}/tracks", playlistId)
                .header("Authorization", "Bearer " + spotifyAPIToken)
                .retrieve()
                .onStatus(status -> status.value() == 401,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Couldn't get Playlist TRACKS" + body)))
                .bodyToMono(PlaylistTracksResponse.class)
                .block();


        if (spotifyResponse == null || spotifyResponse.items() == null) {
            System.err.println("Either communication failed or the list of tracks is NULL");
            return List.of();
        }
        List<PlaylistTrackItem> playlistTrackItems = spotifyResponse.items();

        return playlistTrackItems.stream()
                .map(item -> item.track())
                .filter(Objects::nonNull)
                .map(item -> TrackModelMapper.from(item))
                .toList();
    }
}
