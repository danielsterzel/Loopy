package com.api;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    // authenticated users already handled in SecurityConfig
    @GetMapping("/")
    public String index(Model model, @AuthenticationPrincipal OAuth2User user)
    {
        // Model -> data container used to pass data from controller to a view. So
        // it holds attributes necessary for an HTML view

        model.addAttribute("user", user.getAttributes());
        return "dashboard";
        //@AuthenticationPrincipal - injects currently authenticated user
    }
}
