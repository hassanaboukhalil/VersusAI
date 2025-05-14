<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'battle_id',
        'ai_model_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function battle()
    {
        return $this->belongsTo(Battle::class);
    }

    public function aiModel()
    {
        return $this->belongsTo(AiModel::class, 'ai_model_id');
    }
}
