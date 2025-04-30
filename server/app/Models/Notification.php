<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'notifier_id',
        'target_id',
        'type',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    /**
     * The user who received the notification
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The user who triggered the notification (e.g. the follower or voter)
     */
    public function notifier()
    {
        return $this->belongsTo(User::class, 'notifier_id');
    }

    /**
     * Get the target object of the notification if needed.
     *
     * For example: if the type is 'vote_cast', then target_id refers to a battle.
     */
    public function targetBattle()
    {
        if ($this->type === 'vote_cast') {
            return $this->belongsTo(Battle::class, 'target_id');
        }

        return null;
    }
}
