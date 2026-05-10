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
        Schema::create('problems', function (Blueprint $table) {
            $table->id();
            $table->string('codeforces_id'); // معرف المسألة على Codeforces (مثل 1A, 2B)
            $table->string('name'); // اسم المسألة
            $table->string('url'); // رابط المسألة
            $table->foreignId('lesson_id')->constrained()->onDelete('cascade'); // ربط بالدرس
            $table->integer('difficulty')->default(800); // صعوبة المسألة (ريتنج)
            $table->integer('xp_reward')->default(5); // XP المكتسب من حل المسألة
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('problems');
    }
};
