'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { ClipboardCheck, Columns2, Columns3, Columns4, Copy } from 'lucide-react'; // Lucide icons
import { cn } from '@/lib/utils'; // shadcn utility for className merging
import { ButtonGroup } from '@/components/ui/button-group';

const MAX_FILE_SIZE_MB = 2; // Maximum file size in MB

const Gallery = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState(4); // Default 4 columns
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = columns * 3; // Show 3 rows per page
  const [copied, setCopied] = useState({
    index: -1,
    src: '',
  });

  const handleCopy = (src: string, index: number) => {
    navigator.clipboard.writeText(src);
    setCopied({ index, src });
    setTimeout(() => setCopied({ index: -1, src: '' }), 1000); // reset after 1s
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
  };
  // Simulated API endpoints
  const API = {
    getImages: async () => {
      // Simulate fetching images from an API
      return Promise.resolve([
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
        'https://placehold.co/600x400/png',
        'https://placehold.co/300x200/png',
      ]);
    },
    uploadImages: async (files: File[]) => {
      // Simulate uploading images to an API
      return Promise.resolve(files.map((file) => URL.createObjectURL(file)));
    },
  };

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await API.getImages();
      setImages(fetchedImages);
    };
    fetchImages();
  });

  // Handle file selection
  const handleFileChange = (files: FileList | null) => {
    setError(null); // Clear previous errors
    const fileArray = files ? Array.from(files) : [];

    const validFiles: File[] = [];
    const previews: string[] = [];

    fileArray.forEach((file) => {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`File "${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`);
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
      const uploadedImageUrls = await API.uploadImages(selectedFiles);
      setImages((prev) => [...prev, ...uploadedImageUrls]);
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

  // Pagination logic
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

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
                setCurrentPage(1);
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
                <p className="text-sm text-gray-400">Maximum file size: {MAX_FILE_SIZE_MB} MB</p>
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
        {paginatedImages.map((src, index) => (
          <Card
            key={index + (currentPage - 1) * imagesPerPage}
            className="relative group p-0 overflow-hidden"
          >
            <Image
              src={src}
              alt={`Uploaded ${index}`}
              className="w-full h-50"
              loading="lazy"
              sizes="(width: 600px) 600px, (width: 1200px) 50vw, 33vw"
              width={600}
              height={400}
              style={{ objectFit: 'cover', width: '100%', height: '250px' }}
            />

            {/* Hover Copy Button */}
            <button
              onClick={() => handleCopy(src, index)}
              className={cn(
                "absolute top-2 right-2 flex items-center justify-center p-2 rounded-full bg-black/60 text-white transition-all duration-200 hover:bg-black cursor-pointer",
                "opacity-100 sm:opacity-0 sm:group-hover:opacity-100" // visible by default on mobile, hover on sm+
              )}
              title="Copy Image URL"
            >
              {copied.index === index ? <ClipboardCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span className="text-xs">{copied.index === index ? "Copied!" : ""}</span>
            </button>
          </Card>
        ))}

      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Gallery;