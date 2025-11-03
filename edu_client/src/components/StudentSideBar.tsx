'use client';

import React from 'react';
import Image from 'next/image';
import {
  Home,
  Calendar,
  BookCheck,
  Video,
  ClipboardList,
  Settings,
  HelpCircle,
  Star,
  Bell,
  Menu,
  LogOut
} from 'lucide-react';

/**
 * StudentDashboardNav.tsx
 * - Responsive left sidebar + top nav bar for student dashboards
 * - Sidebar shows avatar, profile info, primary navigation
 * - Top bar shows notifications, quick actions, premium banner
 */

export default function StudentDashboardNav({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 relative rounded-full overflow-hidden shadow-md">
            <Image src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80" alt="User Avatar" fill className="object-cover" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Student Name</h2>
          <p className="text-sm text-gray-500">student.email@example.com</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavItem icon={<Home />} label="Dashboard / Home" />
          <NavItem icon={<Calendar />} label="Calendar & Schedule" />
          <NavItem icon={<Video />} label="Live Classes" />
          <NavItem icon={<BookCheck />} label="My Courses" />
          <NavItem icon={<ClipboardList />} label="Assessments & Progress" />
          <NavItem icon={<Star />} label="Learning Paths" />
          <NavItem icon={<HelpCircle />} label="Help & Support" />
        </nav>

        {/* Logout */}
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 mt-6 text-sm font-medium">
          <LogOut size={18} /> Log Out
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700"><Menu /></button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>

            <button className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Star size={16} /> Go Premium
            </button>
          </div>
        </header>

        {/* Banner */}
        {/* <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-700/20 dark:to-green-600/20 border-b border-green-200 dark:border-green-700 p-4 flex items-center justify-between">
          <p className="text-sm text-green-800 dark:text-green-300 font-medium">Unlock all courses and paths with Unlimited Learning Access</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Subscribe</button>
        </div> */}

        {/* CONTENT SLOT */}
        <div className="flex-1 overflow-y-auto p-1">
          {children}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg text-sm">
      {icon} <span>{label}</span>
    </button>
  );
}
