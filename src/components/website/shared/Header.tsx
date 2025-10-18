"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AdvanceFilter } from "./AdvanceFilter";
import { Ads } from "@/types/admin/Ads";
import AdsBlock from "../Ad/Ads";

const menuItems = [
  {
    title: "Movies",
    items: [
      { href: "/category/english_movies", label: "English Movies" },
      { href: "/category/bangla_movies", label: "Bangla Movies" },
      { href: "/category/hindi_movies", label: "Hindi Movies" },
    ]
  },
  {
    title: "Series",
    items: [
      { href: "/category/english_series", label: "English Series" },
      { href: "/category/korean_series", label: "Korean Series" },
      { href: "/category/anime_series", label: "Anime Series" },
    ]
  },
  {
    title: "Games",
    items: [
      { href: "/category/pc_games", label: "PC Games" },
      { href: "/category/console_games", label: "Console Games" },
      { href: "/category/mobile_games", label: "Mobile Games" },
    ]
  },
  {
    title: "More",
    items: [
      { href: "/category/software", label: "Software" },
      { href: "/category/music", label: "Music" },
      { href: "/category/books", label: "Books" },
    ]
  }
]


const Header = ({ filterAds, menuAds }: { filterAds: Ads[], menuAds: Ads[] }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-2 flex h-16 items-center justify-between">
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
                <AdsBlock ads={menuAds} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <div className="">
              <Link href="/" className="font-bold">
                <Logo />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex">
          <div className="hidden lg:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {menuItems.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className="hover:bg-transparent">{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-2">
                        {section.items.map((item) => (
                          <li key={item.href} className="bg-transparent hover:bg-transparent">
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none bg-transparent transition-colors focus:text-accent-foreground"
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
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar query={query} setQuery={setQuery} router={router} />
            </Suspense>
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
                  <SheetTitle>Search</SheetTitle>
                </VisuallyHidden>
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchBar query={query} setQuery={setQuery} router={router} />
                </Suspense>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center">
            {/* Advance Filter */}
            <AdvanceFilter filterAds={filterAds} />
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  router: ReturnType<typeof useRouter>;
}
const SearchBar = ({ query, setQuery, router }: SearchBarProps) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams, setQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center px-4">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search movies..."
          className="w-full pr-10"
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
  );
};

export default Header;
