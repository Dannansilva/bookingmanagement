'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';

interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/');
        return;
      }
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        router.push('/');
      }

      // Load sidebar state from localStorage
      const savedSidebarState = localStorage.getItem('sidebarCollapsed');
      if (savedSidebarState) {
        setIsSidebarCollapsed(JSON.parse(savedSidebarState));
      }
    }
    setIsLoading(false);
  }, [router]);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Redirecting...</p>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-60'
        }`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-amber-500">
              {getGreeting()}, {user.name.split(' ')[0]}. Here&apos;s today&apos;s overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-slate-900">
              {getInitials(user.name)}
            </div>
            <div className="text-right">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.userType}</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
