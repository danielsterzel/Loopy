package com.domain.model.RepeatSession;

public record RepeatSession(
        String trackId,
        String trackName,
        int startMs,
        int endMs)
{
    public static RepeatSession of(String trackId, String trackName, int startMs, int endMs)
    {
        return new RepeatSession(trackId, trackName, startMs, endMs);
    }
}
