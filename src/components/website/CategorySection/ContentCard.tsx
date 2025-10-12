'use client'

import { Content } from '@/types/website/Content'
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import ContentInfo from './ContentInfo'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export const ContentCard = ({ content }: { content: Content }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/website-api/content/${content.slug}`);
      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching Content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchMovieDetails();
    }
  };
  return (
    <>
      <Card
        // onClick={() => handleOpenChange(true)}
        className="bg-gray-800 p-0 gap-2 dark:bg-gray-900 overflow-hidden border-0 duration-500 hover:scale-105">
        <Link
          href={`/content/${content.slug}`}
          className="cursor-pointer"
        >
          <Image
            src={content.poster_image_url}
            alt={content.title}
            width={500}
            height={500}  // increased height
            className="h-75 object-cover object-center transition-transform cursor-pointer"
          />
        </Link>
        <CardContent className="p-2">
          <Link
            href={`/content/${content.slug}`}
            className="cursor-pointer"
          >
            <CardTitle className="cursor-pointer text-white text-sm md:text-base truncate" title={content.title}>{content.title}</CardTitle>
          </Link>
          <CardDescription className="text-gray-400 text-xs truncate">{(content.genres ?? []).map(data => data.title).join(', ')}</CardDescription>
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-300 text-xs">{new Date(content.release_date).getFullYear()}</span>
            <span className="text-yellow-400 font-semibold text-xs">★ {content.rating}</span>
          </div>
        </CardContent>
      </Card>


      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-4xl w-full h-[85vh] flex flex-col rounded-2xl py-6 px-0">
          <VisuallyHidden>
            <DialogTitle>{content.title}</DialogTitle>
          </VisuallyHidden>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-gray-900 dark:text-gray-100" />
            </div>
          ) : details ? (
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
              <ContentInfo content={details} />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
