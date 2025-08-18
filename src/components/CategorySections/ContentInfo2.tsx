'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download, Link as LinkIcon, Play, Share2, Star, Clock, DollarSign, Film, Facebook, Twitter, Send } from 'lucide-react'

// Drop this component into any Next.js page (app router) and it will render a movie detail
// UI similar to the screenshot. Replace the data object as needed.

const movie = {
  title: 'Valiant One',
  year: 2025,
  rating: 5.1,
  release: '1/31/2025',
  genres: [
    {
      id: 1,
      title: 'War',
    },
    {
      id: 1,
      title: 'Action'
    },
    {
      id: 1,
      title: 'Thriller'
    },
  ],
  overview:
    'A U.S. Army helicopter crashes in North Korean territory, forcing Captain Edward Brockman (Chase Stokes) and a team of tech specialists to navigate hostile terrain and escort a critical civilian across the Demilitarized Zone to safety.',
  runtime: 86,
  budget: '$1.2 million',
  director: 'Steve Barnett',
  cast: [
    'Chase Stokes',
    'Lana Condor',
    'Desmin Borges',
    'Callan Mulvey',
    'Jonathan Whitesell',
    'Daniel Jun',
  ],
  poster:
    'https://lh3.googleusercontent.com/d/1TW5iNTEaOSU1c-bf2Zol9pZoDn5vDJ9x=w500', // replace with your poster
  downloads: [
    { label: '1080p.WEBRip', size: '1.3 GB' },
    { label: '2160p.WEB-DL', size: '9.6 GB' },
    { label: '1080p.WEB-DL', size: '5.1 GB' },
  ],
}

export default function MovieDetail() {
  return (
    <>
      {/* Row 1: 2 columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">Column 1 Content</div>
          <div className="rounded-lg border p-4">Column 2 Content</div>
        </div>

        {/* Row 2: 1 column */}
        <div className="mt-4 rounded-lg border p-4">Full-width Content (Row 2)</div>
    </>
    // <div className="w-full">
    //   <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    // </motion.div>
    // </div>
    //   <div className="flex flex-col md:flex-row gap-8 p-8">
    //             <div className="md:w-1/3 flex-shrink-0">
    //                 <div className="details-poster-wrapper rounded-lg shadow-lg overflow-hidden">
    //                 <Image
    //                   src={movie.poster}
    //                   alt={movie.title}
    //                   width={600}
    //                   height={300}
    //                   className="h-100 w-full object-cover"
    //                   priority
    //                 />
    //                     {/* <img src="${posterUrl}" alt="${movie.title}" className="absolute top-0 left-0 w-full h-full object-cover"> */}
    //                 </div>
    //                 <div className="hidden md:block mt-4 space-y-2 text-sm movie-details-info">
    //                     <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
    //                     <p><strong>Running Time:</strong> {movie.runtime || 'N/A'}</p>
    //                     <p><strong>Budget:</strong> {movie.budget || 'N/A'}</p>
    //                     <p><strong>Cast:</strong> {movie.cast || 'N/A'}</p>
    //                 </div>
    //             </div>
    //             <div className="md:w-2/3">
    //                 <div className="flex justify-between items-start">
    //                      <h2 className="text-3xl font-bold mb-2">{movie.title} <span className="text-2xl font-normal text-gray-400">({movie.release})</span></h2>
    //                      <button className="text-gray-400 hover:text-white transition-colors">
    //                         <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    //                      </button>
    //                 </div>
    //                 <div className="flex items-center gap-4 mb-4 text-gray-400">
    //                     <span>Rating: <span className="font-bold text-lg text-amber-400">★ {movie.rating.toFixed(1)}</span> / 10</span>
    //                     <span className="text-sm">Release: {movie.release}</span>
    //                 </div>
    //                 <div className="flex flex-wrap gap-2 mb-4">
    //                       <span className="bg-neutral-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
    //                       { movie.genres.map(genre => genre.title).join(',')}
    //                       </span>
    //                 </div>
    //                 <h3 className="text-lg font-semibold mb-2">Overview</h3>
    //                 <p className="leading-relaxed text-sm">{movie.overview}</p>
    //                 <div className="block md:hidden mt-4 space-y-2 text-sm movie-details-info">
    //                     <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
    //                     <p><strong>Running Time:</strong> {movie.runtime || 'N/A'}</p>
    //                     <p><strong>Budget:</strong> {movie.budget || 'N/A'}</p>
    //                     <p><strong>Cast:</strong> {movie.cast || 'N/A'}</p>
    //                 </div>
    //             </div>
    // </div>

  )
}
