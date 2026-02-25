package com.spotify.model.Playlist;

import com.spotify.model.Image.Image;
import com.spotify.model.TracksInfo.TracksInfo;

import java.util.List;

public record UserPlaylist(String id, String name, List<Image> images, TracksInfo tracks) {
}
