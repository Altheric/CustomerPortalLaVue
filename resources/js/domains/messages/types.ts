import { Item } from "types/index"

export interface Message extends Item {
    content: string
    type: string
    ticket_id: number
    user_id: number
}