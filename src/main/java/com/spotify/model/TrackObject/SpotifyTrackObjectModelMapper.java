package com.spotify.model.TrackObject;

import com.spotify.model.Artist.Artist;
import com.spotify.model.Artist.ArtistModelMapper;
import com.spotify.model.ExternalUrl.ExternalUrl;
import com.spotify.model.ExternalUrl.ExternalUrlMapper;
import com.spotify.model.Album.Album;
//import com.spotify.model.Album.AlbumModelMapper;
import com.spotify.model.Image.Image;
import com.spotify.model.TrackObject.DTO.SpotifyTrackDto;

import java.util.List;

public class SpotifyTrackObjectModelMapper {

    public static SpotifyTrackObjectModel from(SpotifyTrackDto item)
    {
        if (item == null) {
            return null;
        }

        List<Artist> artists = ArtistModelMapper.fromList(item.artistNames());
        ExternalUrl url = ExternalUrlMapper.from(item.spotifyTrackUrl());
//        Album album = AlbumModelMapper.from(item.album());

//        Album album = new Album(;
        return new SpotifyTrackObjectModel(
                item.spotifyTrackId(),          // id
                item.trackName(),               // name
                item.trackUri(),                // uri
                artists,                        // artists
                url,                            // external_urls
                item.spotifyWebApiEndpoint(),  // href
                item.durationInMs(),           // duration_ms
                item.trackHasExplicitLyrics(), // explicit
                item.isLocalFile()            // is_local
//                album                          // album
        );
    }
}