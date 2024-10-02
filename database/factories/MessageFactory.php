<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Ticket;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content'=> fake()->paragraph(),
            'ticket_id'=> Ticket::inRandomOrder()->first()->id,
            'user_id' => User::where('role', 'admin')->inRandomOrder()->first()->id,
        ];
    }
}