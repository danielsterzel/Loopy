package com.domain.RepeatSessionService;

import com.domain.model.Track.TrackModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.domain.model.PlayerState.PlayerState;
import com.domain.model.RepeatSession.RepeatSession;
import com.domain.port.PlayerControlPort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class RepeatSessionService {

    private static final Logger log = LoggerFactory.getLogger(RepeatSessionService.class);

    private static final int POLLING_DELAY_MS = 3000;
    private final AtomicReference<RepeatSession> activeSession = new AtomicReference<>();
    private final PlayerControlPort playerControl;

    public RepeatSessionService(PlayerControlPort playerControl)
    {
        this.playerControl = playerControl;
    }

    public void startRepeat(RepeatSession session){
        activeSession.set(session);
    }
    public void stopRepeat() {
        activeSession.set(null);
    }
    public Optional<TrackModel> pullCurrentlyPlaying()
    {
        return  playerControl.getCurrentState().map(
                PlayerState::item
        );
    }

    @Scheduled(fixedDelay = POLLING_DELAY_MS)
    public void poll() {
        RepeatSession currentSession = activeSession.get();
        if(currentSession == null) return;

        playerControl.getCurrentState().ifPresentOrElse(
                state -> handleState(state, currentSession),
                () -> log.warn("No response from Spotify")
        );
    }

    private void handleState(PlayerState state, RepeatSession repeatSession)
    {
        log.info("handleState: progress={}ms, start={}ms, end={}ms, isPlaying={}, trackId={}, sessionTrackId={}",
                state.progressInMs(), repeatSession.startMs(), repeatSession.endMs(),
                state.isPlaying(), state.item().id(), repeatSession.trackId());
        // definitely refactor this
        if(!state.isPlaying()) return;
        if(!state.item().id().equals(repeatSession.trackId()))
        {
            stopRepeat();
            return;
        }
        if(state.progressInMs() < repeatSession.startMs() || state.progressInMs() > repeatSession.endMs())
        {
            playerControl.repeatTrack(repeatSession.startMs());
        }


    }
}

