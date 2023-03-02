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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->longText("text");
            $table->bigInteger("member_id")->unsigned();
            $table->foreignId('room_id')->nullable()->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            // $table->string("image_paths");  //serialized array of post image paths
            $table->timestamps();

            $table->foreign("member_id")->references("id")->on("members")
                ->restrictOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
