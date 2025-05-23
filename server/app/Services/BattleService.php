<?php

namespace App\Services;

use App\Models\AiModel;
use App\Models\Battle;
use App\Models\BattleResponse;
use App\Models\BattleRound;
use App\Models\Category;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BattleService
{
    public function getAllBattles(): array
    {
        $all_battles = Battle::where('is_active', false)->with('user', 'category', 'ai_model_1', 'ai_model_2', 'votes')->orderBy('created_at', 'desc')->get();

        $battles = [];

        foreach ($all_battles as $battle) {
            $votes_ai_model_1 = 0;
            $votes_ai_model_2 = 0;

            foreach ($battle->votes as $vote) {
                if ($vote->ai_model_id === $battle->ai_model_1_id) {
                    $votes_ai_model_1++;
                } else {
                    $votes_ai_model_2++;
                }
            }

            $battles[] = [
                'id' => $battle->id,
                'title' => $battle->title,
                'type' => $battle->category->name,
                'temperature' => $battle->temperature,
                'ai_model_1_id' => $battle->ai_model_1_id,
                'ai_model_2_id' => $battle->ai_model_2_id,
                'ai_model_1_name' => $battle->ai_model_1->model_name,
                'ai_model_2_name' => $battle->ai_model_2->model_name,
                'votes_ai_model_1' => $votes_ai_model_1,
                'votes_ai_model_2' => $votes_ai_model_2,
                'user_first_name' => $battle->user->first_name,
                'user_last_name' => $battle->user->last_name,
                'user_profile_pic_url' => $battle->user->profile_picture_url,
                'created_at' => $battle->created_at->format('j/n/Y'),
            ];
        }

        return $battles;
    }

    public function createBattle(Request $request): array
    {
        $user = Auth::user();

        $category = Category::where("name", $request->battle_type_name)->firstOrFail();
        $ai_model_1 = AiModel::where("model_name", $request->ai_model_1_name)->firstOrFail();
        $ai_model_2 = AiModel::where("model_name", $request->ai_model_2_name)->firstOrFail();

        $battle = Battle::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'ai_model_1_id' => $ai_model_1->id,
            'ai_model_2_id' => $ai_model_2->id,
            'temperature' => $request->temperature,
            'title' => $request->title,
            'description' => $request->description,
            'target_language' => $request->battle_type_name === 'Text Translation' ? $request->target_language : null,
            'programming_language' => $request->battle_type_name === 'Code Generation' ? $request->programming_language : null,
            'debate_title_1' => $request->battle_type_name === 'Debate Challenge' ? $request->debate_title_1 : null,
            'debate_title_2' => $request->battle_type_name === 'Debate Challenge' ? $request->debate_title_2 : null
        ]);

        $round_service = new BattleRoundService();
        return $round_service->createRoundAndResponses($battle, $request, 1);
    }

    public function getBattle(int $id): array
    {
        $battle_id = $id;
        $battle = Battle::with([
            'user:id,first_name,last_name,username,profile_picture_url',
            'category:id,name',
            'ai_model_1:id,model_name',
            'ai_model_2:id,model_name',
            'votes',
            'rounds.responses.ai_model:id,model_name'
        ])->findOrFail($battle_id);

        // Count votes
        $votes_ai_model_1 = $battle->votes->where('ai_model_id', $battle->ai_model_1_id)->count();
        $votes_ai_model_2 = $battle->votes->where('ai_model_id', $battle->ai_model_2_id)->count();

        // Format rounds with responses
        $formattedRounds = $battle->rounds->map(function ($round) {
            return [
                'id' => $round->id,
                'responses' => $round->responses->map(function ($response) {
                    return [
                        'ai_model_name' => $response->ai_model->model_name,
                        'response_text' => $response->response_text,
                        'response_time_ms' => $response->response_time_ms,
                        'prompt_tokens' => $response->prompt_tokens,
                        'completion_tokens' => $response->completion_tokens,
                    ];
                })->toArray()
            ];
        });

        return [
            'id' => $battle->id,
            'title' => $battle->title,
            'type' => $battle->category->name,
            'description' => $battle->description,
            'target_language' => $battle->target_language,
            'programming_language' => $battle->programming_language,
            'debate_title_1' => $battle->debate_title_1,
            'debate_title_2' => $battle->debate_title_2,
            'is_active' => $battle->is_active,
            'ai_models' => [
                [
                    'name' => $battle->ai_model_1->model_name,
                    'votes' => $votes_ai_model_1
                ],
                [
                    'name' => $battle->ai_model_2->model_name,
                    'votes' => $votes_ai_model_2
                ]
            ],
            'user' => [
                'first_name' => $battle->user->first_name,
                'last_name' => $battle->user->last_name,
                'username' => $battle->user->username,
                'profile_picture_url' => $battle->user->profile_picture_url,
            ],
            'rounds' => $formattedRounds,
        ];
    }

    public function endBattle(int $battle_id): bool
    {
        $battle = Battle::find($battle_id);

        if (!$battle || !$battle->is_active) {
            return false;
        }

        $battle->is_active = false;
        $battle->save();

        return true;
    }
}
