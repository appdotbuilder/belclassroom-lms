<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isStudent()) {
            return $this->studentDashboard($user);
        } elseif ($user->isTeacher()) {
            return $this->teacherDashboard($user);
        } elseif ($user->isAdministrator()) {
            return $this->administratorDashboard($user);
        }
        
        return $this->defaultDashboard($user);
    }

    /**
     * Display student dashboard.
     */
    protected function studentDashboard(User $user)
    {
        $enrollments = Enrollment::with(['course.teacher', 'course.assignments'])
            ->where('student_id', $user->id)
            ->where('status', 'enrolled')
            ->latest()
            ->take(5)
            ->get();

        $upcomingAssignments = Assignment::whereHas('course.enrollments', function ($query) use ($user) {
                $query->where('student_id', $user->id)
                      ->where('status', 'enrolled');
            })
            ->where('is_published', true)
            ->where('due_date', '>', now())
            ->orderBy('due_date')
            ->take(5)
            ->get();

        $recentAnnouncements = Announcement::where(function ($query) use ($user) {
                $query->whereNull('course_id') // Global announcements
                      ->orWhereHas('course.enrollments', function ($q) use ($user) {
                          $q->where('student_id', $user->id);
                      });
            })
            ->where('is_published', true)
            ->latest('published_at')
            ->take(5)
            ->get();

        $unreadMessages = Message::where('recipient_id', $user->id)
            ->where('is_read', false)
            ->count();

        return Inertia::render('dashboard', [
            'userRole' => 'student',
            'stats' => [
                'enrolledCourses' => $enrollments->count(),
                'upcomingAssignments' => $upcomingAssignments->count(),
                'unreadMessages' => $unreadMessages,
                'averageProgress' => $enrollments->avg('progress_percentage') ?: 0,
            ],
            'enrollments' => $enrollments,
            'upcomingAssignments' => $upcomingAssignments,
            'recentAnnouncements' => $recentAnnouncements,
        ]);
    }

    /**
     * Display teacher dashboard.
     */
    protected function teacherDashboard(User $user)
    {
        $courses = Course::where('teacher_id', $user->id)
            ->with(['enrollments', 'assignments'])
            ->latest()
            ->take(5)
            ->get();

        $totalStudents = Enrollment::whereHas('course', function ($query) use ($user) {
            $query->where('teacher_id', $user->id);
        })->where('status', 'enrolled')->count();

        $pendingGrading = Assignment::where('teacher_id', $user->id)
            ->whereHas('submissions', function ($query) {
                $query->where('status', 'submitted');
            })
            ->count();

        $recentMessages = Message::where('recipient_id', $user->id)
            ->where('is_read', false)
            ->count();

        return Inertia::render('dashboard', [
            'userRole' => 'teacher',
            'stats' => [
                'totalCourses' => $courses->count(),
                'totalStudents' => $totalStudents,
                'pendingGrading' => $pendingGrading,
                'unreadMessages' => $recentMessages,
            ],
            'courses' => $courses,
        ]);
    }

    /**
     * Display administrator dashboard.
     */
    protected function administratorDashboard(User $user)
    {
        $totalUsers = User::count();
        $totalCourses = Course::count();
        $activeEnrollments = Enrollment::where('status', 'enrolled')->count();
        $pendingAnnouncements = Announcement::where('is_published', false)->count();

        $usersByRole = [
            'students' => User::where('role', 'student')->count(),
            'teachers' => User::where('role', 'teacher')->count(),
            'administrators' => User::where('role', 'administrator')->count(),
        ];

        $recentActivity = [
            'newUsers' => User::where('created_at', '>=', now()->subDays(7))->count(),
            'newCourses' => Course::where('created_at', '>=', now()->subDays(7))->count(),
            'newEnrollments' => Enrollment::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        return Inertia::render('dashboard', [
            'userRole' => 'administrator',
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalCourses' => $totalCourses,
                'activeEnrollments' => $activeEnrollments,
                'pendingAnnouncements' => $pendingAnnouncements,
            ],
            'usersByRole' => $usersByRole,
            'recentActivity' => $recentActivity,
        ]);
    }

    /**
     * Display default dashboard for users without specific roles.
     */
    protected function defaultDashboard(User $user)
    {
        return Inertia::render('dashboard', [
            'userRole' => 'default',
            'stats' => [],
        ]);
    }
}