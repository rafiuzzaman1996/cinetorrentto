"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { toast } from "sonner";
import { CirclePlay } from "lucide-react";

export const TrailerDialog = ({ trailerUrl }: { trailerUrl: string }) => {

    let videoId = null;
    try {
        const url = new URL(trailerUrl);
        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1);
        } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
            if (url.pathname.startsWith('/embed/')) {
                videoId = url.pathname.split('/')[2];
            } else {
                videoId = url.searchParams.get('v');
            }
        }
    } catch (e) {
        console.error(e);
        toast('Could not process the trailer link.');
        return;
    }

    if (!videoId) {
        toast('Could not extract video ID from the trailer link.');
        return;
    }

    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <CirclePlay className="h-5 w-5 me-2" />
                    Watch Trailer
                </button>
            </DialogTrigger>
    <DialogContent className="sm:max-w-4xl w-full h-[85vh] flex flex-col rounded-2xl bg-black text-white p-0
                 [&>button[aria-label='Close']]:top-6 [&>button[aria-label='Close']]:right-6">
                <VisuallyHidden>
                    <DialogTitle>Trailer</DialogTitle>
                </VisuallyHidden>
                <div className="flex-1 py-5 overflow-hidden rounded-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        src={url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
};