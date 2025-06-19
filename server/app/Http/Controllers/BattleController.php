<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use App\Services\BattleService;
use Illuminate\Http\Request;

class BattleController extends Controller
{
    public function getAllBattles()
    {
        $battle_service = new BattleService();

        $battles = $battle_service->getAllBattles();

        return $this->successResponse(
            $battles,
            'Battles retrieved successfully.'
        );
    }

    public function index(Request $r)
    {
        $battles = Battle::query()
            // ------- dynamic filters -------
            ->when($r->search,  fn($q, $v) => $q->where('title', 'like', "%$v%"))
            ->when($r->ai_model_id, fn($q, $v) =>
            $q->where(function ($q) use ($v) {
                $q->where('ai_model_1_id', $v)
                    ->orWhere('ai_model_2_id', $v);
            }))
            ->when($r->category_id, fn($q, $v) => $q->where('category_id', $v))
            // ------- popularity metric -------
            ->withCount('votes')          // adds votes_count
            ->when(
                $r->sort === 'popular',
                fn($q) => $q->orderByDesc('votes_count')
            )
            ->when(
                $r->sort !== 'popular',
                fn($q) => $q->latest()
            )  // recent
            // ------- pagination -------
            ->cursorPaginate($r->size ?? 20);

        return $this->successResponse(
            $battles,
            'Battles retrieved successfully'
        );
    }

    public function create(Request $request)
    {
        try {
            $battle_service = new BattleService();
            $battle = $battle_service->createBattle($request);

            if ($battle) {
                return $this->successResponse(
                    [
                        'id' => $battle['id']
                    ],
                    'Battle created successfully.'
                );
            }

            return $this->errorResponse('Something went wrong, try again', 500);
        } catch (\Exception $e) {
            // Check if this is the specific AI response error
            if (strpos($e->getMessage(), "AI models failed to generate") !== false) {
                return $this->errorResponse($e->getMessage(), 422);
            }

            // Other errors
            return $this->errorResponse('Error creating battle: ' . $e->getMessage(), 500);
        }
    }

    public function get(int $id)
    {
        $battle_service = new BattleService();
        $battle = $battle_service->getBattle($id);

        if ($battle) {
            return $this->successResponse($battle);
        }

        return $this->errorResponse('Something went wrong, try again', 500);
    }

    public function end($id)
    {
        $battle_service = new BattleService();
        $result = $battle_service->endBattle($id);

        if ($result) {
            return $this->successResponse(['id' => $id, 'is_active' => false], 'Battle has been ended.');
        }

        return $this->errorResponse('Battle is already ended or does not exist.', 400);
    }
}
