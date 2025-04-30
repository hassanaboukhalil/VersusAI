<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiModel extends Model
{
    use HasFactory;

    protected $fillable = ['provider_name', 'model_name', 'logo_url', 'votes_count'];


    // get the battles where this AI model was the AI model A
    public function battlesAsA()
    {
        return $this->hasMany(Battle::class, 'ai_model_1_id');
    }

    // get the battles where this AI model was the AI model B
    public function battlesAsB()
    {
        return $this->hasMany(Battle::class, 'ai_model_2_id');
    }

    public function allBattles()
    {
        return $this->battlesAsA->merge($this->battlesAsB);
    }


    public function responses()
    {
        return $this->hasMany(BattleResponse::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'ai_model_id');
    }
}
