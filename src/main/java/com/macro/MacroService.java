package com.macro;

import com.User.User;
import com.macro.DTO.MacroDTO;
import com.macro.DTO.MacroMapper;
import com.macro.DTO.RenameMacro;
import com.macro.repository.MacroRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MacroService {

    private final MacroRepository macroRepository;

    public MacroService(MacroRepository macroRepository){
        this.macroRepository = macroRepository;
    }

    public List<Macro> getAllForUser(User user) {
        return macroRepository.findAllByUser(user);
    }
    public List<Macro> gettAllForUserOrderByPositionAsc(User user){return macroRepository.findAllByUserOrderByPositionAsc(user);}

    public Macro getByIdForUser(User user, Long id) {
        return macroRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Macro not found"));
    }
    public Macro getByPositionAndUser(User user, int position)
    {
        return macroRepository.findByUserAndPosition(user, position)
                .orElseThrow(() -> new IllegalArgumentException("Macro with given postition not found"));
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

    @Transactional // changes in database in this method are one operation. Eliminates race conditions
    public MacroDTO renameMacro(User user, RenameMacro renameMacro)
    {
        System.out.println("Rename request id=" + renameMacro.id() + " name=" + renameMacro.name());
        Macro macro = getByIdForUser(user, renameMacro.id());

        macro.setName(renameMacro.name());
        return MacroMapper.entityToDto(macro);
    }

    @Transactional
    public void handlePositionChange(User user, Macro other, int newPosition)
    {
        if(other.getMacroPosition() == newPosition)
        {
            return;
        }
        Optional<Macro> macro = macroRepository.findByUserAndPosition(user, newPosition);
        macro.ifPresentOrElse((unpackedMacro) -> {
            int tempPosition = other.getMacroPosition();
            other.setMacroPositionInList(newPosition);
            unpackedMacro.setMacroPositionInList(tempPosition);
        }, () -> {
            other.setMacroPositionInList(newPosition);
        });
    }

    @Transactional
    public void handleMacroReconfiguration(Macro macro, MacroDTO macroReconfiguration)
    {
        if(MacroMapper.isSameContent(macro, macroReconfiguration))
        {
            System.out.println("NO RECONFIG -> NOT NEEDED");
            return;
        }
        macro.setCrossfadeDuration(macroReconfiguration.crossfadeDuration());
        macro.setFromSong(macroReconfiguration.fromSong());
        macro.setToSong(macroReconfiguration.toSong());
    }
    @Transactional
    public void deleteMacro(User user, Long id)
    {
        Macro macro = getByIdForUser(user, id);
        macroRepository.delete(macro);

        List<Macro> macros = macroRepository.findAllByUserOrderByPositionAsc(user);
        int pos = 1;
        for (var m: macros)
        {
            m.setMacroPositionInList(pos++);
        }
    }
}
