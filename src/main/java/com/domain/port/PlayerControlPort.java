package com.domain.port;

import com.domain.model.PlayerState.PlayerState;
import java.util.Optional;

public interface PlayerControlPort
{
    Optional<PlayerState> getCurrentState(String id);
    void seekToPosition(String id, int positionMs);
    void play(String id);
    void repeatTrack(String id,int positionMs);
//    void setRepeatMode(String mode); // track | context | off
}
