import { BASE_URL } from "../common/APIBase";
import { apiGet, apiPost } from "./spotifyApi";

export type User = {name: string};

export async function fetchUserProfile(): Promise<User | null>{
    return apiGet<User>(`${BASE_URL}/user`);
}
export async function logout(){
    await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"
    });

}