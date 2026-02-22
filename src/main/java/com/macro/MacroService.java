package com.macro;

import com.User.User;
import com.macro.DTO.MacroDTO;
import com.macro.DTO.MacroMapper;
import com.macro.DTO.RenameMacro;
import com.macro.repository.MacroRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MacroService {

    private final MacroRepository macroRepository;

    public MacroService(MacroRepository macroRepository){
        this.macroRepository = macroRepository;
    }

    public List<Macro> getAllForUser(User user) {
        return macroRepository.findAllByUser(user);
    }

    public Macro getByIdForUser(User user, Long id) {
        return macroRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Macro not found"));
    }
    public Macro getMacroByName(User user, String name)
    {
        return macroRepository.findByUserAndName(user, name)
                .orElseThrow(() -> new IllegalArgumentException("Macro with given name does not exist."));
    }
    public Macro getMacroByNameIgnoreCase(User user, String name)
    {
        return macroRepository.findByUserAndNameIgnoreCase(user, name)
                .orElseThrow(() -> new IllegalArgumentException("Macro with given name does not exist."));
    }
    public Macro create(User user, String name, int position, String fromSong, String toSong, Integer crossfadeDuration)
    {
        Macro macro = new Macro(user, name, position,fromSong, toSong, crossfadeDuration);
        return macroRepository.save(macro);
    }
    public Macro save(Macro macro)
    {
        return macroRepository.save(macro);
    }
    public int getNextPosition(User user){
        return macroRepository.findMaxPositionbyUser(user)+ 1;
    }

    @Transactional // changes in database in this method are one operation.
    public MacroDTO renameMacro(User user, RenameMacro renameMacro)
    {
        System.out.println("Rename request id=" + renameMacro.id() + " name=" + renameMacro.name());
        Macro macro = getByIdForUser(user, renameMacro.id());

        macro.setName(renameMacro.name());
        return MacroMapper.macroToDTO(macro);
    }
}
