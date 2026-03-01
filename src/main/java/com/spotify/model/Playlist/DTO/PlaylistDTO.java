package com.spotify.model.Playlist.DTO;

import com.spotify.model.Image.DTO.ImageDTO;
import com.spotify.model.Tracks.DTO.TracksDTO;

import java.util.List;

public record PlaylistDTO(String id, String name, List<ImageDTO> images, TracksDTO tracks) {}
