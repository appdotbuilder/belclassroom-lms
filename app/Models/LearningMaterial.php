<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LearningMaterial
 *
 * @property int $id
 * @property int $course_id
 * @property string $title
 * @property string $description
 * @property string $type
 * @property string|null $content
 * @property string|null $file_path
 * @property string|null $video_url
 * @property int $order_index
 * @property bool $is_mandatory
 * @property int|null $prerequisite_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Course $course
 * @property-read \App\Models\LearningMaterial|null $prerequisite
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MaterialProgress> $progress
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial query()
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereOrderIndex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LearningMaterial whereUpdatedAt($value)
 * @method static \Database\Factories\LearningMaterialFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LearningMaterial extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'course_id',
        'title',
        'description',
        'type',
        'content',
        'file_path',
        'video_url',
        'order_index',
        'is_mandatory',
        'prerequisite_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_mandatory' => 'boolean',
        'order_index' => 'integer',
    ];

    /**
     * Material type constants
     */
    const TYPE_TEXT = 'text';
    const TYPE_PDF = 'pdf';
    const TYPE_VIDEO = 'video';
    const TYPE_AUDIO = 'audio';
    const TYPE_PRESENTATION = 'presentation';

    /**
     * Get the course that owns the learning material.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the prerequisite material.
     */
    public function prerequisite(): BelongsTo
    {
        return $this->belongsTo(LearningMaterial::class, 'prerequisite_id');
    }

    /**
     * Get the progress records for this material.
     */
    public function progress(): HasMany
    {
        return $this->hasMany(MaterialProgress::class);
    }
}