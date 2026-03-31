'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ClipboardCheck, Columns2, Columns3, Columns4, Copy, Trash } from 'lucide-react'; // Lucide icons
import { cn } from '@/lib/utils'; // shadcn utility for className merging
import { ButtonGroup } from '@/components/ui/button-group';
import { Attachment } from '@/types/admin/Attachment';
import { deleteAttachment, uploadAttachments } from '../../admin-api/AttachmentApi';
import { useRouter } from "next/navigation"
import { toast } from "sonner";

interface ImagesProps {
  data: Attachment[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

const Images = ({
  data,
  totalPages,
  currentPage,
  pageSize
}: ImagesProps) => {

  const router = useRouter()

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState(4); // Default 4 columns
  const imagesPerPage = columns * 3; // Show 3 rows per page
  const [copied, setCopied] = useState({
    index: -1,
    src: '',
  });

const handleCopy = async (src: string, index: number) => {
  try {
    // Modern clipboard API (works on Chrome, Edge, Firefox, Android)
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(src);
    } else {
      // Safari / iOS fallback
      const textarea = document.createElement("textarea");
      textarea.value = src;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    // Set UI copied state
    setCopied({ index, src });

    setTimeout(() => {
      setCopied({ index: -1, src: "" });
    }, 1000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};


  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
  };

  // Handle file selection
  const handleFileChange = (files: FileList | null) => {
    setError(null); // Clear previous errors
    const fileArray = files ? Array.from(files) : [];

    const validFiles: File[] = [];
    const previews: string[] = [];

    fileArray.forEach((file) => {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '2')) {
        setError(`File "${file.name}" exceeds ${parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '2')} MB.`);
      } else if (!file.type.startsWith('image/')) {
        setError(`File "${file.name}" is not a valid image.`);
      } else {
        validFiles.push(file);
        previews.push(URL.createObjectURL(file));
      }
    });

    setSelectedFiles(validFiles);
    setPreviews(previews);
  };

  // Handle drag-and-drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer.files);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      try {
        const uploadedImageUrls = await uploadAttachments(selectedFiles);
        if (!uploadedImageUrls) {
          toast.error("Import failed");
          return;
        }
      } catch (error) {
        toast.error('Upload Failed:' + error);
        console.error(error)
      } finally {
        router.refresh()
      }

      setSelectedFiles([]); // Clear the selected files
      setPreviews([]); // Clear the previews
    }
    setDialogOpen(false); // Close the dialog
  };

  // Trigger file input click
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = async (id: string) => {
    // confirmation Dialog
    const result = confirm("Are you sure you want to delete this image?");
    if (!result) return;
    try {
        const result = await deleteAttachment(id);
        if (!result) {
          toast.error("Import failed");
          return;
        }
      } catch (error) {
        toast.error('Upload Failed:' + error);
        console.error(error)
      } finally {
        router.refresh()
      }
    }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold pb-1">Gallery</h1>

      {/* Controls for columns */}
      <div className="flex gap-4 mb-2 items-center justify-end">
        <ButtonGroup>
          {[2, 3, 4].map((col) => (
            <Button
              key={col}
              variant={columns === col ? 'default' : 'outline'}
              size="icon"
              className={cn(
                columns === col && 'bg-primary text-white dark:text-black',
              )}
              onClick={() => {
                setColumns(col);
                // setCurrentPage(1);
              }}
              aria-label={`${col} Columns`}
              title={`${col} Columns`}
            >
              {col === 2 && <Columns2 className="w-5 h-5" />}
              {col === 3 && <Columns3 className="w-5 h-5" />}
              {col === 4 && <Columns4 className="w-5 h-5" />}
            </Button>
          ))}
        </ButtonGroup>




        {/* Dialog for Upload */}
        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="w-5/12 md:w-3/12 cursor-pointer">Upload Images</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-8/12 w-full h-[80vh] p-4 flex flex-col justify-between">
            <DialogHeader>
              <DialogTitle>Upload Images</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
              {/* Drag-and-Drop Area */}
              <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-gray-500"
              >
                <p className="text-gray-500">Drag & drop images here, or click to select files</p>
                <p className="text-sm text-gray-400">Maximum file size: {parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '2')} MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Previews */}
              <div className="grid grid-cols-4 gap-2">
                {previews.map((src, index) => (
                  <div key={index} className="flex flex-row flex-wrap ">
                    <div className="relative w-20 h-20 flex flex-col items-center">
                      <Image
                        src={src}
                        alt={`Preview ${index}`}
                        className="rounded-md object-cover"
                        fill
                      />
                    </div>
                    <div className="mt-1 w-full">
                      <p className="text-xs text-gray-500 truncate" title={selectedFiles[index].name}>
                        {selectedFiles[index].name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(selectedFiles[index].size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Image Gallery */}
      <div
        className={`grid gap-2`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {data.map((image, index) => (
          <Card
          key={index + (currentPage - 1) * imagesPerPage}
          className="relative group p-0 overflow-hidden"
          >
            <Image
              src={process.env.NEXT_PUBLIC_IMG_URL + image.fileName1280}
              alt={image.fileName1280 || 'Image'}
              className="w-full h-50"
              loading="lazy"
              sizes="(width: 600px) 600px, (width: 1200px) 50vw, 33vw"
              width={600}
              height={400}
              style={{ objectFit: 'cover', width: '100%', height: '250px' }}
            />

            {/* Hover Copy Button */}
            <button
              onClick={() => handleCopy(image.fileName1280 ?? '', index)}
              className={cn(
                "absolute top-2 right-2 flex items-center justify-center p-2 rounded-full bg-black/60 text-white transition-all duration-200 hover:bg-black cursor-pointer",
                "opacity-100 sm:opacity-0 sm:group-hover:opacity-100" // visible by default on mobile, hover on sm+
              )}
              title="Copy Image URL"
            >
              {copied.index === index ? <ClipboardCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span className="text-xs">{copied.index === index ? "Copied!" : ""}</span>
            </button>
            {/* Hover Delete Button */}
            <button
              onClick={() => handleDelete(image.id)}
              className={cn(
                "absolute top-2 left-2 flex items-center justify-center p-2 rounded-full bg-red-500 text-white transition-all duration-200 hover:bg-red-700 cursor-pointer",
                "opacity-100 sm:opacity-0 sm:group-hover:opacity-100" // visible by default on mobile, hover on sm+
              )}
              title="Delete Image"
            >
              <Trash className='h-4 w-4 text-red' />
            </button>S
          </Card>
        ))}

      </div>

      {/* Pagination Controls */}
      <div className="my-1">
        <div className="flex items-center justify-center mb-1 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="ml-auto flex items-center justify-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => router.push(`?page=1&pageSize=${pageSize}`)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => router.push(`?page=${currentPage - 1}&pageSize=${pageSize}`)}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => router.push(`?page=${currentPage + 1}&pageSize=${pageSize}`)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => router.push(`?page=${totalPages}&pageSize=${pageSize}`)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Images;