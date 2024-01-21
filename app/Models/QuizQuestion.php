<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;
    protected $fillable = [
        'quiz_detail_id',
        'duration',
        'question_image',
        'question_title',
        'A',
        'B',
        'C',
        'D',
        'correct_answer'

    ];
}
