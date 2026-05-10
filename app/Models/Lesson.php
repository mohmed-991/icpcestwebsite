<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    protected $fillable = [
        'title',
        'description',
        'level_id',
        'video_url',
        'handout_url',
        'order',
        'xp_reward',
    ];

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    public function problems(): HasMany
    {
        return $this->hasMany(Problem::class);
    }
}
