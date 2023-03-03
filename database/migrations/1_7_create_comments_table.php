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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->longText("text");
            $table->bigInteger("member_id")->unsigned();
            $table->bigInteger("post_id")->unsigned();
            $table->timestamps();

            $table->foreign("member_id")->references("id")->on("members")
                ->restrictOnDelete()->cascadeOnUpdate();
            $table->foreign("post_id")->references("id")->on("posts")
                ->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
