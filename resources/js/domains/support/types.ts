import { Item } from "types/index"

export interface Ticket extends Item {
    title: string
    content: string
    status: string
    category_id: number
    user_id: number
    admin_id: number
}