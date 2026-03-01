package com.domain.model.Playlist;

import com.domain.model.Image.Image;
import com.domain.model.TrackInfo.TracksInfo;

import java.util.List;

public record Playlist(String id, String name, String imageUrl, int totalTracks) {
}
