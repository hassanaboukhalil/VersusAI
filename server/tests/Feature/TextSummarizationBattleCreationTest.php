<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AiModelSeeder;
use Database\Seeders\UserTypeSeeder;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Services\BattleResponseService;
use Illuminate\Support\Facades\App;

class TextSummarizationBattleCreationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(); // Safe to run after binding
    }

    public function test_user_can_create_text_summarization_battle()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $payload = [
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(3),
            'battle_type_name' => 'Text Summarization',
            'ai_model_1_name' => 'gemini-2.0-flash',
            'ai_model_2_name' => 'deepseek-prover-v2',
        ];

        $response = $this->postJson('/api/v1/premium/create-battle', $payload);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['id']
        ]);

        $this->assertDatabaseHas('battles', [
            'title' => $payload['title'],
            'description' => $payload['description']
        ]);
    }
}
