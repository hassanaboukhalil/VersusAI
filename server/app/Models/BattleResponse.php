<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BattleResponse extends Model
{
    use HasFactory;

    protected $fillable = ['battle_round_id', 'ai_model_id', 'response_text'];

    public function round()
    {
        return $this->belongsTo(BattleRound::class, 'battle_round_id');
    }

    public function ai_model()
    {
        return $this->belongsTo(AiModel::class, 'ai_model_id');
    }
}
