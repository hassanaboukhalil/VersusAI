<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

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

    // Get all notifications for a user (latest first)
    public function getAllForUser(int $userId)
    {
        $notifications = Notification::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();

        foreach ($notifications as $notification) {
            $notification->notifier_name = User::find($notification->notifier_id)->name;
        }

        return $notifications;
    }

    // Get unread notifications only
    public function getUnreadForUser(int $userId)
    {
        return Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->orderByDesc('created_at')
            ->get();
    }

    // Mark all notifications for the user as read
    public function markAllAsRead(int $userId): int
    {
        return Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);
    }
}
