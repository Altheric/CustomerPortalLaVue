import { Item } from "types/index"

export interface User extends Item {
    name: string;
    email: string;
    role: string;
}