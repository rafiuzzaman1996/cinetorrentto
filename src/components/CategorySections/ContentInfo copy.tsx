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

const data = {
  title: 'Valiant One',
  year: 2025,
  rating: 5.1,
  release: '1/31/2025',
  genres: ['War', 'Action', 'Thriller'],
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
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
              {/* Poster */}
              <div className="relative overflow-hidden rounded-2xl border bg-muted/10">
                <Image
                  src={data.poster}
                  alt={`${data.title} poster`}
                  width={600}
                  height={300}
                  className="h-100 w-full object-cover"
                  priority
                />
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">
                      {data.title} <span className="text-muted-foreground">({data.year})</span>
                    </CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {data.genres.map((g) => (
                        <Badge key={g} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex min-w-[120px] flex-col items-end">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">Rating</div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="text-xl font-semibold">{data.rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">/ 10</span>
                    </div>
                    <Progress value={(data.rating / 10) * 100} className="mt-2 h-2 w-40" />
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">Overview</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{data.overview}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="lg" className="rounded-full">
                    <Play className="mr-2 h-4 w-4" /> Stream Now
                  </Button>
                  <Button size="lg" variant="secondary" className="rounded-full">
                    <Play className="mr-2 h-4 w-4" /> Watch Trailer
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full" aria-label="Copy Link">
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>

                <Separator className="my-2" />

                {/* Downloads */}
                <div>
                  <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">Download Options</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.downloads.map((d) => (
                      <Button key={d.label} variant="outline" className="rounded-2xl">
                        <Download className="mr-2 h-4 w-4" /> {d.label}
                        <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{d.size}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-1 gap-4 rounded-2xl bg-muted/30 p-4 md:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Running Time:</span>
                    <span className="text-muted-foreground">{data.runtime} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Budget:</span>
                    <span className="text-muted-foreground">{data.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Film className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Release:</span>
                    <span className="text-muted-foreground">{data.release}</span>
                  </div>
                </div>

                {/* Credits */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">Director</h4>
                    <p className="text-sm">{data.director}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">Cast</h4>
                    <p className="text-sm text-muted-foreground">{data.cast.join(', ')}</p>
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-2">
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">Comments</h3>
                  <Card className="rounded-2xl">
                    <CardContent className="p-3 md:p-4">
                      <p className="mb-3 text-xs text-muted-foreground">No comments yet. Be the first to comment!</p>
                      <Textarea placeholder="Write a comment..." className="min-h-[96px] resize-y" />
                      <div className="mt-3 flex justify-end">
                        <Button className="rounded-full">Post Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
