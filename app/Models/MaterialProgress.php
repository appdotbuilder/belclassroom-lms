<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MaterialProgress
 *
 * @property int $id
 * @property int $student_id
 * @property int $learning_material_id
 * @property int $completion_percentage
 * @property bool $is_completed
 * @property int|null $time_spent_seconds
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $student
 * @property-read \App\Models\LearningMaterial $learningMaterial
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress query()
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereLearningMaterialId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereCompletionPercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereIsCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaterialProgress completed()
 * @method static \Database\Factories\MaterialProgressFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MaterialProgress extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'learning_material_id',
        'completion_percentage',
        'is_completed',
        'time_spent_seconds',
        'started_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completion_percentage' => 'integer',
        'is_completed' => 'boolean',
        'time_spent_seconds' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the student that owns the progress.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the learning material that owns the progress.
     */
    public function learningMaterial(): BelongsTo
    {
        return $this->belongsTo(LearningMaterial::class);
    }

    /**
     * Scope a query to only include completed progress.
     */
    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }
}