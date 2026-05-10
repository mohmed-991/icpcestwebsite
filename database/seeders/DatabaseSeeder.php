<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LevelSeeder::class,
            LessonSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '01234567890',
            'college' => 'Egyptian University of Science and Technology',
            'department' => 'Computer Science',
            'codeforces_handle' => 'test_handle',
            'rating' => 1200,
            'current_level' => 1,
        ]);
    }
}
