package com.macro.DTO;


import com.User.User;
import com.macro.Macro;

public class MacroMapper {
    public static MacroDTO macroToDTO(Macro macro)
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
    public static Macro dtoToEntity(User user, CreateMacroDTO dto, int position)
    {
        return new Macro(
                user,
                dto.name(),
                position,
                dto.fromSong(),
                dto.toSong(),
                dto.crossfadeDuration()

        );
    }
    public static Macro dtoToEntity(User user, MacroDTO macroDTO)
    {

        return new Macro(
                user,
                macroDTO.id(),
                macroDTO.name(),
                macroDTO.position(),
                macroDTO.fromSong(),
                macroDTO.toSong(),
                macroDTO.crossfadeDuration()

        );
    }
}
