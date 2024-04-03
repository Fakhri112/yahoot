<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Host extends Model
{
    use HasFactory;
    protected $fillable = [
        'quiz_detail_id'
    ];
    protected $primaryKey = 'game_pin';

    public static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $game_pin = 0;
            while ($game_pin == 0) {
                $generate_pin = str_pad(mt_rand(1, 9999999), 7, '0', STR_PAD_LEFT);
                $check_db = DB::table('hosts')->where('game_pin', $generate_pin)->get()->first();
                if ($check_db == null) {
                    $game_pin = $generate_pin;
                }
            }
            $model->game_pin = $game_pin;
        });
    }
}
