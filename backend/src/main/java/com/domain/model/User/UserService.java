package com.domain.model.User;

import com.domain.model.User.Repository.UserRepository;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){ this.userRepository = userRepository; }

    public User getOrCreate(OAuth2User oauthUser)
    {
        String spotifyUserId = oauthUser.getAttribute("id");
        String displayName = oauthUser.getAttribute("display_name");

        return userRepository.findBySpotifyUserId(spotifyUserId).orElseGet(() -> userRepository.save(new User(spotifyUserId, displayName)));
    }
}
