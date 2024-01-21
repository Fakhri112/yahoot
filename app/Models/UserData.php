<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;
    protected $fillable = [
        'player_counts',
        'quiz_total',
        'plays_count',
        'user_id'
    ];
}
