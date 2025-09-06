// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Users, Bell, MessageCircle, BarChart3, GraduationCap, FileText, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    userRole: 'student' | 'teacher' | 'administrator' | 'default';
    stats: Record<string, number>;
    enrollments?: Array<{
        id: number;
        course: {
            id: number;
            title: string;
            teacher: {
                name: string;
            };
        };
        progress_percentage: number;
    }>;
    upcomingAssignments?: Array<{
        id: number;
        title: string;
        due_date: string;
        course: {
            title: string;
        };
    }>;
    recentAnnouncements?: Array<{
        id: number;
        title: string;
        content: string;
        published_at: string;
        priority: string;
    }>;
    courses?: Array<{
        id: number;
        title: string;
        enrollments_count: number;
        status: string;
    }>;
    usersByRole?: {
        students: number;
        teachers: number;
        administrators: number;
    };
    recentActivity?: {
        newUsers: number;
        newCourses: number;
        newEnrollments: number;
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const { userRole, stats, enrollments, upcomingAssignments, recentAnnouncements, courses, usersByRole, recentActivity } = usePage<DashboardProps>().props;

    const renderStudentDashboard = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Enrolled Courses</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.enrolledCourses || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Assignments</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcomingAssignments || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Progress</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.averageProgress || 0)}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                            <MessageCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread Messages</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unreadMessages || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Courses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">📚 My Courses</h3>
                    </div>
                    <div className="p-6">
                        {enrollments && enrollments.length > 0 ? (
                            <div className="space-y-4">
                                {enrollments.map((enrollment) => (
                                    <div key={enrollment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{enrollment.course.title}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">by {enrollment.course.teacher.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{enrollment.progress_percentage}%</p>
                                            <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full" 
                                                    style={{ width: `${enrollment.progress_percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No enrolled courses yet.</p>
                        )}
                    </div>
                </div>

                {/* Upcoming Assignments */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">📝 Upcoming Assignments</h3>
                    </div>
                    <div className="p-6">
                        {upcomingAssignments && upcomingAssignments.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingAssignments.map((assignment) => (
                                    <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{assignment.title}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.course.title}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-red-600 dark:text-red-400">
                                                Due: {new Date(assignment.due_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No upcoming assignments.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">📢 Recent Announcements</h3>
                </div>
                <div className="p-6">
                    {recentAnnouncements && recentAnnouncements.length > 0 ? (
                        <div className="space-y-4">
                            {recentAnnouncements.map((announcement) => (
                                <div key={announcement.id} className={`p-4 rounded-lg border-l-4 ${
                                    announcement.priority === 'urgent' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                    announcement.priority === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                }`}>
                                    <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{announcement.content}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                        {new Date(announcement.published_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No recent announcements.</p>
                    )}
                </div>
            </div>
        </div>
    );

    const renderTeacherDashboard = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Courses</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCourses || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudents || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Grading</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingGrading || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                            <MessageCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread Messages</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unreadMessages || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">🏫 My Courses</h3>
                    <Link 
                        href="/courses/create"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Create Course
                    </Link>
                </div>
                <div className="p-6">
                    {courses && courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <div key={course.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {course.enrollments_count} students enrolled
                                    </p>
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                                        course.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                        course.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' :
                                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    }`}>
                                        {course.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No courses created yet.</p>
                    )}
                </div>
            </div>
        </div>
    );

    const renderAdministratorDashboard = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCourses || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Enrollments</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeEnrollments || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <Bell className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Announcements</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingAnnouncements || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users by Role */}
            {usersByRole && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">👥 Users by Role</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{usersByRole.students}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <Users className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{usersByRole.teachers}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Teachers</p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{usersByRole.administrators}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Administrators</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Activity */}
            {recentActivity && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">📈 Recent Activity (Last 7 Days)</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                <div className="ml-4">
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{recentActivity.newUsers}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">New Users</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                                <div className="ml-4">
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{recentActivity.newCourses}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">New Courses</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                <div className="ml-4">
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{recentActivity.newEnrollments}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">New Enrollments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderDefaultDashboard = () => (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to BelClassroom! 🎓</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please contact your administrator to set up your account role.
            </p>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome back, {auth.user?.name}! 👋
                    </h1>
                    <p className="opacity-90">
                        {userRole === 'student' && "Ready to continue your learning journey?"}
                        {userRole === 'teacher' && "Let's inspire your students today!"}
                        {userRole === 'administrator' && "Here's your system overview."}
                    </p>
                </div>

                {/* Role-based Dashboard Content */}
                {userRole === 'student' && renderStudentDashboard()}
                {userRole === 'teacher' && renderTeacherDashboard()}
                {userRole === 'administrator' && renderAdministratorDashboard()}
                {userRole === 'default' && renderDefaultDashboard()}
            </div>
        </AppLayout>
    );
}