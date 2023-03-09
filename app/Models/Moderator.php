<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
// use Illuminate\Database\Eloquent\Relations\MorphMany;

class Moderator extends Model
{
    use HasFactory;

    public function member():BelongsTo{
        return $this->belongsTo(Member::class);
    }
    public function rooms():HasMany{
        return $this->hasMany(Room::class);
    }
}
