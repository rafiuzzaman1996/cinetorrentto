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

export const StreamDialog = ({ streamUrl }: { streamUrl: string }) => {

    if (!streamUrl) {
        toast.error("Stream URL is not available.");
        return null;
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex text-xs md:text-sm bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer items-center"
                >
                    <CirclePlay className="h-5 w-5 me-2" />
                    Stream Now
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
                        src={streamUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
};