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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // عنوان الدرس
            $table->text('description')->nullable(); // وصف الدرس
            $table->foreignId('level_id')->constrained()->onDelete('cascade'); // ربط بالمستوى
            $table->string('video_url')->nullable(); // رابط الفيديو (يوتيوب)
            $table->string('handout_url')->nullable(); // رابط الملخصات
            $table->integer('order')->default(0); // ترتيب الدرس في المستوى
            $table->integer('xp_reward')->default(10); // XP المكتسب من الدرس
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
