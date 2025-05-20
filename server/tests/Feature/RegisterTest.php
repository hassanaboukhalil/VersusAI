<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Database\Seeders\UserTypeSeeder;

class RegisterTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(UserTypeSeeder::class);
    }

    public function test_user_can_register_with_valid_credentials()
    {
        $response = $this->postJson('/api/v1/signup', [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'username' => $this->faker->userName(),
            'email' => $this->faker->email(),
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
    }

    public function test_user_cannot_register_without_required_fields()
    {
        $response = $this->postJson('/api/v1/signup', []);

        $response->assertStatus(422);
    }

    public function test_user_cannot_register_with_invalid_email()
    {
        $response = $this->postJson('/api/v1/signup', [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'username' => $this->faker->userName(),
            'email' => 'invalid-email',
            'password' => 'password123',
            'password_confirmation' => 'password123'
        ]);

        $response->assertStatus(422);
    }
}
