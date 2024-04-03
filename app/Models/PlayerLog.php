<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerLog extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'answered',
        'correct_incorrect',
        'time',
        'points',
        'quiz_questions_for_report_id',
        'player_summary_result_id'
    ];
}
