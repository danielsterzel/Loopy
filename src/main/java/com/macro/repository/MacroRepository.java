package com.macro.repository;

import com.User.User;
import com.macro.Macro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MacroRepository extends JpaRepository<Macro, Long> {

    Optional<Macro> findByUserAndName(User user, String name);

    Optional<Macro> findByUserAndNameIgnoreCase(User user, String name);

    List<Macro> findAllByUser(User user);
    List<Macro> findAllByUserOrderByPositionAsc(User user);

    Optional<Macro> findByIdAndUser(Long id, User user);
    Optional<Macro> findByUserAndPosition(User user, int position);

    @Query("SELECT COALESCE(MAX(m.position), 0) FROM Macro m WHERE m.user = :user")
    int findMaxPositionbyUser(@Param("user") User user);
    // :user is a placeholder
}
