<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class User extends Model
{
    use HasFactory;
    // get user profile pic
    public function profile_pic():MorphOne{
        return $this->morphOne(Image::class,"imageable");
    }
}
