"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectOption {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: MultiSelectOption[];
    selected: MultiSelectOption[];
    onChange: (selected: MultiSelectOption[]) => void;
    onSearch?: (query: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    loading?: boolean;
    className?: string;
    maxDisplay?: number;
    multi?: boolean;
}

export function MultiSelectWithSearch({
    options,
    selected,
    onChange,
    onSearch,
    placeholder = "Select items...",
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    loading = false,
    className,
    maxDisplay = 2,
    multi = true,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");


    const handleUnselect = (option: MultiSelectOption) => {
        onChange(selected.filter((s) => s.value !== option.value));
    };

    const handleSelect = (option: MultiSelectOption) => {
        const isSelected = selected.some((s) => s.value === option.value);
        if (multi) {
            if (isSelected) {
                handleUnselect(option);
            } else {
                onChange([...selected, option]);
            }
        } else {
            if (isSelected) {
                onChange([]);
            } else {
                onChange([option]);
            }
            setOpen(false);
        }
    };

    const displaySelected = selected.slice(0, maxDisplay);
    const hiddenCount = selected.length - maxDisplay;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between min-h-10 h-auto",
                        selected.length > 0 && "py-2",
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1 flex-1">
                        {displaySelected.map((option) => (
                            <Badge
                                key={option.value}
                                variant="secondary"
                                className="mr-1 mb-1 px-1 py-0 text-xs"
                            >
                                {option.label}
                                {multi && (
                                    <button
                                        type="button"
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(option);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleUnselect(option);
                                        }}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                )}
                            </Badge>
                        ))}
                        {hiddenCount > 0 && (
                            <Badge variant="secondary" className="mr-1 mb-1 px-2 py-0 text-xs">
                                +{hiddenCount} more
                            </Badge>
                        )}
                        {selected.length === 0 && (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command key={searchQuery}>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        onValueChange={(val) => {
                            setSearchQuery(val);
                            onSearch?.(val);
                        }}
                    />
                    <CommandList key={options.map(o => o.value).join(",")}>
                        {loading ? (
                            <div className="py-6 text-center text-sm">Loading...</div>
                        ) : (
                            <>
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-auto">
                                    {(options ?? []).map((option) => {
                                        const isSelected = selected.some(
                                            (s) => s.value === option.value
                                        );
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                onSelect={() => handleSelect(option)}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        isSelected ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}