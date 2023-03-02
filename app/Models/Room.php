<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Room extends Model
{
    use HasFactory;
    public function banner_image():MorphOne{
        return $this->morphOne(Image::class,"imageable");
    }

    public function members():BelongsToMany{
        return $this->belongsToMany(Member::class);
    }
}