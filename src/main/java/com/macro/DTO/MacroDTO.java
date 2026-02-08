package com.macro.DTO;

public record MacroDTO(Long id, String name, String fromSong, String toSong, int crossfadeDuration, int position) { }
