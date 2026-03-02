import type { Artist } from "./Artist";
import type { ExternalUrl } from "./ExternalUrl";
import type { Album } from "./Album";

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