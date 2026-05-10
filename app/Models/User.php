<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

#[Fillable(['name', 'email', 'password', 'phone', 'college', 'department', 'codeforces_handle', 'rating', 'api_token', 'year', 'whatsapp', 'xp', 'max_rating', 'photo', 'verified', 'verification_token', 'skills', 'current_level', 'solved_problems_count'])]
#[Hidden(['password', 'remember_token', 'api_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'skills' => 'array',
        ];
    }

    public function generateApiToken(): string
    {
        $this->api_token = Str::random(80);
        $this->save();
        return $this->api_token;
    }

    public function userSolutions()
    {
        return $this->hasMany(UserSolution::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_members');
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    public function dailyChallengeSolutions()
    {
        return $this->hasMany(DailyChallengeSolution::class);
    }

    public function currentLevel()
    {
        return $this->belongsTo(Level::class, 'current_level');
    }
}
