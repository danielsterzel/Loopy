package com.domain.model.macro.DTO;

public record MacroDTO(Long id, String name, String fromSong, String toSong, int crossfadeDuration, int position) { }
