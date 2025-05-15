<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    // Create a new notification for a user
    public function create(
        int $userId,
        int $notifierId,
        string $type,
        string $message,
        ?int $targetId = null
    ): Notification {
        return Notification::create([
            'user_id'     => $userId,
            'notifier_id' => $notifierId,
            'type'        => $type,
            'message'     => $message,
            'target_id'   => $targetId,
            'is_read'     => false,
        ]);
    }
}
