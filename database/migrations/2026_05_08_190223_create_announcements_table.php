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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // عنوان الإعلان
            $table->text('content'); // محتوى الإعلان
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // من نشر الإعلان
            $table->enum('type', ['info', 'warning', 'success', 'danger'])->default('info'); // نوع الإعلان
            $table->boolean('is_active')->default(true); // هل الإعلان نشط
            $table->timestamp('expires_at')->nullable(); // تاريخ انتهاء الإعلان
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
