<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class User extends Model
{
    use HasFactory;
    // get user profile pic
    public function profile_pic():MorphOne{
        return $this->morphOne(Image::class,"imageable");     // $user->profile_pic()->save($image) to save the profile pic
    }
    // one to one polymorphic relationship with Member, Admin, and Moderator
    public function userable():MorphTo{
        return $this->morphTo();
    }
}
