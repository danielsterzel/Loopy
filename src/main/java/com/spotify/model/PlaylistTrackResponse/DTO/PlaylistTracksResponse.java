package com.spotify.model.PlaylistTrackResponse.DTO;

import com.spotify.model.PlaylistTrackItem.DTO.PlaylistTrackItem;

import java.util.List;

public record PlaylistTracksResponse(List<PlaylistTrackItem> items, int total, int limit, int offset) {}
