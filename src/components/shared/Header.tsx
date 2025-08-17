import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User } from "lucide-react"
import Link from 'next/link'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            <span>CineTorrent</span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex w-full max-w-sm items-center space-x-2 px-4">
          <Input
            type="text"
            placeholder="Search movies..."
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* User Icon */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header