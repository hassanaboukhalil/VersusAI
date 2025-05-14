<?php

use Illuminate\Support\Facades\Broadcast;

//--  Broadcast Channels

// Battle Vote Channel

Broadcast::channel('battle.{id}', function ($user, $id) {
    return true; // Allow all authenticated users to listen to battle channels
});
