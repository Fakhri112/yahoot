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
        Schema::create('quiz_detail_for_reports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('quiz_title');
            $table->string('visibility');
            $table->string('quiz_description', 2048);
            $table->string('thumbnail');
            $table->integer('total_players');
            $table->integer('total_plays');
            $table->integer('time');
            $table->foreignUuid('user_id')->constrained();
            $table->string('original_quiz_detail_id');
            $table->string('folder_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_detail_for_reports');
    }
};
