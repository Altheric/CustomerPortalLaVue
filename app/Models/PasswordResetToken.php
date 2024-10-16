<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    use HasFactory;
    //This is here so Laravel wont try to fill a non-existent column
    const UPDATED_AT = null;
    
    protected $fillable = [
        'email',
        'token',
    ];
}
