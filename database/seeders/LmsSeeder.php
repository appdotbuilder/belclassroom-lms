<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LearningMaterial;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create administrator
        $admin = User::create([
            'name' => 'LMS Administrator',
            'email' => 'admin@belclassroom.com',
            'password' => Hash::make('password'),
            'role' => 'administrator',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create teachers
        $teachers = User::factory()->count(5)->teacher()->create();

        // Create students
        $students = User::factory()->count(30)->student()->create();

        // Create courses
        $courses = [];
        foreach ($teachers as $teacher) {
            $teacherCourses = Course::factory()
                ->count(random_int(2, 4))
                ->create(['teacher_id' => $teacher->id]);
            $courses = array_merge($courses, $teacherCourses->toArray());
        }

        // Create enrollments
        foreach ($courses as $course) {
            $enrollmentCount = random_int(5, 15);
            $selectedStudents = $students->random($enrollmentCount);
            
            foreach ($selectedStudents as $student) {
                Enrollment::factory()->create([
                    'student_id' => $student->id,
                    'course_id' => $course['id'],
                ]);
            }
        }

        // Create learning materials for each course
        foreach ($courses as $course) {
            LearningMaterial::factory()
                ->count(random_int(5, 10))
                ->create([
                    'course_id' => $course['id'],
                    'order_index' => function () {
                        static $order = 0;
                        return ++$order;
                    },
                ]);
        }

        // Create assignments for each course
        foreach ($courses as $course) {
            Assignment::factory()
                ->count(random_int(3, 8))
                ->create([
                    'course_id' => $course['id'],
                    'teacher_id' => $course['teacher_id'],
                ]);
        }

        // Create announcements
        foreach ($courses as $course) {
            Announcement::factory()
                ->count(random_int(2, 5))
                ->create([
                    'course_id' => $course['id'],
                    'author_id' => $course['teacher_id'],
                ]);
        }

        // Create global announcements from admin
        Announcement::factory()
            ->count(5)
            ->global()
            ->create(['author_id' => $admin->id]);

        // Create messages between users
        $allUsers = collect([$admin])->concat($teachers)->concat($students);
        
        foreach ($allUsers->random(20) as $sender) {
            $recipients = $allUsers->filter(fn($user) => $user->id !== $sender->id)->random(random_int(1, 3));
            foreach ($recipients as $recipient) {
                Message::factory()->create([
                    'sender_id' => $sender->id,
                    'recipient_id' => $recipient->id,
                ]);
            }
        }
    }
}