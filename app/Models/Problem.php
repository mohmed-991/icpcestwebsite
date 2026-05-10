<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Problem extends Model
{
    protected $fillable = [
        'codeforces_id',
        'name',
        'url',
        'lesson_id',
        'difficulty',
        'xp_reward',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function userSolutions(): HasMany
    {
        return $this->hasMany(UserSolution::class);
    }
}
