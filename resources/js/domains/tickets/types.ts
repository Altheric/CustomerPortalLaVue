import { Item } from "types/index"
import { User } from "domains/user/types"

export interface Ticket extends Item {
    title: string
    content: string
    status: string | null
    category_id: number
    user_id: number
    admin_id?: number | null
    user?: User
}