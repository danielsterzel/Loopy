import type { PlayerState } from "../types/PLayerState";


export async function rawJson() : Promise<any | null>
{
    const res = await fetch(`/api/player/raw`);
    if (!res.ok) return null;

    return await res.json();
}

export async function getPlayer() : Promise<PlayerState | null> 
{
    const res = await fetch(`/api/player`);
    
    if(res.status == 204) return null;
    if(!res.ok) throw new Error("Failed to fetch player");

    return res.json();
}