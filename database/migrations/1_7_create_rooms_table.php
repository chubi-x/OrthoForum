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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->string("description");
            $table->enum("type", ["PRIVATE", "PUBLIC"]);
            $table->bigInteger("moderator_id")->unsigned(); //only members can post to private rooms
            // one to one polymorphic relationship with image to return banner
            $table->foreign("moderator_id")->references("id")->on("moderators")
                ->restrictOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};