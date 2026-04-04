package com.domain.RepeatSessionService;

import com.domain.model.RepeatSession.RepeatSessionStorage;
import com.domain.model.Track.TrackModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.domain.model.PlayerState.PlayerState;
import com.domain.model.RepeatSession.RepeatSession;
import com.domain.port.PlayerControlPort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RepeatSessionService {

    private static final Logger log = LoggerFactory.getLogger(RepeatSessionService.class);

    private static final int POLLING_DELAY_MS = 3000;

    private final RepeatSessionStorage storage;

    private final PlayerControlPort playerControl;

    public RepeatSessionService(PlayerControlPort playerControl, RepeatSessionStorage storage)
    {
        this.playerControl = playerControl;
        this.storage = storage;
    }

    public void startRepeat(RepeatSession session){
        storage.extendSessionMap(session);
    }
    public void stopRepeat(String id) {
        storage.clearSession(id);
    }
    public Optional<TrackModel> pullCurrentlyPlaying(String id)
    {
        return  playerControl.getCurrentState(id).map(
                PlayerState::item
        );
    }

    @Scheduled(fixedDelay = POLLING_DELAY_MS)
    public void poll() {

        var sessions = storage.getAllSessions();

        if(sessions == null || sessions.isEmpty())
        {
            return;
        }

        for(var session : sessions)
        {
            //error prone
            playerControl.getCurrentState(session.userId()).ifPresentOrElse(
                    state -> handleState(state, session),
                    () -> log.warn("No response from Spotify for user {}", session.userId())
            );
        }
//        playerControl.getCurrentState().ifPresentOrElse(
//                state -> handleState(state, currentSession.get()),
//                () -> log.warn("No response from Spotify")
//        );
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
            stopRepeat(repeatSession.userId());
            return;
        }
        if(state.progressInMs() < repeatSession.startMs() || state.progressInMs() > repeatSession.endMs())
        {
            playerControl.repeatTrack(repeatSession.userId(),repeatSession.startMs());
        }


    }
}

