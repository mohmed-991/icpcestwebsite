<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    protected $fillable = [
        'name',
        'description',
        'min_rating',
        'max_rating',
        'required_xp',
        'order',
    ];

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'current_level', 'id');
    }
}
