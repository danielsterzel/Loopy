package com.domain.port;

import com.domain.model.PlayerState.PlayerState;
import java.util.Optional;

public interface PlayerControlPort
{
    Optional<PlayerState> getCurrentState();
    void seekToPosition(int positionMs);
    void play();
    void repeatTrack(int positionMs);
//    void setRepeatMode(String mode); // track | context | off
}
