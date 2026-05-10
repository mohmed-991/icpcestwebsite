<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Level::create([
            'name' => 'Newcomers',
            'description' => 'مقدمة في البرمجة التنافسية',
            'min_rating' => 0,
            'max_rating' => 1199,
            'required_xp' => 0,
            'order' => 1,
        ]);

        \App\Models\Level::create([
            'name' => 'Level 1',
            'description' => 'أساسيات الخوارزميات',
            'min_rating' => 1200,
            'max_rating' => 1399,
            'required_xp' => 100,
            'order' => 2,
        ]);

        \App\Models\Level::create([
            'name' => 'Level 2',
            'description' => 'هياكل البيانات المتقدمة',
            'min_rating' => 1400,
            'max_rating' => 1599,
            'required_xp' => 250,
            'order' => 3,
        ]);

        \App\Models\Level::create([
            'name' => 'Level 3',
            'description' => 'الخوارزميات المتقدمة',
            'min_rating' => 1600,
            'max_rating' => 1899,
            'required_xp' => 500,
            'order' => 4,
        ]);

        \App\Models\Level::create([
            'name' => 'Level 4',
            'description' => 'تحضير ICPC',
            'min_rating' => 1900,
            'max_rating' => 9999,
            'required_xp' => 1000,
            'order' => 5,
        ]);
    }
}
