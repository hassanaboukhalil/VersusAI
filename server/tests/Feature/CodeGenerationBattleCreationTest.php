<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\AiModelSeeder;
use Database\Seeders\UserTypeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CodeGenerationBattleCreationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_user_can_create_code_generation_battle()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $payload = [
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph(3),
            'battle_type_name' => 'Code Generation',
            'ai_model_1_name' => 'gemini-2.0-flash',
            'ai_model_2_name' => 'deepseek-prover-v2',
            'target_language' => 'Python',
            'temperature' => 0.2,
            'programming_language' => 'Python',
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
