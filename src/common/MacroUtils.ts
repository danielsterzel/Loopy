import type {Macro} from "../types/Macro";

export function isMacroEqual(a: Macro, b: Macro): boolean
{
    return (
        a.name === b.name &&
        a.position === b.position &&
        a.fromSong === b.fromSong &&
        a.toSong === b.toSong  &&
        a.crossfadeDuration === b.crossfadeDuration
    );
}