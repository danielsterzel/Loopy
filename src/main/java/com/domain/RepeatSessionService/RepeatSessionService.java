package com.domain.RepeatSessionService;


import com.domain.model.PlayerState.PlayerState;
import com.domain.model.RepeatSession.RepeatSession;
import com.domain.port.PlayerControlPort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
public class RepeatSessionService {

    private static final int POLLING_DELAY_MS = 3000;
    private final AtomicReference<RepeatSession> activeSession = new AtomicReference<>();
    private final PlayerControlPort playerControl;

    public RepeatSessionService(PlayerControlPort playerControl)
    {
        this.playerControl = playerControl;
    }

    public void startRepeat(RepeatSession repeatSession){}
    public void stopRepeat() {}

    @Scheduled(fixedDelay = POLLING_DELAY_MS)
    public void poll() {}

    private void handleState(PlayerState state, RepeatSession repeatSession){}
}

