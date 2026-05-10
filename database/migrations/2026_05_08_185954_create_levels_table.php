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
        Schema::create('levels', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم المستوى (Newcomers, Level 1, etc.)
            $table->text('description')->nullable(); // وصف المستوى
            $table->integer('min_rating')->default(0); // الحد الأدنى للريتنج
            $table->integer('max_rating')->nullable(); // الحد الأقصى للريتنج
            $table->integer('required_xp')->default(0); // XP المطلوب للانتقال
            $table->integer('order')->default(0); // ترتيب المستوى
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('levels');
    }
};
