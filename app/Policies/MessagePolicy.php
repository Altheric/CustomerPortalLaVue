<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MessagePolicy
{
    public function store(User $user){
        return $user->is_admin;
    }
    public function update(User $user){
        return $user->is_admin;
    }
}
