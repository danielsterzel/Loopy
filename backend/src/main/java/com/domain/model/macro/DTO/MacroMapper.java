package com.domain.model.macro.DTO;


import com.domain.model.User.User;
import com.domain.model.macro.Macro;

import java.util.Objects;

public class MacroMapper {
    public static MacroDTO entityToDto(Macro macro)
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
    public static boolean isSameContent( Macro macro, MacroDTO macroDTO)
    {
        if( macro == null || macroDTO == null)
        {
            return false;
        }
        return Objects.equals(macro.getName(), macroDTO.name())
                && macro.getMacroPosition() == macroDTO.position()
                && macro.getFromSong().equals(macroDTO.fromSong())
                && macro.getToSong().equals(macroDTO.toSong())
                && macro.getCrossfadeDuration() == macroDTO.crossfadeDuration();
    }
}
