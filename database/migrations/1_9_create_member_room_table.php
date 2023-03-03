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
            $table->foreignId("member_id")->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId("room_id")->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();

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
