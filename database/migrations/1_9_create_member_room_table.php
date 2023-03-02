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
        // table to keep track of members and their rooms
        Schema::create('member_room', function (Blueprint $table) {
            $table->primary(["member_id","room_id"]);
            $table->bigInteger("member_id")->unsigned();
            $table->bigInteger("room_id")->unsigned();
            $table->timestamps();

            $table->foreign("member_id")->references("id")->on("members")
                ->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreign("room_id")->references("id")->on("rooms")
                ->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_room');
    }
};