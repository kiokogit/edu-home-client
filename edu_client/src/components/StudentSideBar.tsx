'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  LogOut,
  CodeIcon
} from 'lucide-react';

export default function StudentDashboardNav({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors">

      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 
        ${collapsed ? 'w-20 bg-green-600 text-white' : 'w-56 bg-white dark:bg-gray-800'} p-4`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center justify-center mb-6 p-2 rounded-lg hover:bg-green-700 transition ${collapsed ? 'text-white' : 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700'}`}
        >
          <Menu size={20} />
        </button>

        <div className="group flex flex-col items-center text-center mb-8 relative">
          <button className={`relative overflow-hidden rounded-full shadow-md transition-all duration-300 ${collapsed ? 'w-12 h-12' : 'w-20 h-20'} hover:rotate-3 hover:scale-105 ring-2 ring-transparent hover:ring-yellow-500`}>
            <Image src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80" alt="User Avatar" fill className="object-cover" />
          </button>

          <div className={`flex flex-col items-center transition-opacity duration-300 ${collapsed ? 'opacity-0 pointer-events-none h-0' : 'opacity-100 h-auto'}`}>
            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Vincent Kioko</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">student.email@email.com</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 w-full">
          <NavItem href="/student/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" collapsed={collapsed} />
          <NavItem href="/student/catalog" icon={<BookCheck className="h-5 w-5" />} label="Catalogue" collapsed={collapsed} />
          <NavItem href="/student/challenges" icon={<CodeIcon className="h-5 w-5" />} label="Challenges" collapsed={collapsed} />
          <NavItem href="/student/help" icon={<HelpCircle className="h-5 w-5" />} label="Help & Support" collapsed={collapsed} />
        </nav>

        {/* Logout */}
        <button
          className={`flex items-center gap-3 mt-6 text-sm font-medium transition ${collapsed ? 'justify-center text-white' : 'text-red-600 hover:text-red-700'}`}
          onClick={() => router.replace('/')}
        >
          <LogOut size={18} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between shadow-md bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700"><Menu /></button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>

            <button className="hidden sm:flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              <Star size={16} /> Go Premium
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-24">{children}</div>
      </div>
    </div>
  );
}

import { usePathname } from 'next/navigation';

function NavItem({ icon, label, href, collapsed }: any) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`relative group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
        ${collapsed
          ? `justify-center text-white hover:bg-green-700 ${active ? 'bg-green-700 shadow-inner' : ''}`
          : `${active ? 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
      }`}
    >
      {icon}
      {!collapsed && <span className="transition-opacity duration-300">{label}</span>}

      {collapsed && (
        <span className="absolute z-20 left-full ml-3 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          {label}
        </span>
      )}
    </Link>
  );
}
