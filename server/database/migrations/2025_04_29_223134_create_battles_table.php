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
        Schema::create('battles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('category_id');
            $table->foreignId('ai_model_1_id');
            $table->foreignId('ai_model_2_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('target_language')->nullable();
            $table->string('programming_language')->nullable();
            $table->string('debate_title_1')->nullable();
            $table->string('debate_title_2')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('battles');
    }
};
