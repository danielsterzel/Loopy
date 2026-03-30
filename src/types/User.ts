import type { Image } from "./Image";

export interface User {
    display_name : string;
    id: string;
    images: Image[]
};