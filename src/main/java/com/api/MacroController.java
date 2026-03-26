package com.api;


import com.domain.model.User.User;
import com.domain.model.User.UserService;
import com.domain.model.macro.DTO.CreateMacroDTO;
import com.domain.model.macro.DTO.MacroDTO;
import com.domain.model.macro.DTO.MacroMapper;
import com.domain.model.macro.DTO.RenameMacro;
import com.domain.model.macro.Macro;
import com.domain.model.macro.MacroService;

import org.springframework.http.ResponseEntity;
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
        return macroService.gettAllForUserOrderByPositionAsc(user).stream().map(MacroMapper::entityToDto).toList();
    }

    @PostMapping("/create")
    public MacroDTO createMacro(@AuthenticationPrincipal OAuth2User oAuth2User,
                                @RequestBody CreateMacroDTO createMacroDTO)
    {
        User user = userService.getOrCreate(oAuth2User);

        int position = macroService.getNextPosition(user);

        Macro macro = MacroMapper.dtoToEntity(user, createMacroDTO, position);
        Macro saved = macroService.save(macro);

        return MacroMapper.entityToDto(saved);
    }
    @PostMapping("/rename")
    public MacroDTO renameMacro(@AuthenticationPrincipal OAuth2User oaUth2User,
                                @RequestBody RenameMacro renameMacro)
    {
        User user = userService.getOrCreate(oaUth2User);

        return macroService.renameMacro(user, renameMacro);
    }

    @PostMapping("/save/configuration")
    public MacroDTO saveMacroConfiguration(@AuthenticationPrincipal OAuth2User oAuth2User,
                                                 @RequestBody MacroDTO reconfiguredMacro)
    {
        User user = userService.getOrCreate(oAuth2User);

        Macro macro = macroService.getByIdForUser(user, reconfiguredMacro.id());
        macroService.handleMacroReconfiguration(macro, reconfiguredMacro);

        return MacroMapper.entityToDto(macro);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMacro(
            @AuthenticationPrincipal OAuth2User oAuth2User,
            @PathVariable Long id)
    {
        User user = userService.getOrCreate(oAuth2User);

        macroService.deleteMacro(user, id);
        return ResponseEntity.noContent().build();
    }
}
