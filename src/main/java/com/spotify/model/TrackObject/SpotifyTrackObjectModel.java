package com.spotify.model.TrackObject;

import com.spotify.model.Artist.Artist;
import com.spotify.model.ExternalUrl.ExternalUrl;

import java.util.List;

public record SpotifyTrackObjectModel(List<Artist> artistNames,
                                      ExternalUrl spotifyTrackUrl,
                                      String spotifyWebApiEndpoint,
                                      String spotifyTrackId,
                                      String trackName,
                                      String spotifyTrackUri,
                                      int durationInMs,
                                      boolean trackHasExplicitLyrics,
                                      boolean isLocalFile) {
}
