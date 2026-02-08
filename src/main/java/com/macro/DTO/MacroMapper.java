package com.macro.DTO;


import com.macro.Macro;

public class MacroMapper {
    public static MacroDTO toDto(Macro macro)
    {
        return new MacroDTO(
                macro.getId(),
                macro.getName(),
                macro.getFromSong(),
                macro.getToSong(),
                macro.getCrossfadeDuration(),
                macro.getMacroPosition()
        );
    }
}
