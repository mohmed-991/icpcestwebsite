<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Newcomers Level
        $level1 = \App\Models\Level::where('name', 'Newcomers')->first();

        $lesson1 = \App\Models\Lesson::create([
            'title' => 'مقدمة في C++',
            'description' => 'تعلم أساسيات لغة C++',
            'level_id' => $level1->id,
            'video_url' => 'https://youtube.com/watch?v=example1',
            'handout_url' => '/handouts/cpp_intro.pdf',
            'order' => 1,
            'xp_reward' => 10,
        ]);

        \App\Models\Problem::create([
            'codeforces_id' => '1A',
            'name' => 'Theatre Square',
            'url' => 'https://codeforces.com/problemset/problem/1/A',
            'lesson_id' => $lesson1->id,
            'difficulty' => 800,
            'xp_reward' => 5,
        ]);

        $lesson2 = \App\Models\Lesson::create([
            'title' => 'التعامل مع السلاسل النصية',
            'description' => 'String manipulation in C++',
            'level_id' => $level1->id,
            'video_url' => 'https://youtube.com/watch?v=example2',
            'handout_url' => '/handouts/strings.pdf',
            'order' => 2,
            'xp_reward' => 15,
        ]);

        \App\Models\Problem::create([
            'codeforces_id' => '118A',
            'name' => 'String Task',
            'url' => 'https://codeforces.com/problemset/problem/118/A',
            'lesson_id' => $lesson2->id,
            'difficulty' => 900,
            'xp_reward' => 7,
        ]);

        // Level 1
        $level2 = \App\Models\Level::where('name', 'Level 1')->first();

        $lesson3 = \App\Models\Lesson::create([
            'title' => 'المصفوفات والمتجهات',
            'description' => 'Arrays and Vectors in C++',
            'level_id' => $level2->id,
            'video_url' => 'https://youtube.com/watch?v=example3',
            'handout_url' => '/handouts/arrays.pdf',
            'order' => 1,
            'xp_reward' => 20,
        ]);

        \App\Models\Problem::create([
            'codeforces_id' => '4A',
            'name' => 'Watermelon',
            'url' => 'https://codeforces.com/problemset/problem/4/A',
            'lesson_id' => $lesson3->id,
            'difficulty' => 800,
            'xp_reward' => 5,
        ]);
    }
}
