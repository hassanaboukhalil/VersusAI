<?php

namespace Database\Factories;

use App\Models\UserType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_type_id' => UserType::inRandomOrder()->first()->id,
            'first_name' => $this->faker->firstName(),
            'last_name'  => $this->faker->lastName(),
            'username' => $this->faker->unique()->userName(),
            'email'      => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'   => Hash::make('password'),
            'is_premium' => $this->faker->boolean(50),
            'bio'        => $this->faker->sentence(),
            'profile_picture_url' => $this->faker->imageUrl(200, 200),
            'bg_picture_url' => $this->faker->imageUrl(800, 200),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
