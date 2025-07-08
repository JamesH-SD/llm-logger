'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function Topbar() {
  const [user, setUser] = useState<{ name: string } | null>(null) // ← Replace with real auth

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
      <h1 className="text-xl font-semibold">LLM Logger</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
          <span className="text-sm text-gray-600">{user.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUser(null)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => setUser({ name: 'James' })}>
              Login
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </header>
  )
}
