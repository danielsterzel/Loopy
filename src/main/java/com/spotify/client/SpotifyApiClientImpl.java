package com.spotify.client;

import com.domain.model.Playlist.Playlist;
import com.domain.model.Playlist.PlaylistMapper;
import com.domain.model.Track.TrackModelMapper;
import com.spotify.model.PlayerState.DTO.PlayerResponseDto;
import com.domain.model.PlayerState.PlayerState;
import com.domain.model.PlayerState.PlayerStateMapper;

import com.spotify.model.PlaylistResponse.DTO.PlaylistResponse;
import com.domain.model.Track.TrackModel;
import com.spotify.model.PlaylistTrackItem.DTO.PlaylistTrackItem;
import com.spotify.model.PlaylistTrackResponse.DTO.PlaylistTracksResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class SpotifyApiClientImpl implements SpotifyApiClient {

    private final WebClient webClient;

    public SpotifyApiClientImpl(WebClient webClient) {
        this.webClient = webClient;
    }



    @Override
    public void enqueueTrack(String trackUri) {
    }

    @Override
    public void skipToNext() {
    }

    @Override
    public String getCurrentPlayerRawJson() throws RuntimeException {

        return webClient
                .get()
                .uri("/me/player")
                .retrieve()
                .onStatus(status -> status.value() == 401,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Spotify 401" + body)))
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public List<Playlist> getUserPlaylists() {

        PlaylistResponse response = webClient
                .get()
                .uri("/me/playlists")
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
                .map(PlaylistMapper::from)
                .toList();
    }

    @Override
    public List<TrackModel> getPlaylistTracks(String playlistId) {
        try {
            PlaylistTracksResponse spotifyResponse = webClient
                    .get()
                    .uri("/playlists/{playlist_id}/items", playlistId)
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

            System.out.println("Spotify tracks response: " + spotifyResponse);
            List<PlaylistTrackItem> playlistTrackItems = spotifyResponse.items();

            return playlistTrackItems.stream()
                    .map(PlaylistTrackItem::item)
                    .filter(Objects::nonNull)
                    .map(TrackModelMapper::from)
                    .toList();
        } catch (WebClientResponseException e)
        {
            System.err.println("Spotify denied access to playlist " + playlistId);
            return List.of();
        }
    }
}
