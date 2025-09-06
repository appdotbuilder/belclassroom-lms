import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, 
    LayoutGrid, 
    Users, 
    GraduationCap, 
    MessageCircle, 
    Bell, 
    FileText, 
    Calendar, 
    School, 
    Settings, 
    BarChart3,
    UserCheck,
    BookOpenCheck,
    Megaphone,
    Database
} from 'lucide-react';
import AppLogo from './app-logo';

// Get user role from shared data
function getMainNavItems(userRole?: string): NavItem[] {
    const baseItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    if (userRole === 'student') {
        return [
            ...baseItems,
            {
                title: 'My Courses',
                href: '/courses',
                icon: BookOpen,
            },
            {
                title: 'Assignments',
                href: '/assignments',
                icon: FileText,
            },
            {
                title: 'Learning Materials',
                href: '/learning-materials',
                icon: BookOpenCheck,
            },
            {
                title: 'Messages',
                href: '/messages',
                icon: MessageCircle,
            },
            {
                title: 'Schedule',
                href: '/schedule',
                icon: Calendar,
            },
            {
                title: 'Announcements',
                href: '/announcements',
                icon: Bell,
            },
        ];
    } else if (userRole === 'teacher') {
        return [
            ...baseItems,
            {
                title: 'My Courses',
                href: '/courses',
                icon: BookOpen,
            },
            {
                title: 'Students',
                href: '/students',
                icon: Users,
            },
            {
                title: 'Assignments',
                href: '/assignments',
                icon: FileText,
            },
            {
                title: 'Learning Materials',
                href: '/learning-materials',
                icon: BookOpenCheck,
            },
            {
                title: 'Messages',
                href: '/messages',
                icon: MessageCircle,
            },
            {
                title: 'Announcements',
                href: '/announcements',
                icon: Megaphone,
            },
            {
                title: 'Schedule',
                href: '/schedule',
                icon: Calendar,
            },
            {
                title: 'Analytics',
                href: '/analytics',
                icon: BarChart3,
            },
        ];
    } else if (userRole === 'administrator') {
        return [
            ...baseItems,
            {
                title: 'User Management',
                href: '/users',
                icon: UserCheck,
            },
            {
                title: 'Course Management',
                href: '/courses',
                icon: School,
            },
            {
                title: 'Student Management',
                href: '/students',
                icon: GraduationCap,
            },
            {
                title: 'Teacher Management',
                href: '/teachers',
                icon: Users,
            },
            {
                title: 'Messages',
                href: '/messages',
                icon: MessageCircle,
            },
            {
                title: 'Announcements',
                href: '/announcements',
                icon: Megaphone,
            },
            {
                title: 'Analytics & Reports',
                href: '/analytics',
                icon: BarChart3,
            },
            {
                title: 'System Settings',
                href: '/settings',
                icon: Settings,
            },
            {
                title: 'Backup & Restore',
                href: '/backup',
                icon: Database,
            },
        ];
    }

    return baseItems;
}

const footerNavItems: NavItem[] = [
    {
        title: 'BelClassroom Help',
        href: '/help',
        icon: BookOpen,
    },
    {
        title: 'Support',
        href: '/support',
        icon: MessageCircle,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role;
    const mainNavItems = getMainNavItems(userRole);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
