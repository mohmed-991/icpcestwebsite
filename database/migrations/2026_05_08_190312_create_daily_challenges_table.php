<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_challenges', function (Blueprint $table) {
            $table->id();
            $table->date('challenge_date')->unique(); // تاريخ التحدي
            $table->string('problem_codeforces_id'); // معرف المسألة على Codeforces
            $table->string('problem_name'); // اسم المسألة
            $table->string('problem_url'); // رابط المسألة
            $table->integer('xp_reward')->default(20); // XP المكتسب
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_challenges');
    }
};
