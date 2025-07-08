// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/#', label: 'Logger' },
  { href: '/projects', label: 'Projects' },
  { href: '/settings', label: 'Settings' }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">LLM Logger</h2>
      <nav className="space-y-2">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'block px-4 py-2 rounded hover:bg-slate-700',
              pathname === href && 'bg-slate-800 font-medium'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
