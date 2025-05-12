<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BattleRound extends Model
{
    use HasFactory;

    protected $fillable = ['battle_id', 'round_number'];

    public function battle()
    {
        return $this->belongsTo(Battle::class, 'battle_round_id');
    }

    public function responses()
    {
        return $this->hasMany(BattleResponse::class);
    }
}
