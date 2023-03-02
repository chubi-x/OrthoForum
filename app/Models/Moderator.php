<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Moderator extends Model
{
    use HasFactory;
     public function user():MorphMany{
        return $this->morphMany(User::class, "userable");
    }
    public function myRooms():HasMany{
        return $this->hasMany(Room::class);
    }
}
