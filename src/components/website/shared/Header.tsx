"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, Filter } from "lucide-react"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MenuAd } from "../Ad/MenuAd";
import { AdvanceFilter } from "./AdvanceFilter";

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
  const router = useRouter();
  const [query, setQuery] = useState("");

  const searchParams = useSearchParams();
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };
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
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
                <Accordion type="single" collapsible className="w-full mt-5">
                  {menuItems.map((section) => (
                    <AccordionItem key={section.title} value={section.title}>
                      <AccordionTrigger>{section.title}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-1 pl-2">
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
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Menu Ad */}
                <MenuAd />
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
            <form
              onSubmit={handleSubmit}
              className="hidden md:flex w-full max-w-lg items-center px-4"
            >
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full pr-10" // add right padding so text doesn’t overlap button
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>


        <div className="flex">
          {/* Mobile Search Button */}
          <div className="md:hidden pe-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" title="Search">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <VisuallyHidden>
                  <SheetTitle>Search</SheetTitle> {/* ✅ Accessible title */}
                </VisuallyHidden>
                <form
                  onSubmit={handleSubmit}
                  className="md:hidden flex w-full max-w-lg items-center px-4"
                >
                  <div className="relative w-4/5 py-2">
                    <Input
                      type="text"
                      placeholder="Search movies..."
                      className="w-full pr-10" // padding-right so text doesn't overlap button
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

              </SheetContent>
            </Sheet>
          </div>



          <div className="flex items-center">
            {/* Advance Filter */}
            <AdvanceFilter />
            {/* Theme Toggle */}
            <ThemeToggle />
          {/* User Icon */}
            {/* <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header