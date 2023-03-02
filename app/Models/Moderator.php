<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Moderator extends Model
{
    use HasFactory;
     public function user():MorphOne{
        return $this->morphOne(User::class, "userable");
    }
    public function myRooms():HasMany{
        return $this->hasMany(Room::class);
    }
}