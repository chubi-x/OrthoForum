<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'text'
    ];
    public function member():BelongsTo{
        return $this->belongsTo(Member::class);
    }
    public function images():MorphMany{
        return $this->morphMany(Image::class,"imageable");
    }
    public function comments():HasMany{
        return $this->hasMany(Comment::class);
    }
    public function room():BelongsTo{
        return $this->belongsTo(Room::class);
    }
    public function likes():HasMany{
        return $this->hasMany(Like::class);
    }
}
