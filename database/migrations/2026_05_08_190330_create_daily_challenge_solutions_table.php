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
        Schema::create('daily_challenge_solutions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('daily_challenge_id')->constrained()->onDelete('cascade');
            $table->timestamp('solved_at'); // وقت الحل
            $table->timestamps();
            
            $table->unique(['user_id', 'daily_challenge_id']); // كل مستخدم يحل التحدي مرة واحدة
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_challenge_solutions');
    }
};
