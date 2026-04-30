package com.domain.model.RepeatSession;

/***
 * 1 session per user -> user can only listen to 1 song no need for multiple sessions.
 * */

public record RepeatSession(
        String trackId,
        String trackName,
        int startMs,
        int endMs,
        String userId)
{
    @Override
    public boolean equals(Object object) {

        if(this == object) return true;
        if(!(object instanceof RepeatSession session)) return false;

        return this.userId.contentEquals(session.userId()) &&
                this.trackId.contentEquals(session.trackId()) &&
                this.endMs() == session.endMs() && this.startMs() == session.startMs();
    }
}
