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
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('session_name'); // اسم الجلسة
            $table->date('session_date'); // تاريخ الجلسة
            $table->time('check_in_time')->nullable(); // وقت الحضور
            $table->string('qr_code')->nullable(); // كود QR للتحقق
            $table->boolean('is_present')->default(false); // هل حضر
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
