<?php

namespace App\Models;

use App\Traits\VoteableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    use HasFactory, VoteableTrait;

    protected $fillable = [
        'user_id',
        'category_id',
        'ai_model_1_id',
        'ai_model_2_id',
        'title',
        'description',
        'target_language',
        'programming_language',
        'debate_title_1',
        'debate_title_2',
        'temperature',
        'is_active'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function ai_model_1()
    {
        return $this->belongsTo(AiModel::class, 'ai_model_1_id');
    }

    public function ai_model_2()
    {
        return $this->belongsTo(AiModel::class, 'ai_model_2_id');
    }

    public function rounds()
    {
        return $this->hasMany(BattleRound::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
