package com.spotify.model.PlaylistResponse.DTO;

import com.spotify.model.Playlist.DTO.PlaylistDTO;

import java.util.List;

public record PlaylistResponse(List<PlaylistDTO> items, int total) {
}
