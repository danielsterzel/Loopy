package com.api;


import com.User.User;
import com.User.UserService;
import com.macro.DTO.MacroDTO;
import com.macro.DTO.MacroMapper;
import com.macro.Macro;
import com.macro.MacroService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/macros")
public class MacroController {
    private final MacroService macroService;
    private final UserService userService;

    public MacroController(MacroService macroService, UserService userService){this.macroService = macroService;
        this.userService = userService;
    }

    @GetMapping
    public List<MacroDTO> getMacros(@AuthenticationPrincipal OAuth2User oAuthUser)
    {
        User user = userService.getOrCreate(oAuthUser);
        return macroService.getAllForUser(user).stream().map(MacroMapper::toDto).toList();
    }
}
