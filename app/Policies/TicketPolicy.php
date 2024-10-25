<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TicketPolicy
{
    public function store(User $user, Ticket $ticket){
        return $user->id == $ticket->user_id;
    }
    public function update(User $user, Ticket $ticket){
        return $user->id == $ticket->user_id || $user->is_admin;
    }
    public function assign(User $user){
        return $user->is_admin;
    }
    
}
