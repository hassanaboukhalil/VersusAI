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
        if (!Schema::hasColumn('battles', 'target_language')) {
            Schema::table('battles', function (Blueprint $table) {
                $table->string('target_language')->nullable()->after('description');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('battles', 'target_language')) {
            Schema::table('battles', function (Blueprint $table) {
                $table->dropColumn('target_language');
            });
        }
    }
};
