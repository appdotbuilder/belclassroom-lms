import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookOpen, Users, Calendar, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Courses', href: '/courses' },
];

interface Course {
    id: number;
    title: string;
    description: string;
    code: string;
    status: string;
    max_students: number;
    start_date?: string;
    end_date?: string;
    teacher: {
        id: number;
        name: string;
    };
    enrollments_count: number;
    created_at: string;
}

interface CoursesIndexProps {
    courses: {
        data: Course[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function CoursesIndex() {
    const { auth } = usePage<SharedData>().props;
    const { courses, filters } = usePage<CoursesIndexProps>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = () => {
        router.get('/courses', {
            search: searchTerm,
            status: statusFilter,
        });
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
            active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            archived: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.draft}`}>
                {status}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📚 Courses</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {auth.user?.role === 'student' ? 'Browse and enroll in courses' : 
                             auth.user?.role === 'teacher' ? 'Manage your courses' : 
                             'Manage all courses in the system'}
                        </p>
                    </div>
                    
                    {(auth.user?.role === 'teacher' || auth.user?.role === 'administrator') && (
                        <Link
                            href="/courses/create"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Course
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">All Status</option>
                            <option value="draft">Draft</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="archived">Archived</option>
                        </select>

                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Courses Grid */}
                {courses.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.data.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                                {course.code}
                                            </p>
                                        </div>
                                        {getStatusBadge(course.status)}
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <Users className="w-4 h-4 mr-2" />
                                            <span>
                                                {course.enrollments_count} / {course.max_students} students
                                            </span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            <span>Taught by {course.teacher.name}</span>
                                        </div>

                                        {course.start_date && (
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>
                                                    Starts {new Date(course.start_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {searchTerm || statusFilter ? 
                                'Try adjusting your search criteria.' : 
                                'Get started by creating your first course.'
                            }
                        </p>
                        {(auth.user?.role === 'teacher' || auth.user?.role === 'administrator') && (
                            <Link
                                href="/courses/create"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create Your First Course
                            </Link>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {courses.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {courses.data.length} of {courses.total} courses
                        </span>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}