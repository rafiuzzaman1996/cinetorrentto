'use client'
import { cn } from '@/lib/utils';
import React from 'react'

const Footer = () => {
    return (
        <div className="mt-4 bg-gradient-to-br bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white flex flex-col items-center justify-center p-4 text-center">
            {/* Ad section */}
            <div className="w-full max-w-[728px] h-[90px] flex items-center justify-center border-2 border-dashed">
                <div className=" font-medium tracking-wide">
                    ADVERTISEMENT
                </div>
            </div>
            <div className="w-full space-y-6">
                {/* Title */}
                <h1 className={cn(
                    "text-5xl font-bold tracking-tighter text-transparent bg-clip-text",
                    "bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
                )}>
                    CineTorrentto
                </h1>

                {/* Stats */}
                <div className="flex items-center justify-center space-x-3">
                    <div className="flex items-center">
                        <span className="font-medium">1,575</span>
                        <span className="ml-1 text-sm">Visitors This Month</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-amber-500"></div>
                    <div className="flex items-center">
                        <span className="font-medium">1</span>
                        <span className="ml-1 text-sm">Total Users</span>
                    </div>
                </div>


                <div className="">
                    {/* Copyright */}
                    <p className="text-gray-600 text-sm mt-8">
                        Copyright © {new Date().getFullYear()} CineTorrentto. All Rights Reserved.
                    </p>
                    {/* Disclaimer */}
                    <p className="text-xs text-gray-600 pt-1">
                        Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer