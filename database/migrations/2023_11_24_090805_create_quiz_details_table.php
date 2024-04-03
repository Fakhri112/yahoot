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
        Schema::create('quiz_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('quiz_title');
            $table->string('visibility');
            $table->string('quiz_description', 2048);
            $table->string('thumbnail');
            $table->integer('total_players');
            $table->integer('total_plays');
            $table->foreignUuid('user_id')->constrained();
            $table->foreignUuid('folder_id')->constrained();
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
        Schema::dropIfExists('quiz_details');
    }
};
