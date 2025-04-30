<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'ai_a_model_id',
        'ai_b_model_id',
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

    public function aiA()
    {
        return $this->belongsTo(AiModel::class, 'ai_a_model_id');
    }

    public function aiB()
    {
        return $this->belongsTo(AiModel::class, 'ai_b_model_id');
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
