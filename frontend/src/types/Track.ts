import type { Artist } from "./Artist.ts";
import type { ExternalUrl } from "./ExternalUrl.ts";
import type { Album } from "./Album.ts";

export type Track = {
    id: string;
    name: string;
    uri: string;
    artists: Artist[];
    externalUrls: ExternalUrl;
    href: string;
    durationMs: number;
    explicit: boolean;
    isLocal: boolean;
    album: Album;
}