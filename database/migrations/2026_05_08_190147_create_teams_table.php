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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم الفريق
            $table->text('description')->nullable(); // وصف الفريق
            $table->foreignId('leader_id')->constrained('users')->onDelete('cascade'); // قائد الفريق
            $table->json('members')->nullable(); // أعضاء الفريق (JSON array of user_ids)
            $table->integer('max_members')->default(3); // الحد الأقصى للأعضاء
            $table->boolean('is_active')->default(true); // هل الفريق نشط
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
