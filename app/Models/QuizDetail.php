<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizDetail extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'quiz_name',
        'visibility',
        'quiz_description',
        'thumbnail',
        'total_players',
        'total_plays',
        'user_id',
        'folder_id'
    ];
}
