<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Model
{
    use HasFactory;
    protected $fillable = ['fullname','username','email','password'];

    // get user profile pic
    public function avatar():MorphOne{
        return $this->morphOne(Image::class,"imageable"); // $user->avatar()->save($image) to save the profile pic
    }
    // one to one polymorphic relationship with Member and Admin
    public function userable():MorphTo{
        return $this->morphTo();
    }

}