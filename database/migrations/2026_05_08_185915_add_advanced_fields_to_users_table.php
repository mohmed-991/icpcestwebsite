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
        Schema::table('users', function (Blueprint $table) {
            $table->string('year')->nullable(); // السنة الدراسية
            $table->string('whatsapp')->nullable(); // رقم الواتساب
            $table->integer('xp')->default(0); // نقاط الخبرة
            $table->integer('max_rating')->default(0); // أعلى ريتنج
            $table->string('photo')->nullable(); // صورة المستخدم
            $table->boolean('verified')->default(false); // هل تم التحقق من الحساب
            $table->string('verification_token')->nullable(); // توكن التحقق
            $table->json('skills')->nullable(); // مهارات المستخدم (JSON)
            $table->integer('current_level')->default(1); // المستوى الحالي
            $table->integer('solved_problems_count')->default(0); // عدد المسائل المحلولة
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['year', 'whatsapp', 'xp', 'max_rating', 'photo', 'verified', 'verification_token', 'skills', 'current_level', 'solved_problems_count']);
        });
    }
};
