<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Course::with(['teacher', 'enrollments'])
            ->when($request->user()->isTeacher(), function ($query) use ($request) {
                $query->where('teacher_id', $request->user()->id);
            });

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $courses = $query->latest()->paginate(12);

        return Inertia::render('courses/index', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = User::teachers()->active()->get(['id', 'name']);
        
        return Inertia::render('courses/create', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'code' => $request->code,
            'teacher_id' => $request->teacher_id ?: $request->user()->id,
            'status' => $request->status ?? 'draft',
            'max_students' => $request->max_students ?? 30,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load([
            'teacher',
            'enrollments.student',
            'learningMaterials' => function ($query) {
                $query->orderBy('order_index');
            },
            'assignments' => function ($query) {
                $query->where('is_published', true)->orderBy('due_date');
            },
            'announcements' => function ($query) {
                $query->where('is_published', true)->latest('published_at');
            }
        ]);

        return Inertia::render('courses/show', [
            'course' => $course,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $teachers = User::teachers()->active()->get(['id', 'name']);
        
        return Inertia::render('courses/edit', [
            'course' => $course,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}