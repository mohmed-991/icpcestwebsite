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
        Schema::create('user_solutions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('problem_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'solved', 'attempted'])->default('pending'); // حالة الحل
            $table->timestamp('solved_at')->nullable(); // وقت الحل
            $table->integer('attempts')->default(0); // عدد المحاولات
            $table->timestamps();
            
            $table->unique(['user_id', 'problem_id']); // كل مستخدم يحل مسألة مرة واحدة
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_solutions');
    }
};
