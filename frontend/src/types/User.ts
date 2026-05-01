import type { Image } from "./Image.ts";

export interface User {
    display_name : string;
    id: string;
    images: Image[]
};