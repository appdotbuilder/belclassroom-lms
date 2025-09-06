import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="BelClassroom - Enterprise Learning Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
                <header className="mb-8 w-full max-w-7xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                                <span className="text-white font-bold text-lg">📚</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">BelClassroom</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <span className="mr-2">🏠</span>
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-6 py-2.5 text-gray-700 hover:text-blue-600 font-medium rounded-lg border border-gray-300 hover:border-blue-300 transition-colors duration-200 dark:text-gray-200 dark:border-gray-600 dark:hover:text-blue-400 dark:hover:border-blue-500"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Get Started Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-7xl flex-col items-center">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            🎓 Enterprise Learning Management System
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-300">
                            Transform your educational institution with our comprehensive LMS platform. 
                            Manage students, teachers, courses, and assessments all in one powerful system.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                                <span className="text-green-500">✅</span>
                                <span className="font-medium">Progressive Web App</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                                <span className="text-green-500">✅</span>
                                <span className="font-medium">AI-Powered Assessments</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                                <span className="text-green-500">✅</span>
                                <span className="font-medium">Real-time Analytics</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3">Comprehensive Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-300">Visual progress tracking, analytics, and activity summaries for all user roles.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-3">User Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">Complete student and teacher management with role-based access controls.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-3">Learning Materials</h3>
                            <p className="text-gray-600 dark:text-gray-300">Rich content management with progress tracking and sequential completion.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold mb-3">Assignment Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">Multiple question types, automated grading, and detailed feedback systems.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-xl font-semibold mb-3">Communication Hub</h3>
                            <p className="text-gray-600 dark:text-gray-300">Integrated messaging and announcement system for seamless communication.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold mb-3">AI-Powered Tools</h3>
                            <p className="text-gray-600 dark:text-gray-300">Advanced AI features for speaking tests, writing assessments, and analytics.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
                            <p className="text-gray-600 dark:text-gray-300">Integrated calendar for lessons, exams, and educational activities.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">🏫</div>
                            <h3 className="text-xl font-semibold mb-3">Class Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">Virtual classrooms, study groups, and collaborative learning spaces.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="text-4xl mb-4">💾</div>
                            <h3 className="text-xl font-semibold mb-3">Backup & Security</h3>
                            <p className="text-gray-600 dark:text-gray-300">Enterprise-grade data backup, restore capabilities, and security features.</p>
                        </div>
                    </div>

                    {/* User Roles Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-16 w-full">
                        <h2 className="text-3xl font-bold text-center mb-8">👥 Multi-Role Support</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🎓</div>
                                <h3 className="text-xl font-semibold mb-3">Students</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Access learning materials</li>
                                    <li>• Complete assignments</li>
                                    <li>• Track progress</li>
                                    <li>• Communicate with teachers</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl mb-4">🍎</div>
                                <h3 className="text-xl font-semibold mb-3">Teachers</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Create and manage courses</li>
                                    <li>• Grade assignments</li>
                                    <li>• Monitor student progress</li>
                                    <li>• Send announcements</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="text-6xl mb-4">⚙️</div>
                                <h3 className="text-xl font-semibold mb-3">Administrators</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• System configuration</li>
                                    <li>• User management</li>
                                    <li>• Analytics & reporting</li>
                                    <li>• Data backup & restore</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Educational Experience?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of educational institutions already using BelClassroom to deliver exceptional learning experiences.
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <span className="mr-2">🚀</span>
                                    Start Your Free Trial
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-8 py-4 text-blue-600 hover:text-blue-700 font-medium rounded-lg border-2 border-blue-600 hover:border-blue-700 transition-colors duration-200"
                                >
                                    <span className="mr-2">👋</span>
                                    Sign In to Your Account
                                </Link>
                            </div>
                        )}
                    </div>

                    <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>© 2024 BelClassroom. Built with ❤️ for modern education.</p>
                        <p className="mt-2">🌐 Hosted at app.belclassroom.com</p>
                    </footer>
                </main>
            </div>
        </>
    );
}