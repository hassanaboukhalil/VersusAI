<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotifications()
    {
        $user = Auth::user();

        $notificationsService = new NotificationService();
        $notifications = $notificationsService->getAllForUser($user->id);

        return $this->successResponse($notifications, 'Notifications fetched successfully.');
    }
}
