<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Assignment
 *
 * @property int $id
 * @property int $course_id
 * @property int $teacher_id
 * @property string $title
 * @property string $description
 * @property string $type
 * @property array|null $questions
 * @property int $max_points
 * @property int $time_limit_minutes
 * @property \Illuminate\Support\Carbon $due_date
 * @property bool $is_published
 * @property bool $allow_multiple_attempts
 * @property int $max_attempts
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Course $course
 * @property-read \App\Models\User $teacher
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AssignmentSubmission> $submissions
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assignment published()
 * @method static \Database\Factories\AssignmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Assignment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'course_id',
        'teacher_id',
        'title',
        'description',
        'type',
        'questions',
        'max_points',
        'time_limit_minutes',
        'due_date',
        'is_published',
        'allow_multiple_attempts',
        'max_attempts',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'questions' => 'array',
        'due_date' => 'datetime',
        'is_published' => 'boolean',
        'allow_multiple_attempts' => 'boolean',
        'max_points' => 'integer',
        'time_limit_minutes' => 'integer',
        'max_attempts' => 'integer',
    ];

    /**
     * Assignment type constants
     */
    const TYPE_MULTIPLE_CHOICE = 'multiple_choice';
    const TYPE_ESSAY = 'essay';
    const TYPE_IMAGE_MATCHING = 'image_matching';
    const TYPE_VOICE_TEST = 'voice_test';
    const TYPE_MIXED = 'mixed';

    /**
     * Get the course that owns the assignment.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the teacher that owns the assignment.
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Get the submissions for the assignment.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(AssignmentSubmission::class);
    }

    /**
     * Scope a query to only include published assignments.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Check if the assignment is overdue.
     */
    public function isOverdue(): bool
    {
        return $this->due_date < now();
    }
}