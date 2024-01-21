<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('answered');
            $table->boolean('correct_incorrect');
            $table->float('time');
            $table->integer('points');
            $table->foreignId('quiz_question_id')->constrained();
            $table->foreignId('player_result_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_logs');
    }
};
