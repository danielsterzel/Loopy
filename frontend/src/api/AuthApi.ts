import { BASE_URL } from "../common/APIBase.ts";
import { apiGet, apiPost } from "./spotifyApi.ts";

import type { User } from "../types/User.ts";

export async function fetchUserProfile(): Promise<User | null>{
    return apiGet<User>(`${BASE_URL}/api/me`);
}

export async function getUser()
{
    const data = await fetchUserProfile();

    if(!data) return;
    
    return {
        display_name: data.display_name,
        id: data.id,
        images: data.images 
    } as User
}

export async function logout(){
    await apiPost<void>(`${BASE_URL}/logout`, {});
    console.log("logging out");
}
