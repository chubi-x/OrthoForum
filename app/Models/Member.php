<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Member extends Model
{
    use HasFactory;
    // polymorphic one to one relationship with users
     public function user():MorphOne{
        return $this->morphOne(User::class, "userable");
    }
    // members have many rooms
    public function rooms():BelongsToMany{
        return $this->belongsToMany(Room::class)->withTimestamps();
    }
}
