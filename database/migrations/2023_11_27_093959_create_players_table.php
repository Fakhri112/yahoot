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
        Schema::create('players', function (Blueprint $table) {
            $table->id(); // Automatically creates an 'id' column as primary key
            $table->string('player_name');
            $table->string('game_pin_id'); // Foreign key column
            $table->foreign('game_pin_id')
                ->references('game_pin') // References the 'game_pin' column in the 'hosts' table
                ->on('hosts')
                ->onUpdate('cascade')
                ->onDelete('cascade'); // Adjust cascade actions as needed

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
        Schema::dropIfExists('players');
    }
};
