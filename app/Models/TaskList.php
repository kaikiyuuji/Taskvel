<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskList extends Model
{
    protected $table = 'lists';

    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'list_id');
    }

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
}
