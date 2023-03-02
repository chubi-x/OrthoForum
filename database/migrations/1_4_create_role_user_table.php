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
    {   //pivot table to keep track of users and their roles
        Schema::create('role_user', function (Blueprint $table) {
            $table->primary(["user_id","role_id"]);
            $table->bigInteger("user_id")->unsigned();
            $table->bigInteger("role_id")->unsigned();
            $table->timestamps();

            // tie user_id to a user in users table
            $table->foreign("user_id")->references("id")->on("users")
                ->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreign("role_id")->references("id")->on("roles")
            ->restrictOnDelete()->cascadeOnUpdate(); // dont delete rows when role is deleted, but update them when it is updated
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};