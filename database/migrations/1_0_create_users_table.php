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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("fullname");
            $table->string("username")->unique();
            $table->string("email")->unique();
            $table->string("password");
            $table->boolean("isAdmin");
            // add polymorphic many to many for different kinds of users
            // three user types: admin, moderator, and member
            $table->morphs("userable");
            //if user creates room, we add them to moderator table
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
