package com.domain.model.macro.DTO;

public record CreateMacroDTO(String name, String fromSong, String toSong, Integer crossfadeDuration) { }
