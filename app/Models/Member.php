<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Member extends Model
{
    use HasFactory;
    // polymorphic one to one relationship with users
     public function user():MorphOne{
        return $this->morphOne(User::class, "userable");  //$member->user()->save($user) to save user
    }
    // members have many rooms
    public function rooms():BelongsToMany{
        return $this->belongsToMany(Room::class)->withTimestamps();
    }
    public function posts():HasMany{
        return $this->hasMany(Post::class);
    }
    public function comments():HasMany{
                return $this->hasMany(Comment::class);

    }
    //  fullname: "chubi adejoh",
    // username: "chubix",
    // email: "chubix@gmail.com",
    // password: "124",
    // isAdmin: false,
}