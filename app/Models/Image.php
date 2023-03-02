<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    use HasFactory;
    public function imageable():MorphTo{
        return $this->morphTo(); //single image model has one-to-one relationship with User and Room model and many to many wITH Post
    }

}
