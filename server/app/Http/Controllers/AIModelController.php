<?php

namespace App\Http\Controllers;

use App\Models\AiModel;
use Illuminate\Http\Request;

class AIModelController extends Controller
{
    public function index()
    {
        try {
            $aiModels = AiModel::select('id', 'provider_name', 'model_name', 'logo_url', 'votes_count')
                ->orderBy('provider_name')
                ->orderBy('model_name')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $aiModels
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch AI models'
            ], 500);
        }
    }
}
