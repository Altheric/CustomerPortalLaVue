<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'status',
        'category_id',
        'user_id',
        'admin_id'
    ];
    public function category(){
        return $this->hasOne(Category::class);
    }
    public function messages(){
        return $this->hasMany(Message::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
