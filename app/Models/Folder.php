<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory, HasUuids;
    protected $keyType = 'string';
    protected $fillable = [
        'folder_name',
        'user_id',
        'parent_folder',
    ];
}
