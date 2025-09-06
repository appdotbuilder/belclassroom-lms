<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $course = $this->route('course');
        
        return $this->user()->isAdministrator() || 
               ($this->user()->isTeacher() && $course->teacher_id === $this->user()->id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $course = $this->route('course');
        
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'code' => 'required|string|max:20|unique:courses,code,' . $course->id,
            'teacher_id' => 'nullable|exists:users,id',
            'status' => 'nullable|in:draft,active,completed,archived',
            'max_students' => 'nullable|integer|min:1|max:500',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Course title is required.',
            'description.required' => 'Course description is required.',
            'code.required' => 'Course code is required.',
            'code.unique' => 'This course code is already taken.',
            'teacher_id.exists' => 'Selected teacher does not exist.',
            'end_date.after_or_equal' => 'End date must be after or equal to start date.',
        ];
    }
}