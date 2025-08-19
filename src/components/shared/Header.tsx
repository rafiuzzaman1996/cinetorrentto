import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User, Menu } from "lucide-react"
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const menuItems = [
  {
    title: "Movies",
    items: [
      { href: "/movies/english", label: "English Movies" },
      { href: "/movies/bangla", label: "Bangla Movies" },
      { href: "/movies/hindi", label: "Hindi Movies" },
    ]
  },
  {
    title: "Series",
    items: [
      { href: "/series/english", label: "English Series" },
      { href: "/series/korean", label: "Korean Series" },
      { href: "/series/anime", label: "Anime Series" },
    ]
  },
  {
    title: "Games",
    items: [
      { href: "/games/pc", label: "PC Games" },
      { href: "/games/console", label: "Console Games" },
      { href: "/games/mobile", label: "Mobile Games" },
    ]
  },
  {
    title: "More",
    items: [
      { href: "/software", label: "Software" },
      { href: "/music", label: "Music" },
      { href: "/books", label: "Books" },
    ]
  }
]

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-xl font-bold">
                    CineTorrent
                  </Link>
                  <div className="flex flex-col space-y-3">
                    {menuItems.map((section) => (
                      <div key={section.title} className="space-y-2">
                        <h2 className="font-semibold px-2">{section.title}</h2>
                        <div className="pl-4 flex flex-col space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block p-2 hover:bg-accent rounded-md"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              {/* <span className='bg-gray-200 px-2 py-1 rounded text-2xl'>CineTorrento</span> */}
            <Logo />
            </Link>
          </div>
        </div>
        {/* Desktop Navigation */}
        <div className="flex">
        <div className="hidden lg:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {menuItems.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger className='hover:bg-transparent'>{section.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-2">
                    {/* <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]"> */}
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-accent transition-colors focus:text-accent-foreground"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search */}
          <div className="hidden md:flex w-full max-w-lg items-center space-x-2 px-4">
            <Input
              type="text"
              placeholder="Search movies..."
              className="w-full"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          </div>


        <div className="flex">


          {/* Mobile Search Button */}
          <div className="md:hidden pe-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <VisuallyHidden>
                  <SheetTitle>Search</SheetTitle> {/* ✅ Accessible title */}
                </VisuallyHidden>
                <div className="flex items-center space-x-2 pt-2 pb-2 px-2">
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    className="w-4/6"
                  />
                  <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Icon */}
          <div className="flex items-center">
              <ThemeToggle />


            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header