<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'post_id',
    ];

    public function member():BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function post():BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

}
