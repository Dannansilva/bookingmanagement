'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { brandingConfig } from '@/config';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Staff',
    href: '/staff',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: 'Services',
    href: '/services',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
  {
    label: 'Appointments',
    href: '/appointments',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Clients',
    href: '/clients',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'Revenue',
    href: '/revenue',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    router.push('/');
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-slate-900 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-5">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'w-10' : 'w-full'}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={brandingConfig.company.logo}
              alt={brandingConfig.company.name}
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </div>
          <div
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            <p className="font-semibold text-white">{brandingConfig.company.name}</p>
            <p className="text-xs text-slate-400">Management</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-slate-800 hover:text-white ${
            isCollapsed ? 'absolute right-[-12px] top-6 bg-slate-800 shadow-lg' : ''
          }`}
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p
          className={`mb-3 overflow-hidden whitespace-nowrap px-3 text-xs font-medium uppercase tracking-wider text-slate-500 transition-all duration-300 ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-900'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                      isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="border-t border-slate-800 p-3">
        <button
          onClick={handleLogout}
          className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            Sign Out
          </span>
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
