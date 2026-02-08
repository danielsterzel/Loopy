package com.macro.repository;

import com.User.User;
import com.macro.Macro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MacroRepository extends JpaRepository<Macro, Long> {

    Optional<Macro> findByUserAndName(User user, String name);

    Optional<Macro> findByUserAndNameIgnoreCase(User user, String name);

    List<Macro> findAllByUser(User user);

    Optional<Macro> findByIdAndUser(Long id, User user);
}
