package com.domain.model.RepeatSession;

import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class RepeatSessionStorage {

    private final ConcurrentMap<String, RepeatSession> repeatSessionMap = new ConcurrentHashMap<>();
    static private final Logger log = LoggerFactory.getLogger(RepeatSessionStorage.class);

    public RepeatSessionStorage(){}

    public void extendSessionMap(RepeatSession session)
    {
        if(session == null){

            throw new IllegalArgumentException("Session is null or user connected to session is null");
        }
        RepeatSession existing = repeatSessionMap.putIfAbsent(session.userId(), session);

        if (existing != null) {
            log.warn("Session already exists for user {}", session.userId());
        }

        log.info("Created session for user: {} with song: {}", session.userId(), session.trackName());

    }
    public Optional<RepeatSession> querySessionById(String id)
    {
        if(id == null || id.isBlank())
        {
            throw new IllegalArgumentException("Cannot query session storage by passing in null user ID");
        }
        RepeatSession userSession = repeatSessionMap.get(id);

        Optional<RepeatSession> result = Optional.ofNullable(userSession);

        if(result.isEmpty())
        {
            log.warn("No repeat session for user: {} has been created", id);
        }
        return result;
    }

    public void updateSessionInMap(RepeatSession session)
    {
        if(session == null)
        {
            log.error("Cannot update a session with one that is non-existent(null)");
            return;
        }

        var current = querySessionById(session.userId());

        current.ifPresentOrElse(
                curr ->{

                    if(curr.equals(session))
                    {
                        log.warn("Sessions are identical -> skipping...");
                        return;
                    }

                    repeatSessionMap.replace(curr.userId(), curr, session);
                },
                () -> log.warn("No session found with user id: {}", session.userId())
        );
    }

    public void clearSession(String id)
    {
        var current = querySessionById(id);

        current.ifPresentOrElse(
                curr -> repeatSessionMap.remove(curr.userId(), curr),
                () -> log.error("Cannot clear a session that does not exist!")
        );
    }

    public Collection<RepeatSession> getAllSessions()
    {
        return repeatSessionMap.values();
    }
}
