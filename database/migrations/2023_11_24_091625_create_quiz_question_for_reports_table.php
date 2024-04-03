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
        Schema::create('quiz_question_for_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('quiz_detail_for_report_id')->constrained();
            $table->string('question_title');
            $table->string('question_image');
            $table->integer('duration');
            $table->string('A');
            $table->string('B');
            $table->string('C');
            $table->string('D');
            $table->char('correct_answer', 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_question_for_reports');
    }
};
