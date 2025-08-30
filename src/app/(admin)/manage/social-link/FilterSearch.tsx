'use client'

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CommandGroup } from 'cmdk';
import { Calendar, Check, ListFilter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export const FilterSearch = () => {
    const router = useRouter();

    async function handleSearch(query: string) {
        console.log("Searching for:", query);
        console.log(router)
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('search', query);
        router.push(`?${currentParams.toString()}`);
    }

    return (
        <div className='flex items-center space-x-2'>
            <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded"
                onChange={(e) => handleSearch(e.target.value)}
            />


            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        aria-label="Open filter command menu"
                        variant="outline"
                    >
                        {/* size={filters.length > 0 ? "icon" : "sm"}
              className={cn(filters.length > 0 && "size-8", "h-8")}
              ref={triggerRef}
              onKeyDown={onTriggerKeyDown} */}
                        <ListFilter />
                        {/* {filters.length > 0 ? null : "Filter"} */}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <Command loop className="[&_[cmdk-input-wrapper]_svg]:hidden">
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
                                    <CommandItem>
                                        <Calendar />
                                        <span>Calendar</span>
                                        <div
                                            className={cn(
                                                "flex size-4 items-center justify-center rounded-sm border border-primary",
                                                "bg-primary"
                                                // isSelected ? "bg-primary" : "opacity-50 [&_svg]:invisible",
                                            )}
                                        >
                                            <Check />
                                        </div>
                                        {/* {option.icon && <option.icon />} */}
                                        <span className="truncate">Label</span>
                                            <span className="ml-auto font-mono text-xs">
                                                0
                                            </span>
                                        {/* {option.count && (
                                            <span className="ml-auto font-mono text-xs">
                                                {option.count}
                                            </span>
                                        )} */}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
