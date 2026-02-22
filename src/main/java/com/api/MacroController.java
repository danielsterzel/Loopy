package com.api;


import com.User.User;
import com.User.UserService;
import com.macro.DTO.CreateMacroDTO;
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
    public List<MacroDTO> getMacros(@AuthenticationPrincipal OAuth2User oAuth2User)
    {
        User user = userService.getOrCreate(oAuth2User);
        return macroService.getAllForUser(user).stream().map(MacroMapper::macroToDTO).toList();
    }

    @PostMapping("/create")
    public MacroDTO createMacro(@AuthenticationPrincipal OAuth2User oAuth2User,
                                @RequestBody CreateMacroDTO createMacroDTO)
    {
        User user = userService.getOrCreate(oAuth2User);

        int position = macroService.getNextPosition(user);

        Macro macro = MacroMapper.dtoToEntity(user, createMacroDTO, position);
        Macro saved = macroService.save(macro);

        return MacroMapper.macroToDTO(saved);
    }
}
