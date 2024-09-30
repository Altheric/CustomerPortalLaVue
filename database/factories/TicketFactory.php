<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'content'=> fake()->paragraph(),
            'category_id'=> Category::inRandomOrder()->first()->id,
            'user_id' => User::where('role', 'user')->inRandomOrder()->first()->id,
            'admin_id' => User::where('role', 'admin')->inRandomOrder()->first()->id,
        ];
    }
}
