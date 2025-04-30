<?php

namespace App\Traits;

trait ResponseTrait
{
    public function successResponse($data = [], $message = 'Success', $code = 200)
    {
        return response()->json([
            "success" => true,
            "message" => $message,
            "data" => $data
        ], $code);
    }

    public function errorResponse($message = 'Error occurred', $code = 400)
    {
        return response()->json([
            "success" => false,
            "message" => $message,
        ], $code);
    }
}
